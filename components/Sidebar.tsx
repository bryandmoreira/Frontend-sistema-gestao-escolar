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
            <li><a href="">Perfil</a></li>
            <li><a href="">Alunos</a></li>
            <li><a href="">Funcionários</a></li>
            <li><a href="">Matrículas</a></li>
            <li><a href="">Cursos</a></li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}