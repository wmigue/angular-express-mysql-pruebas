import { IBase } from "./base";
import { Usuario } from "./usuario";
import { UsuarioOrganizacion } from "./usuarioOrganizacion";

export interface IOrganizacion extends IBase{
    nombre: string
    descripcion: string
    contactoId: number
    contacto: Usuario
    usuarioOrganizacion: UsuarioOrganizacion[]
}
