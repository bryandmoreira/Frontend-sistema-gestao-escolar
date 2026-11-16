import Link from "next/link";
import { getAlunosLista } from "@/app/alunos/actions";
import { getCursos, getFuncionarios } from "@/app/recursos/actions";
import styles from "./page.module.css";

export const instant = false;

export default async function Perfil() {
  const [alunos, cursos, funcionarios] = await Promise.all([
    getAlunosLista(),
    getCursos(),
    getFuncionarios(),
  ]);

  const totals = [
    { label: "Alunos", count: alunos.length, href: "/alunos" },
    { label: "Cursos", count: cursos.length, href: "/cursos" },
    {
      label: "Funcionários",
      count: funcionarios.length,
      href: "/funcionarios",
    },
  ];

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Gestão escolar</p>
        <h1>Visão geral</h1>
        <p>Acompanhe os principais cadastros da instituição.</p>
      </header>

      <div className={styles.metrics}>
        {totals.map((item) => (
          <Link className={styles.metric} href={item.href} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.count}</strong>
            <small>Ver cadastro</small>
          </Link>
        ))}
      </div>

      <section className={styles.shortcuts} aria-labelledby="atalhos-title">
        <h2 id="atalhos-title">Acessos rápidos</h2>
        <div className={styles.links}>
          <Link href="/alunos">Gerenciar alunos</Link>
          <Link href="/cursos">Gerenciar cursos</Link>
          <Link href="/funcionarios">Gerenciar funcionários</Link>
        </div>
      </section>
    </section>
  );
}
