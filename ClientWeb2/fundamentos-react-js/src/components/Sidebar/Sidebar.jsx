/* eslint-disable react/prop-types */
import { Avatar } from "../Avatar/Avatar";
import { Infos } from "../Infos/Info";
import styles from "./Sidebar.module.css";

import { PencilLine } from "@phosphor-icons/react";

export function Sidebar(props) {
  return (
    <>
      <aside className={styles.sidebar}>
        <img
          src="/banner.png"
          alt="Banner pessoa logada"
          className={styles.cover}
        />

        <div className={styles.profile}>
          <Avatar imgLink={props.img} />

          <Infos
            infoAuthor="Guilherme Possebon"
            infoAuthorRole="Desenvolvedor Junior"
            where="sidebar"
          />
        </div>

        <footer>
          <a href="#">
            <PencilLine size={20} />
            Editar seu perfil
          </a>
        </footer>
      </aside>
    </>
  );
}
