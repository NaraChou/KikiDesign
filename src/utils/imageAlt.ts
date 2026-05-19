import type { ProjectImage } from '../data/projectData';

/**
 * 從 caption 取第一句作為 alt，避免「作品圖片 1」這類空泛描述。
 */
export function captionToAlt(caption: string | undefined, fallback: string): string {
  if (!caption?.trim()) return fallback;
  const firstSentence = caption.split(/[。．.!！?？]/)[0]?.trim();
  return firstSentence && firstSentence.length > 0 ? firstSentence : fallback;
}

export function projectImageAlt(image: ProjectImage, projectTitle: string): string {
  return captionToAlt(image.caption, projectTitle);
}
