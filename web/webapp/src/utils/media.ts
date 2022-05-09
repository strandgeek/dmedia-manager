import { Media } from "../types/media"

type MediaType = 'IMAGE' | 'VIDEO' | 'OTHER'

export const getMediaType = (media: Media): MediaType => {
  const { mimetype } = media
  if (mimetype.startsWith('image/')) {
    return 'IMAGE'
  }
  if (mimetype.startsWith('video/')) {
    return 'VIDEO'
  }
  return 'OTHER';
}
