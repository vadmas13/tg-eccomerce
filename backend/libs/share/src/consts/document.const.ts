// в байтах
export const MAX_PICTIRE_SIZE = 20971520;

export enum ImageMimeType {
    Gif = 'image/gif',
    Jpeg = 'image/jpeg',
    Jpg = 'image/jpg',
    Pjpeg = 'image/pjpeg',
    Png = 'image/png',
}

export const imagesFileTypeRegex = /(jpg|jpeg|png|pjpeg|gif)$/;
