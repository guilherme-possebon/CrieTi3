/* eslint-disable react/prop-types */
import styles from "./Avatar.module.css";

export function Avatar({ hasBorder = true, imgLink }) {
  return (
    <>
      <img
        src={imgLink}
        alt="Imagem pessoa logada"
        className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      />
    </>
  );
}
