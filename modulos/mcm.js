//importamos una funcion para validar arreglo;
import validar from './validarArrayEnterosPositivos.js';
//importamos arreglo de secuencia de numeros primos;
import {numerosPrimos} from "../modulos/numerosPrimos.js";

//creamos una variable que sirv de indice en el arreglo secuencia de numerosPrimos;
let indiceNumeroPrimo = 0;
//Establecemos el numero primo actual de acuerdo al idice;
let numeroPrimoActual = numerosPrimos[indiceNumeroPrimo];
//arreglo de factores que serviran para calcular el minimo comun multiplo;
//lo inicializamos con un solo factor;
const factores = [1];

const mcm = function(array){
    //si todos los elementos del array son 1, significa que acabamos
    if(array.every(elemento=>elemento==1))
    //calculamos el minimo comun multiplo multiplicando todos los factores y lo retornamos
        return factores.reduce((f1,f2)=>f1*f2);
    //si algun elemento es divisible entre el numero primo actual procedemos a dividir el arreglo;
    //y agregamos el numero primo al arreglo factores;
    if(array.some(elemento=>elemento%numeroPrimoActual==0)){
        factores.push(numeroPrimoActual);
        //cuando encontremos un elemento cuya division entre el numeroPrimo actual sea entera, los sustituimos;
        array.forEach((elemento,index,arreglo)=>{
            arreglo[index] = elemento%numeroPrimoActual==0 ? elemento/numeroPrimoActual : arreglo[index];
        });
        //volvemos a ejecutar la funcion con los nuevos elementos en el arreglo
        return mcm(array);
    }
    //movemos el indice de numeros primos, accedemos al siguiente en la secuencia de los mismos;
    //y ejecutamos nuevamente la funcion;
    numeroPrimoActual=numerosPrimos[++indiceNumeroPrimo];
    return mcm(array);
}

const calcular = (array)=>{
    const valido = validar(array);
    if (valido) return mcm(array);
    return false;
}


const minimoComunMultiplo = new Object();
Object.defineProperty(minimoComunMultiplo,"calcular",{value:calcular});
Object.freeze(minimoComunMultiplo);
export { minimoComunMultiplo }

