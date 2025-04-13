import { useRef, useState } from "react";
import {
  openBook,
  closeBook,
  flipRight,
  flipLeft,
  appearContent,
} from "../util/bookAnimator";
import { Page } from "./Page";
import { useDevilFruits } from "../hook/useDevilFruits";
import book_close from "../assets/image/book_close.png";
import button from "../assets/image/button.png";
import "../style/style-book.css";
import gsap from "gsap";

export const BookComponent = () => {
  const bookRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLImageElement>(null);
  const bookContent = useRef<HTMLDivElement>(null);

  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const previousBtnRef = useRef<HTMLButtonElement>(null);
  const openBtnRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLDivElement>(null);

  const debounceTimeout = 1800;
  const [isOpen, setIsOpen] = useState(false);
  const [isDebounce, setIsDebounce] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const maxPageIndex = 40

  const { data: devilFruits } = useDevilFruits(pageIndex);


  function checkPageIndex() {
    return pageIndex;
  }

  function nextPage() {
    setTimeout(() => {
      setPageIndex((prevIndex) => Math.min(prevIndex + 1, maxPageIndex));
    }, 400);
  }

  function previousPage() {
    setTimeout(() => {
      setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }, 400);
  }

  function checkDebounce() {
    return isDebounce;
  }

  function setDebounce(flag: boolean) {
    setIsDebounce(flag);
    setTimeout(() => {
      setIsDebounce(false);
    }, debounceTimeout);
  }

  function checkOpen() {
    return isOpen;
  }

  function setOpen(flag: boolean) {
    setIsOpen(flag);
  }

  function appearBookContent() {
    if (bookContent.current && contentRef.current) {
      gsap.to(bookContent.current, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          gsap.set(bookContent.current, {
            display: "none",
          });
        },
      });
      gsap.set(contentRef.current, {
        display: "flex",
      });
      gsap.to(bookContent.current, {
        duration: 1,
        opacity: 1,
        display: "flex",
        ease: "power2.out",
        delay: 1,
      });
      setTimeout(() => {
        appearContent(contentRef.current!);
      }, 600);
    }
  }

  function closeBookContent() {
    if (bookContent.current && contentRef.current) {
      gsap.to(bookContent.current, {
        duration: 0.5,
        opacity: 0,
        display: "none",
        ease: "power2.out",
        onComplete: () => {
          if (bookContent.current && contentRef.current) {
            bookContent.current.style.display = "none";
            contentRef.current.style.display = "none";
            contentRef.current.style.opacity = "0";
            closeBook(bookRef.current!);
          }
        },
      });
    }
  }

  const handleOpen = () => {
    if (checkDebounce() || checkOpen()) return;
    setOpen(true);
    setDebounce(true);
    openBook(bookRef.current!);

    openBtnRef.current?.classList.add("disabled");
    closeBtnRef.current?.classList.remove("disabled");
    gsap.to(contentRef.current, {
      duration: 0.5,
      opacity: 1,
      ease: "power2.out",
      delay: 0.8,
      onComplete: () => {

        nextBtnRef.current?.classList.remove("disabled");
        previousBtnRef.current?.classList.remove("disabled");
      }
    });
    appearBookContent();
  };

  const handleClose = () => {
    if (checkDebounce() || !checkOpen()) return;
    setDebounce(true);
    setOpen(false);
    closeBookContent();
    openBtnRef.current?.classList.remove("disabled");

    closeBtnRef.current?.classList.add("disabled");
    nextBtnRef.current?.classList.add("disabled");
    previousBtnRef.current?.classList.add("disabled");
  };

  const handleFlipRight = () => {
    if (checkDebounce() || !checkOpen() || checkPageIndex() == 0) return;
    setDebounce(true);
    previousPage();
    flipRight(bookRef.current!);
    appearBookContent();
  };

  const handleFlipLeft = () => {
    if (checkDebounce() || !checkOpen() || checkPageIndex() == maxPageIndex) return;
    setDebounce(true);
    nextPage();
    flipLeft(bookRef.current!);
    appearBookContent();
  };

  return (
    <div className="book">
      <img className="book-ref" ref={bookRef} src={book_close} alt="book" />

      <div ref={bookContent} className="book-content-holder">
      <Page side="left" devilFruit={devilFruits?.[0]} />
      <Page side="right" devilFruit={devilFruits?.[1]} />
      </div>

      <img className="content-ref" ref={contentRef} src="" alt="content" />

      <div className="book-controller">
        <div ref={openBtnRef} className="btn-frame">
            <button className="open-btn" onClick={handleOpen}>OPEN</button>
            <img src={button} alt="button" className="btn-frame-image" />
        </div>

        <div ref={closeBtnRef} className="btn-frame disabled">
          <button className="close-btn " onClick={handleClose}>CLOSE</button>
            <img src={button} alt="button" className="btn-frame-image" />
        </div>
        
        
        <button ref={previousBtnRef} className="previous-btn disabled" onClick={handleFlipRight}></button>
        <button ref={nextBtnRef} className="next-btn disabled" onClick={handleFlipLeft}></button>
      </div>
    </div>
  );
};
