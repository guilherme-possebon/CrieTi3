/* eslint-disable react/prop-types */
import { useState } from "react";
import { Avatar } from "../Avatar/Avatar";
import { Comment } from "../Comment/Comment";
import { Infos } from "../Infos/Info";
import styles from "./Post.module.css";
import { Button } from "../Button/Button";

export function Post({ img, author, authorRole }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  console.log(comments);

  const handleComments = () => {
    event.preventDefault();
    setComments([...comments, comment]);
  };

  let time = 0;

  return (
    <>
      <div className={styles.post}>
        <header className={styles.profile}>
          <div className={styles.infos}>
            <Avatar imgLink={img} hasBorder={false} />
            <Infos
              infoAuthor={author}
              infoAuthorRole={authorRole}
              where="post"
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
        <form className={styles.commentForm} onSubmit={handleComments}>
          <strong>Deixe seu feedback</strong>

          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            name="comment"
            placeholder="Deixe um comentário"
            required
          />

          <footer>
            <Button type="submit" nomeBotao="Publicar" />
          </footer>
        </form>

        {comments.map((commnet) => (
          <Comment
            comment={commnet}
            imgAvatar="https://picsum.photos/200"
            author="Aleatorio"
            authorRole="DEV"
            timeAgo={time++}
            key=""
          />
        ))}
      </div>
    </>
  );
}
