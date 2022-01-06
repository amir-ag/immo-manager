import { PersonModel } from '../../person/model/person.model';
import { TenancyModel } from '../model/tenancy.model';

export const getTenantsOfTenancy = (tenancy: TenancyModel | undefined, allTenants: PersonModel[]) => {
    if (!tenancy) {
        return [];
    }

    return allTenants.filter((t) => t.id === tenancy.tenant1Id || t.id === tenancy.tenant2Id);
};

export const getDisplayNameOfTenants = (tenancy: TenancyModel, allTenants: PersonModel[]) => {
    if (tenancy === undefined) return '-';
    return getTenantsOfTenancy(tenancy, allTenants)
        .map((t) => t.firstName + ' ' + t.lastName)
        .join(', ');
};

export const getDisplayNameOfTenancy = (tenancy: TenancyModel, allTenants: PersonModel[]) => {
    const tenants = getTenantsOfTenancy(tenancy, allTenants);
    const desc = 'Tenancy';

    if (!tenants?.length) {
        return desc + ' (Vacancy)';
    }

    return `${desc} (${tenants.map((t) => t.firstName + ' ' + t.lastName).join(' & ')})`;
};
