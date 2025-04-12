import { animateFrameByFrame } from "./animationUtils";

const interval = 100;

export function openBook(imgElement: HTMLImageElement) {
  const fullPath = `book_open_close/open`;
  const finalImagePath = "src/assets/image/book_open.png";
  animateFrameByFrame(imgElement, fullPath, finalImagePath, interval);
}

export function closeBook(imgElement: HTMLImageElement) {
  const fullPath = `book_open_close/close`;
  const finalImagePath = "src/assets/image/book_close.png";
  animateFrameByFrame(imgElement, fullPath, finalImagePath, interval);
}

export function flipRight(imgElement: HTMLImageElement) {
  const fullPath = `page_flip/right`;
  const finalImagePath = "src/assets/image/book_open.png";
  animateFrameByFrame(imgElement, fullPath, finalImagePath, interval);
}

export function flipLeft(imgElement: HTMLImageElement) {
  const fullPath = `page_flip/left`;
  const finalImagePath = "src/assets/image/book_open.png";
  animateFrameByFrame(imgElement, fullPath, finalImagePath, interval);
}

export function appearContent(imgElement: HTMLImageElement) {
  const fullPath = `content_appear`;
  const finalImagePath = "src/assets/image/appear.png";
  animateFrameByFrame(imgElement, fullPath, finalImagePath, interval / 2);
}
