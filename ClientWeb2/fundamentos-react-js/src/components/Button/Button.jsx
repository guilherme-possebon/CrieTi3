/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

export function Button(props) {
  return (
    <>
      <div>
        <button type={props.type} className={styles.btnPrimary}>
          {props.nomeBotao}
        </button>
      </div>
    </>
  );
}
