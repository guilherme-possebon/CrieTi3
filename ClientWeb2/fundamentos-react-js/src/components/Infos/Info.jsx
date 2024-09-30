/* eslint-disable react/prop-types */
import styles from "./Info.module.css";

export function Infos(props) {
  return (
    <div className={`${styles.personAbout}`}>
      <b className={styles.text}>{props.infoAuthor}</b>
      <span className={styles.text}>{props.infoContent}</span>
      <span className={styles.text}>{props.infoAuthorRole}</span>
    </div>
  );
}
