import { getAlunosLista } from "./actions";
import styles from "./page.module.css";

export default async function Alunos() {
    const alunos = await getAlunosLista();
    console.log(alunos);

    return (
        <div className={styles.page}>
            <h1>Lista de alunos</h1>

            <div className={styles.tabela}>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Cidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ana Silva</td>
                            <td>Desenvolvedora</td>
                            <td>Curitiba</td>
                        </tr>
                        <tr>
                            <td>Carlos Souza</td>
                            <td>Designer</td>
                            <td>São Paulo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}