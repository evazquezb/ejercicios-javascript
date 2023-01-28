//implementamos el algoritmo de Euclides par obtener el máximo común divisor.
const Euclides = (numerador,denominador) => denominador==0 ? numerador : Euclides(denominador,numerador % denominador);
//creamos una función que divida ambos términos de la fracción entre el máximo común divisor
//y retorne un arreglo con los dos elementos divididos.
const reducirFraccion = (numerador,denominador) =>{    
    const mcd = Euclides(numerador,denominador);
    return [numerador/mcd,denominador/mcd]};
//reducirFraccion(1920,1080) -> [16,9];