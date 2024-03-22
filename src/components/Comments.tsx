import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import CommentsList from "./CommentsList";
import Spinner from "@/components/Spinner";
import { CommentType } from "@/types/main";
import styles from "@/styles/components/comments.module.scss";

interface CommentsProps {
  photoId: string;
}

const Comments = ({ photoId }: CommentsProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [error, setError] = useState<string>("");
  const [commentName, setCommentName] = useState<string>("");
  const [commentMessage, setCommentMessage] = useState<string>("");

  const onHandleInputName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCommentName(e.target.value);

  const onHandleInputMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setCommentMessage(e.target.value);

  const onHandleCommentSub = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/comments`, {
        username: commentName,
        text: commentMessage,
        imageId: photoId,
      });

      setComments((currentComments) => [...currentComments, response.data]);
      setCommentName("");
      setCommentMessage("");
      setError("");
    } catch (err) {
      const error = axios.isAxiosError(err)
        ? err.message
        : "An unexpected error occurred";

      setError("Failed to write the comment.");
      console.error("Failed to write comment:", error);
    } finally {
    }
  };

  if (error) {
    return (
      <div>
        Errore! Non è stato possibile aggiungere il commento, riprovare.{error}
      </div>
    );
  }

  return (
    <section className={styles.comments}>
      {<CommentsList photoId={photoId} commentsList={comments} />}

      <h3>Aggiungi commento</h3>
      <form className={styles.comments__form} onSubmit={onHandleCommentSub}>
        <label htmlFor="name">Nome</label>
        <input
          className={styles.nameField}
          type="text"
          id="name"
          placeholder="Aggiungi il tuo nome"
          value={commentName}
          onChange={onHandleInputName}
        />
        <label htmlFor="message">Messaggio</label>
        <textarea
          className={styles.messageField}
          id="message"
          placeholder="Inserisci il tuo messaggio"
          value={commentMessage}
          rows={5}
          onChange={onHandleInputMessage}
        />
        <input
          className={styles.submitBtn}
          type="submit"
          value="Invia commento"
        />
      </form>
    </section>
  );
};

export default Comments;
