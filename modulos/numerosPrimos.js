'use strict';
//se crea un arreglo donde se guardara la secuencia de numeros primos
const numerosPrimos = [];
const obtenerSecuencia = function (number) {
    //se usa un try catch para retornar toda la secuencia de numeros alcanzados a calcular
    //cuando se lanze un error por no poder seguir ejecutando la recursion
    try {
        //establecemos una variable en 1
        let primo=1;
        //calculamos un limite para el maximo de iteracciones
        const tope = Math.floor(Math.sqrt(number));
        //iteramos y...si el numero que se desea saber si es primo es divisible entre el valor del indice
        //mientras iteramos, significa que No es primo, por lo tanto establecemos primo en "0"(false);
        //y rompemos el ciclo;
        for (let i = 2; i <= tope; i++)
            if(number % i == 0){
                primo=0;
                break;
            }
        //si al final primo siguio siendo "1"(true) lo agregamos a la secuencia(arreglo numerosPrimos)(this)
        //this tiene como valor el arreglo "numerosPrimos" 
        //por que fue establecido mediante enlazamiento explicito usando el metodo "call"
        if(primo) this.push(number);
        return obtenerSecuencia.call(numerosPrimos,number + 1);
    }
    catch(error) {
        //aqui retornamos el arreglo numerosPrimos cuando la funcion excede el limite de llamadas;
        if(error.message==='Maximum call stack size exceeded')
        return numerosPrimos;
    }
}

//ejecutamos la funcion obtenerSecuencia
obtenerSecuencia.call(numerosPrimos,2);
//exportamos el arreglo de numeros primos;
export {numerosPrimos}

