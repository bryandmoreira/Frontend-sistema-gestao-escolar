"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

type NavItem = { 
  label: string;
  href: string;
  color: string;
};

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const items: NavItem[] = [
  { label: "Perfil", href: "/perfil", color: "var(--color-primary)" },
  { label: "Cursos", href: "/cursos", color: "var(--color-cursos)" },
  { label: "Alunos", href: "/alunos", color: "var(--color-alunos)" },
  { label: "Funcionários", href: "/funcionarios", color: "var(--color-funcionarios)" },
  { label: "Matrículas", href: "/matriculas", color: "var(--color-matriculas)" },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      id="primary-sidebar"
      className={`${styles.sidebar} ${isOpen ? "" : styles.closed}`}
      aria-hidden={!isOpen}
    >
      <div className={styles.header}>
        <div className={styles.logo} aria-hidden="true">
          <svg
            viewBox="-10 -1 45 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="7.5" cy="15.5" r="5.5" />
            <path d="m21 2-9.6 9.6" />
            <path d="m15.5 7.5 3 3L22 7l-3-3" />
          </svg>
        </div>
        <button
          className={styles.toggleButton}
          type="button"
          onClick={onToggle}
          aria-label="Fechar menu lateral"
          aria-expanded={isOpen}
          aria-controls="primary-sidebar"
        >
            =
        </button>
      </div>

      <nav aria-label="Menu principal">
        <ul className={styles.list}>
          {items.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${isActive ? styles.active : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}