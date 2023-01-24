'use strict';

//función que recibe un arreglo que representa un conjunto, y un valor
//que será la cantidad de elementos por grupo
const combinar = function (array, longitud) {
    if(longitud==1)return array;
    //validamos que la cantidad de elementos por grupo sea un numero entero positivo
    if(longitud instanceof Object || !(Number.isInteger(Number(longitud)) && longitud<=array.length) || longitud<1 ) return false;
    const indices = [];
    const combinaciones = [];
    //llenamos un array de indices para apuntar en cada recursion
    for (let i = 0; i < longitud; i++) indices.push(i);
    //retornamos la ejecucion de funcion crearCombinacion
    return crearCombinacion(indices.length - 1);
    //Esta funcion cre un combinacion y la agrega al array combinaciones
    //la crea en base a los indices y una variable que sireve de apuntador
    //en cada recursion el indice o el apuntador cambian.
     function crearCombinacion(apuntador){
        if (apuntador == 0 && indices[apuntador] == array.length - (longitud- apuntador)) {
            return combinaciones;
        }
        if (indices[apuntador] <= array.length - (longitud - apuntador)) {
            while (indices[apuntador + 1]) {
                indices[apuntador] += 1;
                indices[apuntador + 1] = indices[apuntador];
                apuntador += 1;
            }
            const comb = [];
            if (indices[apuntador] == indices[apuntador - 1]) {
                indices[apuntador] += 1;
                return crearCombinacion(apuntador);
            }
            indices.forEach((e, idx) => comb.push(array[indices[idx]]));
            combinaciones.push(comb);
            indices[apuntador] += 1;
        }
        else apuntador -= 1;
        return crearCombinacion(apuntador);
    }


}
//se crea un objeto con la funcion combinar como metodo y se exporta;
const conjunto = new Object;
Object.defineProperty(conjunto,"combinar",{value:combinar});
Object.freeze(conjunto);
export {conjunto}
