import { useRef } from "react";
import { openBook, closeBook, flipRight, flipLeft } from "../util/bookAnimator";
import book_close from "../assets/image/book_close.png";
import "../style/style-book.css";

export const BookComponent = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div className="book">
      <img ref={imgRef} src={book_close} alt="book" />
      <div className="book-controller">
        <button onClick={() => openBook(imgRef.current!)}>Open</button>
        <button onClick={() => closeBook(imgRef.current!)}>Close</button>
        <button onClick={() => flipRight(imgRef.current!)}>Previous</button>
        <button onClick={() => flipLeft(imgRef.current!)}>Next</button>
      </div>
    </div>
  );
};
