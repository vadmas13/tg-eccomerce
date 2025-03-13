export const mapFilesToBufferArray = (files: Array<Express.Multer.File>) => {
    const imageData = files.map((file) => file.buffer);
    return imageData;
};
