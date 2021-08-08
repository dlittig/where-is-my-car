export type ImageGalleryComponentType = {
  photos: string[];
  enableDelete?: boolean;
  onDelete?: (newPhotos: string[]) => void;
};

export type MemoizedImageType = {
  photo: string;
  onLongPress: () => void;
  onPress: () => void;
};
