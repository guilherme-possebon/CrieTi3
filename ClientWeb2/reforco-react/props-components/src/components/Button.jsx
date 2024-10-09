/* eslint-disable react/prop-types */
import styles from "./Button.module.css";
export function Button({ name, style }) {
  if (style == "success") {
    return (
      <>
        <button type="button" className={`${styles.button} ${styles.success}`}>
          {name}
        </button>
      </>
    );
  } else if (style == "danger") {
    return (
      <>
        <button type="button" className={`${styles.button} ${styles.danger}`}>
          {name}
        </button>
      </>
    );
  } else if (style == "primary") {
    return (
      <>
        <button type="button" className={`${styles.button} ${styles.primary}`}>
          {name}
        </button>
      </>
    );
  } else {
    return (
      <>
        <button type="button" className={styles.button}>
          {name}
        </button>
      </>
    );
  }
}
