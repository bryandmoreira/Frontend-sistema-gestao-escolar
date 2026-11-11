"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import styles from "./layout.module.css";

export default function AlunosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={styles.shell}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((open) => !open)}
      />
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
