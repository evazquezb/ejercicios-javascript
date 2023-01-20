'use strict';
//Elementos en el documento html;
const inputCantidad = document.getElementById('inputCantidad');
const resultado = document.getElementById('sectionResultadoCantidad');
const resultadoBloques = document.getElementById('sectionResultadoBloques');
//Arreglos para usar como tipo de moneda;
const moneda =["pesos ","centavos"];
//objeto convertidor importado de modulo;
import {convertidor} from "../modulos/cantidadAtexto.js";
//objeto credor de matriz con bloques importdo de modulo;
import { creadorBloques } from "../modulos/bloques.js";

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
    resultadoBloques.childNodes.forEach(node=>console.log(node));
    this.forEach(range=>valores.push(range.value));
    const matriz = creadorBloques.crear(valores);
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
    })
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

window.addEventListener("load",agregarManejadorAbloquesRanges);

