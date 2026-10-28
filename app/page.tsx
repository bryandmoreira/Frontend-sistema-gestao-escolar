"use client";

import styles from "./page.module.css";
import { useState } from "react";
import Button from "@/components/Button";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={styles.page}>

        <div className={styles.login}>
          <div className={styles.logo} aria-hidden="true">
            <svg viewBox="-10 -1 45 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="7.5" cy="15.5" r="5.5" />
              <path d="m21 2-9.6 9.6" />
              <path d="m15.5 7.5 3 3L22 7l-3-3" />
            </svg>
          </div>


          <h1>Olá! Bem-vindo de volta</h1>



          <form className={styles.form}>
            <p>Email de Acesso</p>
            <input type="text" placeholder="email@exemplo.com" />

            <p>Senha de Acesso</p>
            <div className={styles.password}>
              <input type={showPassword ? "text" : "password"} placeholder="****" />

              <input
                type="checkbox"
                className={styles.checkbox}
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                aria-label="Mostrar senha"
              />
            </div>
            <span>Minimo 8 caracteres</span>
            <Button variant="primary">Entrar
              <link href="/dashbord"/>
            </Button>

          </form>
        </div>
      </div>



    </>
  );
}

