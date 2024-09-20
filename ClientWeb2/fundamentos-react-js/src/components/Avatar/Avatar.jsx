/* eslint-disable react/prop-types */
import styles from "./Avatar.module.css";

export function Avatar(props) {
  return (
    <>
      <img
        src={props.imgLink}
        alt="Imagem pessoa logada"
        className={styles.avatarWithBorder}
      />
    </>
  );
}
