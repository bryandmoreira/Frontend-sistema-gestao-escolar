"use client";

import { useState, useTransition } from "react";
import type { Registro, RegistroActionState } from "@/app/recursos/actions";
import styles from "./EditableRecords.module.css";

export type EditableField = {
  key: string;
  label: string;
  type?: "text" | "email" | "tel" | "number";
};

type UpdateAction = (
  id: string,
  previousState: RegistroActionState,
  formData: FormData,
) => Promise<RegistroActionState>;

function RegistroCard({
  registro,
  fields,
  update,
}: {
  registro: Registro;
  fields: EditableField[];
  update: UpdateAction;
}) {
  const [editing, setEditing] = useState(false);
  const [state, setState] = useState<RegistroActionState>({
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
              const result = await update(registro.id, state, formData);
              setState(result);
              if (result.success) setEditing(false);
            });
          }}
        >
          <div className={styles.fields}>
            {fields.map((field) => (
              <label className={styles.field} key={field.key}>
                <span>{field.label}</span>
                <input
                  type={field.type ?? "text"}
                  name={field.key}
                  defaultValue={registro[field.key]}
                  required
                />
              </label>
            ))}
          </div>
          {state.message && (
            <p className={styles.error} role="status">
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
            <h2>{registro.nome || "Registro sem nome"}</h2>
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
              <div className={styles.detail} key={field.key}>
                <dt>{field.label}</dt>
                <dd>{registro[field.key] || "—"}</dd>
              </div>
            ))}
          </dl>
          {state.success && (
            <p className={styles.success} role="status">
              {state.message}
            </p>
          )}
        </>
      )}
    </article>
  );
}

export default function EditableRecords({
  registros,
  fields,
  update,
  emptyMessage,
}: {
  registros: Registro[];
  fields: EditableField[];
  update: UpdateAction;
  emptyMessage: string;
}) {
  if (registros.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.list}>
      {registros.map((registro) => (
        <RegistroCard
          key={registro.id}
          registro={registro}
          fields={fields}
          update={update}
        />
      ))}
    </div>
  );
}
