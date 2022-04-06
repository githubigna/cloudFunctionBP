import * as moment from "moment";
interface periodResponse {
    fechaFin: string,
    fechaInicio: string,
    fechaVencimiento: string
}
export function calculatePeriod(): periodResponse {
    const now = moment();
    let fechaInicio: string;
    let fechaFin: string;
    let fechaVencimiento: string;
    
    if (now.date() >= 28) {
        //* Fecha inicio seria el mes pasado 28 y fecha fin 28 del mismo mes - 
        fechaInicio = moment().subtract(1, 'months').set('date', 28).startOf('d').format('YYYYMMDD');
        fechaFin = moment().set('date', 28).startOf('d').format('YYYYMMDD');
    } else {
        //* Fecha inicio 28 - 2meses, fecha fin 28 - 1 mes -
        fechaInicio = moment().subtract(2, 'months').set('date', 28).startOf('d').format('YYYYMMDD');
        fechaFin = moment().subtract(1, 'months').set('date', 28).startOf('d').format('YYYYMMDD');
    }
    fechaVencimiento = moment().add(1, "d").format('YYYYMMDD');
    return {
        fechaFin: fechaFin,
        fechaInicio: fechaInicio,
        fechaVencimiento
    }
}