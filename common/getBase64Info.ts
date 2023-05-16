export const getBase64Type = (image: string) =>
  image?.split(':')[1]?.split(';')[0];

export const getBase64Content = (image: string) =>
  image?.split(':')[1]?.split(';')[1]?.split(',')[1];
