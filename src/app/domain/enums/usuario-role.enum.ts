export enum UsuarioRole {
    ADMINISTRADOR = "ADMINISTRADOR",
    COORDENADOR_OPERACAO = "COORDENADOR_OPERACAO",
    OPERADOR_CENTRAL = "OPERADOR_CENTRAL",
    OPERADOR_CAMPO = "OPERADOR_CAMPO"
}

export const RoleLabel = new Map<UsuarioRole, string>([
    [UsuarioRole.ADMINISTRADOR, "Administrador"],
    [UsuarioRole.COORDENADOR_OPERACAO, "Coordenador de operação"],
    [UsuarioRole.OPERADOR_CENTRAL, "Operador central"],
    [UsuarioRole.OPERADOR_CAMPO, "Operador de campo"]
]);
