import { DocumentType } from '@prisma/client';

export interface UpsertDocumentDto {
    id?: string;
    name?: string;
    documentType: DocumentType;
    value: Buffer;
}
