"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import styles from "./layout.module.css";

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={styles.shell}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(false)}
      />
      <main className={styles.content}>
        {!isSidebarOpen && (
          <button
            className={styles.toggleButton}
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Exibir menu lateral"
            aria-expanded={isSidebarOpen}
            aria-controls="primary-sidebar"
          >
            Exibir menu
          </button>
        )}
        {children}
      </main>
    </div>
  );
}