'use strict';
const numerosPrimos = [];
const obtenerSecuencia = function (number) {
    try {
        let primo=1;
        const tope = Math.floor(Math.sqrt(number));
        for (let i = 2; i <= tope; i++)
            if(number % i == 0){
                primo=0;
                break;
            }
        if(primo) this.push(number);
        return obtenerSecuencia.call(numerosPrimos,number + 1);
    }
    catch(error) {
        if(error.message==='Maximum call stack size exceeded')
        return numerosPrimos;
    }
}

obtenerSecuencia.call(numerosPrimos,2);

export {numerosPrimos}

