import { IBase } from "./base";
import { IDonacionSolicitud } from "./donacionSolicitud";
import { Usuario } from "./usuario";

export interface IDonacion extends IBase{
    observacion: string
    cantidad:number
    donacionSolicitudId: number
    donacionSolicitud: IDonacionSolicitud
    donanteId:number
    donante:Usuario
}
