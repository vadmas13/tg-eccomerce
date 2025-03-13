"use client";

import { UpsertDocumentModel } from "@entities";
import { uploadImage } from "@shared/utils";
import {
  ActionSheet,
  ImageUploader,
  ImageUploadItem,
  Toast,
} from "antd-mobile";
import { MoreOutline } from "antd-mobile-icons";
import { FC, useState } from "react";

type ImageGroupUploaderProps = {
  onChange: ((items: ImageUploadItem[]) => void) | undefined;
  imageList: UpsertDocumentModel[];
  maxCount?: number;
  mainImageId?: string;
  setMainImage?: (uuid: string) => void;
  onDelete?: (id: string) => void;
};

const ImageGroupUploader: FC<ImageGroupUploaderProps> = ({
  imageList,
  onChange,
  maxCount = 5,
  setMainImage,
  mainImageId,
  onDelete,
}) => {
  const [visibleSettingActions, setVisibleSettingActions] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | undefined>(
    undefined,
  );

  const handleSetMain = (id: string) => {
    setVisibleSettingActions(false);
    setMainImage?.(id);
  };

  const showActionSheet = (id: string) => {
    setSelectedImageId(id);
    setVisibleSettingActions(true);
  };

  const handleUpload = async (file: File) => {
    const image = await uploadImage(file);
    if (!mainImageId && typeof image.key === "string") {
      setMainImage?.(image.key);
    }
    return image;
  };

  const handleDelete = (file: ImageUploadItem) => {
    const imageId = file.key as string;
    if (!imageList.map((x) => x.key).includes(imageId)) {
      return;
    }
    onDelete?.(imageId);
  };

  const settingActions = [
    {
      key: "main",
      text: "Сделать главным",
      onClick: () => selectedImageId && handleSetMain(selectedImageId),
    },
  ];

  const renderItem = (
    originNode: React.ReactElement,
    file: ImageUploadItem,
  ) => {
    return (
      <div className="relative mb-4" key={file.key}>
        {originNode}
        <div className="absolute bottom-0 left-0 p-0 rounded-r-md bg-black bg-opacity-70">
          <MoreOutline
            className="cursor-pointer text-white"
            onClick={() => showActionSheet(file.key as string)}
          />
        </div>
        {mainImageId === file.key && (
          <div className="absolute bottom-0 right-0 bg-white bg-opacity-80 pr-1 pl-1 rounded-l-md text-xs text-blue-500">
            Main
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <ImageUploader
        value={imageList}
        onChange={onChange}
        upload={handleUpload}
        multiple
        maxCount={maxCount}
        showUpload={(imageList?.length ?? 0) < maxCount}
        onCountExceed={(exceed) => {
          Toast.show(
            `Выберите не более ${maxCount} изображений. Вы выбрали: ${exceed}`,
          );
        }}
        renderItem={renderItem}
        onDelete={handleDelete}
      />
      <ActionSheet
        visible={visibleSettingActions}
        actions={settingActions}
        onClose={() => setVisibleSettingActions(false)}
      />
    </div>
  );
};

export default ImageGroupUploader;
