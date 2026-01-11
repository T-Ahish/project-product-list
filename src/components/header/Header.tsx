import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Monc Logo" className={styles.headerLogo} />
      <p className={styles.headerTitle}>Monc Upsell & Cross-sell</p>
    </header>
  );
};

export default Header;
