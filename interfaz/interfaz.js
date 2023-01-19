'use strict';
//Elementos en el documento html;
const inputCantidad = document.getElementById('inputCantidad');
const resultado = document.getElementById('sectionResultadoCantidad');
//Arreglos para usar como tipo de moneda;
const moneda =["pesos ","centavos"];
//objeto convertidor importado de modulo;
import {convertidor} from "../modulos/cantidadAtexto.js";
//objeto credor de matriz con bloques importdo de modulo;
import { creadorBloques } from "../modulos/bloques.js";
//Manejador del evento click del boton;
inputCantidad.addEventListener('input',()=>{
    //usamos el método "convertirAtexto" del objeto importado "convertidor"
    //pasando como argumento la cantidad del intput number del documento
    const texto = convertidor.convertirAtexto(inputCantidad.value);
    resultado.innerHTML = "<font color='#f66'>Objeto devuelto por el modulo: </font>"+JSON.stringify(texto) + "<br><br><br>";
    if(texto)resultado.innerHTML+="<font color='#f66'>"+texto.pesos+moneda[0] + " con " + texto.centavos+moneda[1] + "</font>";
    //cantidad.value="";
});
