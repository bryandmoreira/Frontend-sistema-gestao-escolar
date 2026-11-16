import { getAlunosLista } from "./actions";
import AlunosLista from "./AlunosLista";
import styles from "./page.module.css";

export const instant = false;

export default async function Alunos() {
  const alunos = await getAlunosLista();

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Alunos</h1>
        <p>Consulte e edite os dados cadastrais dos alunos.</p>
      </header>
      <AlunosLista alunos={alunos} />
    </section>
  );
}
