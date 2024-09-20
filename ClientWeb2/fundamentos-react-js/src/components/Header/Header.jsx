import styles from "./Header.module.css";

import Logo from "/logo.png";

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <img src={Logo} alt="Logo" />
      </header>
    </>
  );
}
