import styles from "../styles/Note.modules.css";
// import * as styles from "../styles/note.modules.css";

import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import {formatDate} from "../utils/formatDate";
import { MdDeleteOutline } from "react-icons/md";
import stylesUtils from "../styles/utils.module.css";

interface NoteProps {
    note: NoteModel,
    className?: string
}

const Note = ({ note, className }:NoteProps) => {

    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = note;

    let createdUpdatedText: string;
    if(updatedAt > createdAt){
        createdUpdatedText = "Updated " + formatDate(updatedAt)
    }
    else {
        createdUpdatedText = "Created" + formatDate(createdAt);
    }

    return (    
        <Card className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
            <Card.Title className={stylesUtils.flexCenter}>
                {title}
      <MdDeleteOutline className="text-muted ms-auto"/>

            </Card.Title>
            <Card.Text className={styles.cardText}>
                {text}
            </Card.Text>
            <p>{updatedAt}</p>
            </Card.Body>
            <Card.Footer className="text-muted">
              {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}
export default Note
