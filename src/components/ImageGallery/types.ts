export type ImageGalleryComponentType = {
  photos: string[];
  enableDelete?: boolean;
  onDelete?: (newPhotos: string[]) => void;
};
