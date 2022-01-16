export const getItemFromCollectionById = <T extends { id: string }>(id: string, collection: T[]) =>
    collection.find((item) => item.id === id);
