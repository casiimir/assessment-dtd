import { PhotoType } from "@/types/main";
import { MdLocationOn } from "react-icons/md";
import { FaCalendar, FaCamera } from "react-icons/fa";
import styles from "@/styles/components/photoDetailContent.module.scss";

interface PhotoDetailContentProps {
  photoData: PhotoType;
}

const PhotoDetailContent = ({ photoData }: PhotoDetailContentProps) => {
  const { location, exif } = photoData;

  return (
    <ul className={styles.photoDetailContent}>
      {location.name && (
        <li className={styles.photoDetailContent__location}>
          <MdLocationOn />
          <span>{location.name}</span>
        </li>
      )}
      {location.created_at && (
        <li className={styles.photoDetailContent__calendar}>
          <FaCalendar />
          <p>{location.created_at}</p>
        </li>
      )}
      {exif.name && (
        <li className={styles.photoDetailContent__camera}>
          <FaCamera />
          <p>{exif.name}</p>
        </li>
      )}
    </ul>
  );
};

export default PhotoDetailContent;
