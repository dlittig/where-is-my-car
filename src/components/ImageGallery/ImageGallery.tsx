import React, { FC, useState, useCallback } from "react";

import { Modal } from "@ui-kitten/components";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";

import { ImageGalleryComponentType } from "./types";
import MemoizedImage from "./MemoizedImage/MemoizedImage";
import { deleteImageAlert } from "../../alerts/DeleteImageAlert";

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
    <View
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Modal
        visible={previewVisible}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onBackdropPress={closePreview}
      >
        <TouchableOpacity
          onPress={closePreview}
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
            marginBottom: 20,
          }}
        >
          <Image
            source={{ uri: currentPhoto }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              borderRadius: 5,
            }}
          />
        </TouchableOpacity>
      </Modal>

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
