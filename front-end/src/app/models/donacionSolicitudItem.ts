import { IBase } from "./base";
import { IDonacionSolicitud } from "./donacionSolicitud";

export interface IDonacionSolicitudItem extends IBase{
    nombre: string
    cantidadActual: number
    cantidadFin: number
    donacionSolicitudId: number
    donacionSolicitud: IDonacionSolicitud
}
