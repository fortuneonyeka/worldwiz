import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Header from "../components/navigations/header/Header";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// 3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate()

  const {login, isAuthenticated} = useAuth()

  useEffect(() => {
    if(isAuthenticated) {
      navigate("/app")
    }
  },[isAuthenticated])

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <main className={styles.login}>
      <Header />
      <form className={styles.form} onSubmit={handleSubmit}>
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
          <button>Login</button>
        </div>
      </form>
    </main>
  );
}
