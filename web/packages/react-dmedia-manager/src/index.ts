import './index.css'

// UI
import { MediaGallery, MediaGalleryProps } from './components/ui/MediaGallery';

export const UI: {
  MediaGallery: React.FC<MediaGalleryProps>
} = {
  MediaGallery,
}

export * from './hooks/mediaPicker';
export * from './components/MediaPicker';
