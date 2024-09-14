import styles from "./Post.module.css";

export function Post(props) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{props.autor}</p>
      <p className={styles.text}>{props.conteudo}</p>
    </div>
  );
}
