export type ThumbnailModel = {
    imageUrl?: string;
    image?: File | null;
};

export const emptyThumbnail: ThumbnailModel = {
    imageUrl: undefined,
    image: null,
};
