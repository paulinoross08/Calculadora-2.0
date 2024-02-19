// Seleção dos elementos

const display = document.querySelector("#displayInput");
const botaoIgual = document.querySelector(".igual");
const botaoPonto = document.querySelector(".ponto");
const botoesNumeros = document.querySelectorAll(".num");
const botoesOperadores = document.querySelectorAll(".operador");
const reset = document.querySelector("#apagar");

//Váriaveis Globais
let operacaoAtual = "";
let operador = null;
let valorAnterior = "";
let calculando = false;

//Funcoes 
function actualizaDisplay(){
    display.value = operacaoAtual;
}
function insereNumero(evento){
        if(calculando){
            operacaoAtual = evento.target.textContent;
            calculando = false;
        } else {
            operacaoAtual += evento.target.textContent;
        }
        actualizaDisplay();
}

function inserePonto(){
    if(operacaoAtual.indexOf(".") === -1){
        operacaoAtual +=".";
        actualizaDisplay();
    }
}

function insereOperador(evento){
    if(operacaoAtual !== ""){
        if(!calculando){
            if(operador !== null){
                calcula();
            }
            valorAnterior = operacaoAtual;
            operacaoAtual = "";
        }
        operador = evento.target.textContent;
    }
}
function calcula(){
    let resultado = null;
    const operandoAnterior = parseFloat(valorAnterior);
    const operandoAtual = parseFloat(operacaoAtual);

    switch(operador){
        case "+":
            resultado = operandoAnterior + operandoAtual;   
            break;
        case "-":
            resultado = operandoAnterior - operandoAtual;   
            break;
        case "*":
            resultado = operandoAnterior * operandoAtual;   
            break;
        case "/":
            resultado = operandoAnterior / operandoAtual;   
            break;
        
    }

    operacaoAtual = String(resultado);
    valorAnterior = operacaoAtual;
    calculando = true;
    actualizaDisplay();

}
//Eventos
botaoPonto.addEventListener("click", inserePonto);
botoesNumeros.forEach((botao) => botao.addEventListener("click", insereNumero));
botoesOperadores.forEach((botao )=> botao.addEventListener("click", insereOperador));

botaoIgual.addEventListener("click",calcula);

reset.addEventListener("click", function()
{
   if(display.value.length){
    display.value = display.value.substr(0, display.value.length -1);
      display.focus();
   }
});