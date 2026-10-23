import styles from "./page.module.css";

export default function Login() {
  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <div className={styles.logo} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7.5" cy="15.5" r="5.5" />
            <path d="m21 2-9.6 9.6" />
            <path d="m15.5 7.5 3 3L22 7l-3-3" />
          </svg>
        </div>

        <h1 className={styles.title}>Login</h1>
        <p className={styles.lead}>
          Acesse o sistema com suas credenciais para realizar a gestão acadêmica e administrativa,
          consultar informações e acompanhar os registros da instituição de ensino.
        </p>

        <form>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email de Acesso</label>
            <input className={`${styles.input} ${styles.mono}`} id="email" type="email" placeholder="email@exemplo.com" />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="senha">Senha de Acesso</label>
            <input className={styles.input} id="senha" type="password" placeholder="••••••••" />
          </div>

          <a className={styles.forgot} href="#">Esqueceu sua senha?</a>

          <button className={styles.button} type="submit">Entrar</button>
        </form>
      </main>
    </div>
  );
}