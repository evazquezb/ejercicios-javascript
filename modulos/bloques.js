import validar from './validarArrayEnterosPositivos.js';
//Constante para guardar el arreglo que el objeto.crear() recibirá como argumento;
let arreglo =[]
/*funcion para crear una matriz a partir del arreglo*/
const matriz = function (array) {
    array=validar(array);
    if(!array) return false;
    let mtrx = [];
    //calculo altura(tomo el valor mas alto del array)
    let altura = array.reduce((a,b)=>Math.max(a,b),-Infinity);
    //creo un arreglo bidimensional con dicha altura 
    for (let indice = 0; indice < altura; indice++)  mtrx.push(new Array(array.length).fill('~~'));
    //retorno el arreglo creado
    return mtrx;
}

/* funcion para colocar blockes en la matriz los campos con bloques contendrán estos caracteres '██' */
const bloques= function(mtrx){
    //creamos una copia del arreglo bidimensional para no alterar el original
    const newMtrx = crearCopia(mtrx);
     //creamos una copia del arreglo base para no alterar el original
    const newArreglo = [...arreglo];
    //colocmos los blockes en su posicion de acuerdo al arreglo que representa los bloques
    for (let indice = newMtrx.length - 1; indice >= 0; indice--) {
         newArreglo.forEach((element, index) => {
            element > 0?(newMtrx[indice][index] = '██',newArreglo[index] -= 1):null;
        });
    }
    //retornamos la copia del arreglo bidimensional creada pero ya con los campos llenos, correspondientes a los bloques
    return newMtrx;
}

/* funcion para desbordar agua de los lados */
function vacios(mtrx){
    //creamos una copia de la matriz con bloques para no alterar la original
    const newMtrx = crearCopia(mtrx);
    //barremos todas las filas de izquierda a derecha y luego derecha a izquierda
    newMtrx.forEach(element=>{
        let idx = 0;
        while(element[idx]=='~~'){
            element[idx]=null;
            idx++;
            }
        idx = element.length-1;
        while(element[idx]=='~~'){
            element[idx]=null;
            idx--;
            }
}   );
     //retornamos la matriz barrida, ahora tiene campos con bloques('██'),campos con agua('~~') y campos vacíos(null);
     return newMtrx;     
 }

  /* Esta es la función para crear y retornar una copia de arreglos bidimensionales recibidos como argumento */
 function crearCopia(mtrx){
    const newMtrx = [];
    mtrx.forEach(array=>newMtrx.push([...array]));
    return newMtrx;
}

/*Esta función será el metodo principal del objeto a exportar*/
//hará uso de mas demás funciones y devolverá la matriz completa.
const crear = function(array){
    array=validar(array);
    if(!array) return false;
    arreglo = [...array];
    return vacios(bloques(matriz(array)));
}

const creadorBloques = {};
Object.defineProperty(creadorBloques,"crear",{value:crear});
Object.freeze(creadorBloques);
export {creadorBloques}

