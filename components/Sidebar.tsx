import Link from "next/link";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <aside
      id="perfil-sidebar"
      className={`${styles.sidebar} ${isOpen ? "" : styles.closed}`}
    >
      <button
        className={styles.toggleButton}
        type="button"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls="perfil-sidebar-content"
        onClick={onToggle}
      >
        =
      </button>
      <div
        id="perfil-sidebar-content"
        className={styles.content}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <h2 className={styles.title}>Menu</h2>
        <nav>
          <ul className={styles.list}>
            <li><Link href="/perfil">Perfil</Link></li>
            <li><Link href="/alunos">Alunos</Link></li>
            <li><Link href="/funcionarios">Funcionários</Link></li>
            <li>
              <span className={styles.disabledLink} aria-disabled="true">
                Matrículas
              </span>
            </li>
            <li><Link href="/cursos">Cursos</Link></li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}