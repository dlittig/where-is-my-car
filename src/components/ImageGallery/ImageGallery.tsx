import React, { FC, useState, useCallback } from "react";
import { Modal, Portal } from "react-native-paper";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";

import { ImageGalleryComponentType } from "./types";
import MemoizedImage from "./MemoizedImage/MemoizedImage";
import { deleteImageAlert } from "../../alerts/DeleteImageAlert";

import style from "./ImageGallery.style";

const ImageGallery: FC<ImageGalleryComponentType> = ({
  photos,
  enableDelete,
  onDelete,
}) => {
  const deletePhoto = useCallback(
    (photo: string) =>
      deleteImageAlert(
        () => onDelete && onDelete(photos.filter((item) => item !== photo))
      ),
    [photos]
  );

  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState("");

  const closePreview = () => {
    setPreviewVisible(false);
    setCurrentPhoto("");
  };

  return (
    <View style={style.container}>
      <Portal>
        <Modal
          onDismiss={closePreview}
          visible={previewVisible}
          style={style.modalBackground}
        >
          <TouchableOpacity
            onPress={closePreview}
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height,
              marginBottom: 20,
            }}
          >
            <Image source={{ uri: currentPhoto }} style={style.image} />
          </TouchableOpacity>
        </Modal>
      </Portal>

      {photos.map((photo, index) => (
        <MemoizedImage
          key={`image-gallery-photo-preview-${index}`}
          photo={photo}
          onPress={() => {
            setCurrentPhoto(photo);
            setPreviewVisible(true);
          }}
          onLongPress={() => {
            if (enableDelete) {
              deletePhoto(photo);
            }
          }}
        />
      ))}
    </View>
  );
};

export default ImageGallery;
