import { animateFrameByFrame } from "./animationUtils";

const interval = 100;
const debounce = 500;
let isDebounce = false;
let isOpen = false;

function checkDebounce() {
  return isDebounce;
}

function checkOpen() {
  return isOpen;
}

function setDebounce() {
  isDebounce = true;
  setTimeout(() => {
    isDebounce = false;
  }, debounce);
}

function setOpen(open: boolean = true) {
  isOpen = open;
}

export function openBook(imgElement: HTMLImageElement) {
  if (checkDebounce() || checkOpen()) return;
  setDebounce();
  setOpen();
  const fullPath = `book_open_close/open`;
  const finalImagePath = "src/assets/image/book_open.png";
  animateFrameByFrame(imgElement, fullPath, finalImagePath, interval);
}

export function closeBook(imgElement: HTMLImageElement) {
  if (checkDebounce() || !checkOpen()) return;
  setDebounce();
  setOpen(false);
  const fullPath = `book_open_close/close`;
  const finalImagePath = "src/assets/image/book_close.png";
  animateFrameByFrame(imgElement, fullPath, finalImagePath, interval);
}

export function flipRight(imgElement: HTMLImageElement) {
  if (checkDebounce() || !checkOpen()) return;
  setDebounce();
  const fullPath = `page_flip/right`;
  const finalImagePath = "src/assets/image/book_open.png";
  animateFrameByFrame(imgElement, fullPath, finalImagePath, interval);
}

export function flipLeft(imgElement: HTMLImageElement) {
  if (checkDebounce() || !checkOpen()) return;
  setDebounce();
  const fullPath = `page_flip/left`;
  const finalImagePath = "src/assets/image/book_open.png";
  animateFrameByFrame(imgElement, fullPath, finalImagePath, interval);
}
