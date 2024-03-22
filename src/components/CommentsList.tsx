import { useState, useEffect, memo } from "react";
import axios from "axios";
import { CommentType } from "@/types/main";
import styles from "@/styles/components/commentsList.module.scss";

interface CommentsListProps {
  photoId: string;
  commentsList: CommentType[];
}

const CommentsList = ({ photoId, commentsList }: CommentsListProps) => {
  const [comments, setComments] = useState<CommentType[]>(commentsList);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`/api/comments?imageId=${photoId}`);

        setComments(response.data);
        setError("");
      } catch (err) {
        const error = axios.isAxiosError(err)
          ? err.message
          : "An unexpected error occurred";

        setError("Failed to fetch comments.");
        console.error("Failed to fetch comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [commentsList, photoId]);

  return (
    <>
      <h3>Commenti</h3>
      {comments.length ? (
        comments.map((comment: CommentType) => {
          const date = `${comment.createdAt.split("-")[1]}/${
            comment.createdAt.split("-")[0]
          }`;

          return (
            <div className={styles.comments__item} key={comment._id}>
              <h4>{comment.username}</h4>
              <p>{comment.text}</p>
              <p className={styles.comments__item_date}>Inviato il {date}</p>
            </div>
          );
        })
      ) : (
        <h4>Nessun commento presente</h4>
      )}
    </>
  );
};

export default memo(CommentsList);
