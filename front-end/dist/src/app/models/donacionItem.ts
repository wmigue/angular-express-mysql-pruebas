import { IBase } from "./base";
import { IDonacion } from "./donacion";
import { IDonacionSolicitudItem } from "./donacionSolicitudItem";

export interface IDonacionItem extends IBase{
    observaciones:string
    cantidad:number
    donacionId:number
    donacion:IDonacion
    donacionSolicitudItemId: number
    donacionSolicitudItem: IDonacionSolicitudItem
}
