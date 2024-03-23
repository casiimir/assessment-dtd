import { useState, memo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PhotoType } from "@/types/main";
import styles from "@/styles/components/photo.module.scss";

const Photo = ({ photoData }: { photoData: PhotoType }) => {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const onHandleZoom = () => router.push(`/photo/${photoData.id}`);

  return (
    <div className={styles.photo}>
      {!imageLoaded && <div className={styles.skeleton} />}
      <Image
        className={`${styles.image} ${imageLoaded ? styles.show : styles.hide}`}
        onClick={onHandleZoom}
        src={photoData.urls.small}
        width={600}
        height={400}
        role="button"
        alt={photoData.alt_description}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default memo(Photo);
