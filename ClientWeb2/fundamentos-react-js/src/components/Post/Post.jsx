/* eslint-disable react/prop-types */
import { Avatar } from "../Avatar/Avatar";
import { Feedback } from "../Feedback/Feedback";
import { Infos } from "../Infos/Info";
import styles from "./Post.module.css";

export function Post(props) {
  return (
    <>
      <div className={styles.post}>
        <header className={styles.profile}>
          <div className={styles.infos}>
            <Avatar imgLink={props.img} />
            <Infos
              infoAuthor={props.author}
              infoContent={props.content}
              infoAuthorRole={props.authorRole}
            />
          </div>
          <span className={styles.text}>Publicado há 1h</span>
        </header>
        <main className={styles.content}>
          <p>Fala galera 👋</p>
          <p>
            Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
            no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare
            🚀
          </p>
          <a href="#">
            👉
            <span className={styles.differentText}>jane.design/doctorcare</span>
          </a>
          <div className={styles.tags}>
            <span className={styles.differentText}>#novoprojeto</span>
            <span className={styles.differentText}>#nlw</span>
            <span className={styles.differentText}>#rocketseat</span>
          </div>
        </main>
        <Feedback />
      </div>
    </>
  );
}
