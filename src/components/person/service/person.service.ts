import { PersonModel } from '../model/person.model';

export const getPersonDisplayNameForFormSelectFields = (person: PersonModel) => {
    if (person.id === '') {
        return '';
    }
    return `${person.firstName} ${person.lastName} (${person.address.city})`;
};
