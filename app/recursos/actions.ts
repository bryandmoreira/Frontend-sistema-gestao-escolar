"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type Registro = {
  id: string;
  [key: string]: string;
};

export type RegistroActionState = {
  success: boolean;
  message: string;
};

type Recurso = "cursos" | "funcionarios";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getString(record: Record<string, unknown>, ...keys: string[]): string {
  const value = keys.map((key) => record[key]).find((item) => item != null);
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : "";
}

function normalizeRegistro(
  value: unknown,
  recurso: Recurso,
): Registro {
  if (!isRecord(value)) {
    throw new Error(`A lista de ${recurso} contém um registro inválido.`);
  }

  const id = getString(value, "id", "_id", "codigo");
  if (!id) {
    throw new Error(`Um registro de ${recurso} não possui identificador.`);
  }

  if (recurso === "cursos") {
    return {
      id,
      nome: getString(value, "nome"),
      codigo: getString(value, "codigo"),
      descricao: getString(value, "descricao", "descrição"),
      cargaHoraria: getString(value, "cargaHoraria", "carga_horaria"),
      status: getString(value, "status"),
    };
  }

  return {
    id,
    nome: getString(value, "nome"),
    cpf: getString(value, "cpf"),
    email: getString(value, "email"),
    telefone: getString(value, "telefone"),
    cargo: getString(value, "cargo"),
  };
}

async function getToken(): Promise<string> {
  const token = (await cookies()).get("@gestao-escolar/token")?.value;
  if (!token) {
    throw new Error("Token não encontrado. Faça login novamente.");
  }
  return token;
}

async function getLista(recurso: Recurso): Promise<Registro[]> {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error("A variável API_URL não está configurada.");
  }

  let response: Response;
  try {
    response = await fetch(`${apiUrl}/${recurso}`, {
      headers: { Authorization: `Bearer ${await getToken()}` },
      next: { tags: [`pegarLista${recurso}`] },
    });
  } catch (error) {
    console.error(`Falha ao buscar ${recurso}:`, error);
    throw new Error(`Não foi possível carregar ${recurso}.`);
  }

  if (!response.ok) {
    throw new Error(`Falha ao carregar ${recurso} (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();
  const records = Array.isArray(data)
    ? data
    : isRecord(data) && Array.isArray(data[recurso])
      ? data[recurso]
      : isRecord(data) && Array.isArray(data.data)
        ? data.data
        : null;

  if (!records) {
    throw new Error(`A resposta da API não contém uma lista de ${recurso}.`);
  }
  return records.map((record: unknown) => normalizeRegistro(record, recurso));
}

async function updateRegistro(
  recurso: Recurso,
  id: string,
  formData: FormData,
  fields: readonly string[],
): Promise<RegistroActionState> {
  const registro = Object.fromEntries(
    fields.map((field) => [field, String(formData.get(field) ?? "").trim()]),
  );
  if (fields.some((field) => !registro[field])) {
    return { success: false, message: "Preencha todos os campos." };
  }

  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    return { success: false, message: "A variável API_URL não está configurada." };
  }

  let response: Response;
  try {
    response = await fetch(
      `${apiUrl}/${recurso}/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registro),
      },
    );
  } catch (error) {
    console.error(`Falha ao atualizar registro de ${recurso}:`, error);
    return { success: false, message: "Não foi possível comunicar com o servidor." };
  }

  if (!response.ok) {
    return {
      success: false,
      message: `Não foi possível salvar as alterações (HTTP ${response.status}).`,
    };
  }

  revalidatePath(`/${recurso}`);
  revalidatePath("/perfil");
  return { success: true, message: "Alterações salvas com sucesso." };
}

export async function getCursos(): Promise<Registro[]> {
  return getLista("cursos");
}

export async function getFuncionarios(): Promise<Registro[]> {
  return getLista("funcionarios");
}

export async function updateCurso(
  id: string,
  _previousState: RegistroActionState,
  formData: FormData,
): Promise<RegistroActionState> {
  return updateRegistro("cursos", id, formData, [
    "nome",
    "codigo",
    "descricao",
    "cargaHoraria",
    "status",
  ]);
}

export async function updateFuncionario(
  id: string,
  _previousState: RegistroActionState,
  formData: FormData,
): Promise<RegistroActionState> {
  return updateRegistro("funcionarios", id, formData, [
    "nome",
    "cpf",
    "email",
    "telefone",
    "cargo",
  ]);
}
