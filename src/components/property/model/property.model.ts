import { AddressModel, emptyAddress } from '../../../models/address.model';
import { emptyThumbnail, ThumbnailModel } from '../../../models/thumbnail.model';

export type PropertyModel = {
    id: string;
    name: string;
    egid: string;
    owner: string;
    yearOfConstruction?: number;
    janitor: string;
    address: AddressModel;
    thumbnail?: ThumbnailModel;
};

export const emptyProperty: PropertyModel = {
    id: '',
    name: '',
    egid: '',
    owner: '',
    janitor: '',
    address: emptyAddress,
    thumbnail: {
        ...emptyThumbnail,
        imageUrl: '/img/property-thumbnail-placeholder.jpg',
    },
};
