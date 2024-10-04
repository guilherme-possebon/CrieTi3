/* eslint-disable react/prop-types */

import { Avatar } from "../Avatar/Avatar";
import { Infos } from "../Infos/Info";
import styles from "./Comment.module.css";

export function Comment(props) {
  return (
    <>
      <div className={styles.container}>
        <div>
          <Avatar imgLink={props.imgAvatar} hasBorder={false} />
        </div>
        <div className={styles.comment}>
          <Infos
            infoAuthor={props.author}
            infoAuthorRole={props.authorRole}
            timeAgo={props.timeAgo}
            where="comment"
          />
          <span>{props.comment}</span>
        </div>
      </div>
    </>
  );
}
