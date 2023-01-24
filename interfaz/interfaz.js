'use strict';
//Elementos en el documento html;
const inputCantidad = document.getElementById('inputCantidad');
const resultado = document.getElementById('sectionResultadoCantidad');
const resultadoBloques = document.getElementById('sectionResultadoBloques');
const btnCrearCombinaciones = document.getElementById('btnCrearCombinaciones');
//Arreglos para usar como tipo de moneda;
const moneda =["pesos ","centavos"];
//objeto convertidor importado de modulo;
import {convertidor} from "../modulos/cantidadAtexto.js";
//objeto creador de matriz con bloques importdo de modulo;
import { creadorBloques } from "../modulos/bloques.js";
//objeto para crear combinaciones;
import { conjunto } from "../modulos/conjunto.js";

//FUNCIONES
//Funcion para agregar manejador a los range creadores de bloques
const agregarManejadorAbloquesRanges = () => {
   const bloquesRanges = document.querySelectorAll(".rangesBloques");
   bloquesRanges.forEach(range=>range.addEventListener('change',dibujarBloques.bind(bloquesRanges)));
} 
//Funcion para dibujar matriz con bloques y agua, mediante el objeto creadorBloques importado del modulo bloques.
const dibujarBloques = function(){
    const valores = [];
    resultadoBloques.innerHTML="";
    this.forEach(range=>valores.push(range.value));
    //creamos la matriz con la funcion crear del objeto creadorBloques;
    const matriz = creadorBloques.crear(valores);
    //por cada campo de la matriz devuelta, dibujamos un div 
    //ya sea bloque o agua;
    matriz.forEach((fila,index)=>{
        const flexRow=document.createElement("div");
        flexRow.setAttribute("class","fila"); 
        fila.forEach((columna,idx)=>{
            const bloque = document.createElement("div");
            matriz[index][idx]=='██' ? bloque.setAttribute("class","bloque") :
            matriz[index][idx]=='~~' ? bloque.setAttribute("class","agua") : null;
            if(matriz.length>2 && index==matriz.length-3 && idx==4 && matriz[index][idx]!='██')
                matriz[index][idx]==null ? null:bloque.setAttribute("class","solOff");
            flexRow.appendChild(bloque); 
        });
        resultadoBloques.appendChild(flexRow);
    });
}
//Funcion para ejercicio de crearCombinaciones;
const crearCombinaciones = function(event){
    const resultado = document.querySelector(".paraCombinaciones");
    resultado.innerHTML="";
    const longitud = document.getElementById("inputCantidadElementosCombinacion");
    const combinaciones = conjunto.combinar(["rojo","verde","azul","blanco","negro"],longitud.value);
    resultado.innerHTML=`<h3>Las combinaciones son: ${combinaciones?combinaciones.length:'cero'}</h3>`;
    combinaciones ?
    combinaciones.forEach(elemento=>resultado.innerHTML+=`<div>${JSON.stringify(elemento)}</div><br>`) :
    resultado.innerHTML+=`<h3>Elija un número entre "1" y la cantidad de colores</h3>`;
    event.preventDefault();
}
//MANEJADORES de eventos
//Manejador del evento input del input cantidad pra convertir a letras;
inputCantidad.addEventListener('input',()=>{
    //usamos el método "convertirAtexto" del objeto importado "convertidor"
    //pasando como argumento la cantidad del intput number del documento
    const texto = convertidor.convertirAtexto(inputCantidad.value);
    resultado.innerHTML = "<font color='#f66'>Objeto devuelto por el modulo: </font>"+JSON.stringify(texto) + "<br><br><br>";
    if(texto)resultado.innerHTML+="<font color='#f66'>"+texto.pesos+moneda[0] + " con " + texto.centavos+moneda[1] + "</font>";
    //cantidad.value="";
});
btnCrearCombinaciones.addEventListener('click',crearCombinaciones);

window.addEventListener("load",agregarManejadorAbloquesRanges);


