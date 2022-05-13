import './index.css'

// UI
import { MediaGallery, MediaGalleryProps } from './components/ui/MediaGallery';

export const UI: {
  MediaGallery: React.FC<MediaGalleryProps>
} = {
  MediaGallery,
}

export * from './components/MediaPicker';
