"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type Aluno = {
  id: string;
  nome: string;
  matricula: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  telefone: string;
  endereco: string;
};

export type AlunoActionState = {
  success: boolean;
  message: string;
};

const initialActionState: AlunoActionState = {
  success: false,
  message: "",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(
  record: Record<string, unknown>,
  ...keys: string[]
): string {
  const value = keys.map((key) => record[key]).find((item) => item != null);
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : "";
}

function normalizeAluno(value: unknown): Aluno {
  if (!isRecord(value)) {
    throw new Error("A lista de alunos retornou um registro inválido.");
  }

  const id = readString(value, "id", "_id", "matricula");
  if (!id) {
    throw new Error("Um aluno retornado pela API não possui identificador.");
  }

  return {
    id,
    nome: readString(value, "nome"),
    matricula: readString(value, "matricula"),
    cpf: readString(value, "cpf"),
    dataNascimento: readString(value, "dataNascimento", "data_nascimento"),
    email: readString(value, "email"),
    telefone: readString(value, "telefone"),
    endereco: readString(value, "endereco"),
  };
}

async function getToken(): Promise<string> {
  const token = (await cookies()).get("@gestao-escolar/token")?.value;
  if (!token) {
    throw new Error("Token não encontrado. Faça login novamente.");
  }
  return token;
}

export async function getAlunosLista(): Promise<Aluno[]> {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error("A variável API_URL não está configurada.");
  }

  const token = await getToken();
  let response: Response;
  try {
    response = await fetch(`${apiUrl}/alunos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["pegarListaAlunos"] },
    });
  } catch (error) {
    console.error("Falha ao buscar alunos:", error);
    throw new Error("Não foi possível carregar a lista de alunos.");
  }

  if (!response.ok) {
    throw new Error(`Falha ao carregar alunos (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();
  const records = Array.isArray(data)
    ? data
    : isRecord(data) && Array.isArray(data.alunos)
      ? data.alunos
      : isRecord(data) && Array.isArray(data.data)
        ? data.data
        : null;

  if (!records) {
    throw new Error("A resposta da API não contém uma lista de alunos.");
  }
  return records.map(normalizeAluno);
}

export async function updateAluno(
  id: string,
  _previousState: AlunoActionState,
  formData: FormData,
): Promise<AlunoActionState> {
  const fields = [
    "nome",
    "matricula",
    "cpf",
    "dataNascimento",
    "email",
    "telefone",
    "endereco",
  ] as const;
  const aluno = Object.fromEntries(
    fields.map((field) => [field, String(formData.get(field) ?? "").trim()]),
  );

  if (fields.some((field) => !aluno[field])) {
    return {
      ...initialActionState,
      message: "Preencha todos os dados do aluno.",
    };
  }

  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    return {
      ...initialActionState,
      message: "A variável API_URL não está configurada.",
    };
  }

  let response: Response;
  try {
    const token = await getToken();
    response = await fetch(
      `${apiUrl}/alunos/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
      },
    );
  } catch (error) {
    console.error("Falha ao atualizar aluno:", error);
    return {
      ...initialActionState,
      message: "Não foi possível comunicar com o servidor.",
    };
  }

  if (!response.ok) {
    return {
      ...initialActionState,
      message: `Não foi possível salvar as alterações (HTTP ${response.status}).`,
    };
  }

  revalidatePath("/alunos");
  return { success: true, message: "Dados do aluno atualizados." };
}
