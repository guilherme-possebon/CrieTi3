/* eslint-disable react/prop-types */
import styles from "./Infos.module.css";

export function Infos(props) {
  return (
    <div className={`${styles.personAbout}`}>
      <b className={styles.text}>{props.infosAutor}</b>
      <span className={styles.text}>{props.infosConteudo}</span>
    </div>
  );
}
