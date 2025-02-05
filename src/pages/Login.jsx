import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Header from "../components/navigations/header/Header";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/re-usables/button/Button";

export default function Login() {
  const [email, setEmail] = useState("fortune@example.com");
  const [password, setPassword] = useState("superdev");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (email && password) {
      const result = login(email, password);
      if (result?.error) {
        setError(result.error);
      }
    }
  };

  return (
    <main className={styles.login}>
      <Header />
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" text="Login" />
        </div>
      </form>
    </main>
  );
}
