import EditableRecords, { type EditableField } from "@/components/EditableRecords";
import {
  getFuncionarios,
  updateFuncionario,
} from "@/app/recursos/actions";
import styles from "./page.module.css";

export const instant = false;

const fields: EditableField[] = [
  { key: "nome", label: "Nome" },
  { key: "cpf", label: "CPF" },
  { key: "email", label: "E-mail", type: "email" },
  { key: "telefone", label: "Telefone", type: "tel" },
  { key: "cargo", label: "Cargo" },
];

export default async function FuncionariosPage() {
  const funcionarios = await getFuncionarios();

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Funcionários</h1>
        <p>Consulte e edite as informações dos funcionários cadastrados.</p>
      </header>
      <EditableRecords
        registros={funcionarios}
        fields={fields}
        update={updateFuncionario}
        emptyMessage="Nenhum funcionário cadastrado."
      />
    </section>
  );
}
