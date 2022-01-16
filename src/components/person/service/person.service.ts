import { PersonModel } from '../model/person.model';

export const getPersonDisplayNameForFormSelectFields = (person: PersonModel) => {
    if (!person || person.id === '') {
        return '';
    }

    return `${person.firstName} ${person.lastName} (${person.address.city})`;
};

export const sortPersonsByLastAndFirstNameAsc = (persons: PersonModel[]) => {
    persons.sort((persA: PersonModel, persB: PersonModel) =>
        (persA.lastName + persA.firstName).localeCompare(persB.lastName + persB.firstName)
    );
};
