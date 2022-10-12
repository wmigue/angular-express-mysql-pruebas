import { IBase } from "./base";
import { IOrganizacion } from "./organizacion";
import { Usuario } from "./usuario";

export interface UsuarioOrganizacion extends IBase{
    usuarioId: number
    usuario: Usuario
    organizacionId:number
    organizacion:IOrganizacion
}
