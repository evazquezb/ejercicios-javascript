//funcion que valida que el argumento recibido en las demas funciones
//sea un array de elementos que sean numeros enteros o se puedan convertir a numeros enteros
//caso contrario retorna false;
export default function validarArrayEnterosPositivos(array){
    if(!Array.isArray(array)) return false;
    if( array.length==0 || array.some(n=>n instanceof Object) || !array.every(n=>Number.isInteger(Number(n))) || array.some(n=>n<0) ) return false;
    return array;
}