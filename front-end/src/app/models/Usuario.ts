
export interface Usuario {
    id?: number,
    nombre?: string,
    apellido?: string
    mail?: string
    role?: string
    password?: string
    created_at?: Date
    estado?: string
    taller: string
};



//    usuarioOrganizaciones: UsuarioOrganizacion[]