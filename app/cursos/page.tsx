import EditableRecords, { type EditableField } from "@/components/EditableRecords";
import { getCursos, updateCurso } from "@/app/recursos/actions";
import styles from "./page.module.css";

export const instant = false;

const fields: EditableField[] = [
  { key: "nome", label: "Nome do curso" },
  { key: "codigo", label: "Código" },
  { key: "descricao", label: "Descrição" },
  { key: "cargaHoraria", label: "Carga horária", type: "number" },
  { key: "status", label: "Status" },
];

export default async function CursosPage() {
  const cursos = await getCursos();

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Cursos</h1>
        <p>Consulte e edite as informações dos cursos cadastrados.</p>
      </header>
      <EditableRecords
        registros={cursos}
        fields={fields}
        update={updateCurso}
        emptyMessage="Nenhum curso cadastrado."
      />
    </section>
  );
}
