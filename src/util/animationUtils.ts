export function animateFrameByFrame(
  imgElement: HTMLImageElement,
  folderPath: string,
  finalImagePath: string,
  interval: number
) {
  const basePath = "src/assets/animation/";
  const fullPath = `${basePath}${folderPath}`;
  let frameIndex = 0;

  const frames: string[] = [];
  const maxFrames = 35;

  let i = 1;
  while (i <= maxFrames) {
    const framePath = `${fullPath}/${i}.png`;
    const img = new Image();
    img.src = framePath;

    img.onload = () => {
      frames.push(framePath);
    };

    img.onerror = () => {
      if (i === 1) {
        console.error(`No frames found in folder: ${fullPath}`);
      }
    };

    i++;
  }

  const animationInterval = setInterval(() => {
    if (frameIndex < frames.length) {
      imgElement.src = frames[frameIndex];
      frameIndex++;
    } else {
      clearInterval(animationInterval);
      imgElement.src = finalImagePath;
    }
  }, interval);
}
