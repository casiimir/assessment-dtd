import { PhotoType } from "@/types/main";
import styles from "@/styles/components/photoDetailInfo.module.scss";

interface PhotoDetailInfoProps {
  photoData: PhotoType;
}

const PhotoDetailInfo = ({ photoData }: PhotoDetailInfoProps) => {
  const { views, downloads } = photoData;

  return (
    <ul className={styles.photoDetailInfo}>
      <li className={styles.photoDetailInfo__views}>
        <p className={styles.photoDetailInfo__views_text}>Visualizzazioni</p>
        <p className={styles.photoDetailInfo__views_value}>{views}</p>
      </li>
      <li className={styles.photoDetailInfo__downloads}>
        <p className={styles.photoDetailInfo__downloads_text}>Downloads</p>
        <p className={styles.photoDetailInfo__downloads_value}>{downloads}</p>
      </li>
    </ul>
  );
};

export default PhotoDetailInfo;
