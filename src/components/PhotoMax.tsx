import { useState } from "react";
import Image from "next/image";
import { FaCompressAlt } from "react-icons/fa";
import styles from "@/styles/components/photoMax.module.scss";

interface PhotoMaxProps {
  photoImage: string;
  photoAlt: string;
  closePhotoMax: () => void;
}

const PhotoMax = ({ photoImage, photoAlt, closePhotoMax }: PhotoMaxProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className={styles.photoMax} onClick={closePhotoMax}>
      {!imageLoaded && <div className={styles.skeleton} />}
      <FaCompressAlt className={styles.compressIcon} />
      <Image
        className={`${styles.image}  ${
          imageLoaded ? styles.show : styles.hide
        }`}
        onClick={closePhotoMax}
        src={photoImage}
        width={2000}
        height={1000}
        priority={true}
        alt={photoAlt}
        onLoad={() => setImageLoaded(true)}
      />
    </section>
  );
};

export default PhotoMax;
