//implementamos el algoritmo de Euclides par obtener el máximo común divisor.
const Euclides = (ancho,alto) => alto==0 ? ancho : Euclides(alto,ancho % alto);
//creamos una función que divida ambos términos de la fracción entre el máximo común divisor
//y retorne un arreglo con los dos elementos divididos.
const reducirFraccion = (ancho,alto) =>{    
    const mcd = Euclides(ancho,alto);
    return [ancho/mcd,alto/mcd]};

const euclides = new Object();
Object.defineProperty(euclides,"reducirFraccion",{value:reducirFraccion});
Object.freeze(euclides);
export {euclides};



