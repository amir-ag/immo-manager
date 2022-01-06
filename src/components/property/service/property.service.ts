import { PropertyModel } from '../model/property.model';

export const getDisplayNameOfProperty = (p: PropertyModel) => {
    return `${p.name} (${p.egid})`;
};
