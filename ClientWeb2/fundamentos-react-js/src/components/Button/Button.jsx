/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

export function Button(props) {
  return (
    <>
      <div
        className={`${styles.fadeDiv} ${props.isFocused ? styles.visible : ""}`}
      >
        <button type="button" className={styles.btnPrimary}>
          {props.nomeBotao}
        </button>
      </div>
    </>
  );
}
