import { Modal } from "@ui-kitten/components";
import React, { FC, useState, useCallback } from "react";
import { useEffect } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { deleteImageAlert } from "../../alerts/DeleteImageAlert";
import { ImageGalleryComponentType } from "./types";

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

  useEffect(() => {
    console.log("image gallery updated", photos);
  }, [photos]);

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
        <TouchableOpacity
          key={`image-gallery-photo-preview-${index}`}
          onPress={() => {
            setCurrentPhoto(photo);
            setPreviewVisible(true);
          }}
          onLongPress={() => {
            if (enableDelete) {
              deletePhoto(photo);
            }
          }}
          style={{
            width: "47%",
            height: 200,
            marginBottom: 20,
          }}
        >
          <Image
            source={{ uri: photo }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              borderRadius: 5,
            }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ImageGallery;
