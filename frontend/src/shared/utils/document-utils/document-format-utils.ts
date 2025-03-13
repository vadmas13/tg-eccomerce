import { ImageUploadItem } from "antd-mobile";
import { v4 as uuidv4 } from "uuid";

export const bufferToURL = (buffer: Buffer, format: string): string => {
  const base64String = Buffer.from(buffer).toString("base64");
  return `data:${format};base64,${base64String}`;
};

export const fileToBuffer = async (file: File): Promise<Buffer> => {
  return Buffer.from(await file.arrayBuffer());
};

export const uploadImage = async (file: File): Promise<ImageUploadItem> => {
  return {
    key: uuidv4(),
    url: URL.createObjectURL(file),
    extra: file,
  };
};
