import { getAlunosLista } from "./actions";

export default async function Alunos() {
    const alunos = await getAlunosLista();
    console.log(alunos);

    return (
        <div>
            <h1>Lista de alunos</h1>
        </div>
    );
}