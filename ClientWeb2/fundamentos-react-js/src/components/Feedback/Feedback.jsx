import { useState } from "react";
import styles from "./Feedback.module.css";
import { Button } from "../Button/Button";

export function Feedback() {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <>
      <div className={styles.feedback}>
        <b>Deixe o seu feedback</b>
        <textarea
          name="feedback"
          id="feedback"
          rows={5}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></textarea>
        <Button isFocused={isFocused} nomeBotao="Publicar" />
      </div>
    </>
  );
}
