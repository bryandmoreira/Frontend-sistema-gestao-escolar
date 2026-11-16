"use client";

import { useState, useTransition } from "react";
import { updateAluno, type Aluno, type AlunoActionState } from "./actions";
import styles from "./page.module.css";

const fields = [
  { name: "nome", label: "Nome", type: "text" },
  { name: "matricula", label: "Matrícula", type: "text" },
  { name: "cpf", label: "CPF", type: "text" },
  { name: "dataNascimento", label: "Data de nascimento", type: "date" },
  { name: "email", label: "E-mail", type: "email" },
  { name: "telefone", label: "Telefone", type: "tel" },
  { name: "endereco", label: "Endereço", type: "text" },
] as const;

function AlunoCard({ aluno }: { aluno: Aluno }) {
  const [editing, setEditing] = useState(false);
  const [state, setState] = useState<AlunoActionState>({
    success: false,
    message: "",
  });
  const [pending, startTransition] = useTransition();

  return (
    <article className={styles.card}>
      {editing ? (
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            startTransition(async () => {
              const result = await updateAluno(aluno.id, state, formData);
              setState(result);
              if (result.success) {
                setEditing(false);
              }
            });
          }}
        >
          <div className={styles.fields}>
            {fields.map((field) => (
              <label className={styles.field} key={field.name}>
                <span>{field.label}</span>
                <input
                  type={field.type}
                  name={field.name}
                  defaultValue={
                    field.name === "dataNascimento"
                      ? aluno.dataNascimento.slice(0, 10)
                      : aluno[field.name]
                  }
                  required
                />
              </label>
            ))}
          </div>
          {state.message && (
            <p
              className={state.success ? styles.success : styles.error}
              role="status"
            >
              {state.message}
            </p>
          )}
          <div className={styles.actions}>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => {
                setEditing(false);
                setState({ success: false, message: "" });
              }}
              disabled={pending}
            >
              Cancelar
            </button>
            <button
              className={styles.primaryButton}
              type="submit"
              disabled={pending}
            >
              {pending ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.cardHeader}>
            <h2>{aluno.nome || "Aluno sem nome"}</h2>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => {
                setEditing(true);
                setState({ success: false, message: "" });
              }}
            >
              Editar
            </button>
          </div>
          <dl className={styles.details}>
            {fields.map((field) => (
              <div className={styles.detail} key={field.name}>
                <dt>{field.label}</dt>
                <dd>{aluno[field.name] || "—"}</dd>
              </div>
            ))}
          </dl>
          {state.message && (
            <p className={styles.success} role="status">
              {state.message}
            </p>
          )}
        </>
      )}
    </article>
  );
}

export default function AlunosLista({ alunos }: { alunos: Aluno[] }) {
  if (alunos.length === 0) {
    return <p className={styles.empty}>Nenhum aluno cadastrado.</p>;
  }

  return (
    <div className={styles.lista}>
      {alunos.map((aluno) => (
        <AlunoCard key={aluno.id} aluno={aluno} />
      ))}
    </div>
  );
}
