"use server";

import { cookies } from "next/headers";



export async function getAlunosLista() {
    const cookieStore = cookies();

    const token = (await cookieStore).get("@gestao-escolar/token")?.value;

    if (!token) {
        throw new Error("Token não encontrado");
    }

    let response: Response;
    try {
        response = await fetch(`${process.env.API_URL}/alunos`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
            next: { tags: ["pegarListaAlunos"] }
        })
    } catch (e) {
        console.error(e);
        return "Falha na requisição";
    }

    const data = await response.json();
    return data;
}