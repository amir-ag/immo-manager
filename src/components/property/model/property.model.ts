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
        imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/immo-manager.appspot.com/o/images%2Fproperties%2Fproperty-thumbnail-placeholder.jpg?alt=media&token=ccb13819-d815-4814-9e36-017c33838d10',
    },
};
