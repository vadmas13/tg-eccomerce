export const getBase64ImageSource = (img: Buffer) =>
  `data:image/jpeg;base64,${Buffer.from(img).toString("base64")}`;
