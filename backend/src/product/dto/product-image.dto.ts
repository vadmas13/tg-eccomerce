import { UpsertDocumentDto } from '@share';

export interface ProductImageDto {
    deleteImageIds: string[];
    upsertImages: UpsertDocumentDto[];
}
