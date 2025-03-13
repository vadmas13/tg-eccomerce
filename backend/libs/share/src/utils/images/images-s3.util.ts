export const getImageNameFromLocation = (imageLocation: string) => {
    const splitLocation = imageLocation.split('/');
    return splitLocation[splitLocation.length - 1];
};
