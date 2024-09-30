import { useState } from "react";
import styles from "./Feedback.module.css";
import { Button } from "../Button/Button";

export function Feedback() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleComment = () => {
    setComments(...comments, comment);

    console.log(comment);
  };

  const handleSubmit = () => {
    alert("Submit feito: " + comment);
  };
  console.log(comments, 123);

  return (
    <>
      <form className={styles.feedback} onSubmit={handleSubmit} method="dialog">
        <b>Deixe o seu feedback</b>
        <textarea
          name="feedback"
          id="feedback"
          rows={5}
          onChange={(event) => {
            setComment(event.target.value);
            handleComment();
          }}
        />
        <Button nomeBotao="Publicar" type="submit" />
      </form>
    </>
  );
}
