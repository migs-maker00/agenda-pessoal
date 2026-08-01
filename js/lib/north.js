/** North — companheiro do app (não é o nome do usuário). */

export const COMPANHEIRO_NOME = "North";

export const USUARIO_PADRAO = "Miguel";

export function nomeUsuarioPerfil(perfil) {
  const nome = String(perfil?.nome || "").trim();
  return nome || USUARIO_PADRAO;
}
