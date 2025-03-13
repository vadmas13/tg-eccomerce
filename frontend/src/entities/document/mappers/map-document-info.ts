import { bufferToURL } from "@shared/utils";
import { Document, UpsertDocumentModel } from "../models";

export const mapDocumentInfo = ({
  value,
  ...dto
}: Document): UpsertDocumentModel => {
  return {
    ...dto,
    key: dto.customId,
    url: bufferToURL(value, "image/jpeg"),
  };
};
