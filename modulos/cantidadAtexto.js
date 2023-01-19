'use strict';

//Arreglos para usar como diccionarios.
const unidades = ["","un ","dos ","tres ","cuatro ","cinco ","seis ","siete ","ocho ","nueve "];
const decenas = ["","diez ","veinte ","treinta ","cuarenta ","cincuenta ","sesenta ","setenta ","ochenta ","noventa "]
const centenas = ["",["","cien ","ciento "],"doscientos ","trescientos ","cuatroscientos ","quinientos ","seiscientos ","setescientos ","ochoscientos ","novescientos "];
const excepciones = ["diez ","once ","doce ","trece ","catorce ","quince "];
const calificativos = ["","mil ",["millon ","millones "]];

/* FUNCIONES */

//FUNCION Recibe un arreglo que representa una cantidad
//Retorna un array con elementos que representan
//las unidades,decenas y centenas;
const cantidadUDC=[];
const udc = (cantidad) => {
    //Si la cantidad tiene menos de 3 elementos, significa que acaba la recursion,
    //necesitamos limpiar udcCntidad, para que este libre a otra recursion, y debemos retornar sus ultimos elementos
    //asi que guardamos su contenido y lo enviamos despues.
    if(cantidad.length<=3) {
        const cantidadToSend = [...cantidadUDC];
        cantidadUDC.length=0;
        cantidadToSend.unshift(cantidad);
        return cantidadToSend;
    }
    //tomamos un fragmento de 3 numeros de la cantidad recibida
    const indice = cantidad.length;
    const fragmento = cantidad.slice(indice-3,indice);
    //agregamos esos tres elementos al array de las cantidades divididas
    cantidadUDC.unshift(fragmento);
    //esos mismos 3 elementos los eliminamos de la cantidad para volver a llamar la funcion
    cantidad.splice(indice-3,indice);
    return udc(cantidad);
}

//FUNCION que Recibe un arreglo que represent la cantidad
//ya subdividido en unidades,decenas,centenas. Los procesa por segmento recursivamente
//y retorna una cadena de texto construida en base a los array que funcionan como diccionarios
let str="";
const aTexto = (cantidad) => {
    //si la cantidad ya no tiene segmentos a procesar acabamos la recursión
    if(cantidad.length<1) {
        const strToSend = str;
        str="";
        return strToSend;
    };
    let aProcesar = cantidad[0];
    //la longitud del arreglo recibido se guarda para usar como indice
    //del arreglo calificativos y saber si son: miles, millones
    const calificativo = cantidad.length-1;
     //si el segmento aProcesar es una cantidad menor a 3 digitos 
     //le agregamos "ceros" para poder subdividirse en unidades, decenas, centenas;
    while(aProcesar.length<3) aProcesar.unshift("0");
    //convertimos a numero los elementos del segmento aProcesar del array cantidad
    const u = Number(aProcesar[2]);
    const d =Number(aProcesar[1]);
    const c = Number(aProcesar[0]);
    //construimos la cadena en base a unidades,decenas y centenas usados como indice en los arreglos diccionarios
    str+=`${ c<1 ? centenas[1][0] : c>1 ? centenas[c] : d||u ? centenas[1][2]:centenas[1][1] }${d==1&&u<6?excepciones[u]:decenas[d]}${d>1&&u||(d==1&&u>5)?"y ":""}${(d==1&&u<6) || u==0 ?"":unidades[u]}`;
    if(c>0||d>0||u>0){
        if(Array.isArray(calificativos[calificativo])) 
        u==1 ? str+=calificativos[calificativo][0] : str+=calificativos[calificativo][1];
        else str+=calificativos[calificativo];
    }
    //eliminamos ese segmento del arreglo cantidad y llamamos de nuevo esta funcion con el nuevo arreglo ya sin el segmento procesado
    cantidad.shift();
    return aTexto(cantidad);
}

//FUNCION para convertir toda la cantidad(pesos y centavos) a texto, usando la funcion aTexto
const convertirAtexto = function(numero){
    //recibimos el numero contenido en el input del documento
    //y lo convertimos en un arreglo de 2 elementos: pesos y centavos
    const n = numero.split(".");
    //si no recibimos nada terminamos la funcion retornando false
    if( !n[0] || numero>999999999.99 || numero<0.01 ) return false;
    //Usamos la funcion udc con el arreglo "n" para subdividir toda la cantidad
    //centavos y pesos en arreglos de 3 (unidades,decenas y centenas)
    let pesos = udc(Array.from(n[0]));
    //usamos la funcion aTexto para construir la cadena de texto correpondiente a los pesos
    pesos = aTexto(pesos);
    //elaboramos el arreglo de centavos rellenando con ceros de ser necesario pues debe contener 3 caracteres para poder ser tratados como
    //unidades decenas y centenas.
    let arregloCentavos = n[1]?Array.from(n[1]):["0","0","0"];
    arregloCentavos=arregloCentavos.length==1 ?
    ["0",arregloCentavos[0],"0"] :
    ["0",arregloCentavos[0],arregloCentavos[1]];
    let centavos = udc(arregloCentavos);
    //usamos la funcion aTexto para construir la cadena de texto correpondiente a los centavos
    centavos = aTexto(centavos);  
    centavos = centavos ? centavos : "cero ";
    //retornamos un objeto con los pesos y centavos ya convertidos a texto;
    return {pesos,centavos}
}
//creamos un objeto 
//le asignamos la funcion convertirAtexto como propiedad, lo congelamos y exportamos
const convertidor = new Object();
Object.defineProperty(convertidor,"convertirAtexto",{value:convertirAtexto});
Object.freeze(convertidor);
export {convertidor}
