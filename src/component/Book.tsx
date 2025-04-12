import { useRef, useState } from "react";
import {
  openBook,
  closeBook,
  flipRight,
  flipLeft,
  appearContent,
} from "../util/bookAnimator";
import { Page } from "./Page";
import { DevilFruit } from "../types/DevilFruit";
import { DevilFruitType } from "../types/DevilFruitType";
import book_close from "../assets/image/book_close.png";
import gumGum from "../assets/image/gumGum.png";
import "../style/style-book.css";
import gsap from "gsap";

export const BookComponent = () => {
  const bookRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLImageElement>(null);
  const bookContent = useRef<HTMLDivElement>(null);

  const debounceTimeout = 1800;
  const [isOpen, setIsOpen] = useState(false);
  const [isDebounce, setIsDebounce] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const maxPageIndex = 84

  const [currentDevilFruit] = useState<DevilFruit>({
    id: 0,
    originalName: "ゴムゴムの実",
    romanizedName: "Gomu Gomu no Mi",
    englishName: "Gum-Gum Fruit",
    meaning: "Rubber Rubber Fruit",
    type: DevilFruitType.PARAMECIA,
    debutChapter: "Chapter 1",
    debutEpisode: "Episode 1",
    debutArc: "East blue",
    currentHolder: "Monkey D. Luffy",
    pastHolders: ["Monkey D. Luffy","Joy Boy"],
    description: "The Gomu Gomu no Mi is a Paramecia-type Devil Fruit that grants the user a body made of rubber, allowing them to stretch and bounce.",
    awakeningStatus: true,
    awakeningDescription: "Upon awakening, the user gains the ability to fight with cartoonish freedom, bending the laws of physics and reality to their will.",
    isCanon: true,
    imageUrl: gumGum,
  });

  function checkPageIndex() {
    return pageIndex;
  }

  function nextPage() {
    setPageIndex((prevIndex) => prevIndex + 1);
  }

  function previousPage() {
    setPageIndex((prevIndex) => prevIndex - 1);
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
    gsap.to(contentRef.current, {
      duration: 0.5,
      opacity: 1,
      ease: "power2.out",
      delay: 0.8,
    });
    appearBookContent();
  };

  const handleClose = () => {
    if (checkDebounce() || !checkOpen()) return;
    setDebounce(true);
    setOpen(false);
    closeBookContent();
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
        <Page side="left" pageIndex={pageIndex} devilFruit={currentDevilFruit} />
        <Page side="right" pageIndex={pageIndex} devilFruit={currentDevilFruit} />
      </div>

      <img className="content-ref" ref={contentRef} src="" alt="content" />

      <div className="book-controller">
        <button onClick={handleOpen}>Open</button>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleFlipRight}>Previous</button>
        <button onClick={handleFlipLeft}>Next</button>
      </div>
    </div>
  );
};
