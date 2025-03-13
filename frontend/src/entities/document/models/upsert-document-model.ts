export interface UpsertDocumentDto {
  id?: string;
  name?: string;
  value: Buffer;
}

export interface UpsertDocumentModel {
  key?: string;
  name?: string;
  url: string;
  extra?: File;
}
