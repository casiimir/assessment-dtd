import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaImage, FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

import { randWordGen } from "@/utils";
import styles from "@/styles/components/navbar.module.scss";

enum Categories {
  Foto = "foto",
  Preferiti = "preferiti",
}

const Navbar = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string | string[]>(
    router.query.search || ""
  );
  const [activeCategory, setActiveCategory] = useState<Categories>(
    Categories.Foto
  );

  useEffect(() => {
    if (router.query.search) {
      setInputValue(router.query.search);
    }
  }, [router.query.search]);

  const onHandleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (!inputValue.length) {
      const randomWord = randWordGen();

      setInputValue(randomWord);
      router.push(`/photo/s/${randomWord}`);
    } else {
      router.push(`/photo/s/${inputValue}`);
    }
  };

  const onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const onHandleCategory = (e: React.MouseEvent) => {
    if (e.currentTarget.id === "foto") {
      router.push("/");
    } else {
      router.push("/favourite");
    }
    setInputValue("");
    setActiveCategory((e.currentTarget as HTMLLIElement).id as Categories);
  };

  const onHandleClearButton = () => setInputValue("");

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/images/logo.svg"
          width="120"
          height="120"
          priority={true}
          alt="Cerca Foto logo"
        />
      </Link>
      <form onSubmit={onHandleSubmit}>
        <button
          type="reset"
          className={styles.searchIcon}
          onClick={onHandleClearButton}
        >
          <IoSearch />
        </button>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={onHandleInputChange}
          placeholder="Cerca..."
        />
        {inputValue && (
          <button
            type="reset"
            className={styles.clearButton}
            onClick={onHandleClearButton}
          >
            x
          </button>
        )}
      </form>
      <ul className={styles.category}>
        <li
          className={`${styles.item} ${
            activeCategory === "foto" && styles.activeItem
          }`}
          onClick={onHandleCategory}
          id="foto"
        >
          <FaImage />
          <p>Foto</p>
        </li>
        <li
          className={`${styles.item} ${
            activeCategory === "preferiti" && styles.activeItem
          }`}
          onClick={onHandleCategory}
          id="preferiti"
        >
          <FaHeart />
          <p>Preferiti</p>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
