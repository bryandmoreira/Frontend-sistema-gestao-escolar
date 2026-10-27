import styles from "./page.module.css";
import Button from "@/components/Button";

export default function Login() {
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
          <input type="password" placeholder="****" />
          <Button variant="primary">Entrar</Button>
          
        </form>
        </div>
      </div>
      
    </>
  );
}