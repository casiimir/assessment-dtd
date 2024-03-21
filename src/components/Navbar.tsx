import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaImage, FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

import { randWordGen } from "@/utils";
import styles from "@/styles/components/navbar.module.scss";

enum Categories {
  Foto = "foto",
  Preferiti = "preferiti",
}

const Navbar = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<Categories>(
    Categories.Foto
  );

  const onHandleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (!inputValue.length) {
      setInputValue(randWordGen());
    } else {
    }
    // TODO: do something
  };

  const onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const onHandleCategory = (e: React.MouseEvent) =>
    setActiveCategory((e.currentTarget as HTMLLIElement).id as Categories);

  const onHandleClearButton = () => setInputValue("");

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/images/logo.svg"
          width="120"
          height="100"
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
