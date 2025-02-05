import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import { useAuth } from "../../../context/AuthContext";

function Logo() {
  const { isAuthenticated } = useAuth(); // ✅ Correctly invoke useAuth()

  return (
    <Link to={isAuthenticated ? "/app" : "/"}>
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
