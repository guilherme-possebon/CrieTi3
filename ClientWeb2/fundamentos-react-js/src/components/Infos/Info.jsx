/* eslint-disable react/prop-types */
import styles from "./Info.module.css";

export function Infos({ where, infoAuthor, infoAuthorRole, timeAgo }) {
  // for posts
  if (where == "post") {
    return (
      <div className={styles.personAboutPost}>
        <b className={styles.text}>{infoAuthor}</b>
        <span className={styles.text}>{infoAuthorRole}</span>
      </div>
    );
  }
  if (where == "sidebar") {
    return (
      <div className={styles.personAboutSideBar}>
        <b className={styles.text}>{infoAuthor}</b>
        <span className={styles.text}>{infoAuthorRole}</span>
      </div>
    );
  }
  if (where == "comment") {
    return (
      <div className={styles.personAboutComment}>
        <b className={styles.text}>{infoAuthor}</b>
        <span className={styles.timeAgo}>Cerca de {timeAgo}h</span>
      </div>
    );
  }
}
