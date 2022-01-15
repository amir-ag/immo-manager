import { PropertyModel } from '../model/property.model';

export const getDisplayNameOfProperty = (p: PropertyModel) => {
    return `${p.name} (${p.egid})`;
};

export const sortPropertiesByNameAsc = (properties: PropertyModel[]) => {
    properties.sort((propA: PropertyModel, propB: PropertyModel) => propA.name.localeCompare(propB.name));
};
