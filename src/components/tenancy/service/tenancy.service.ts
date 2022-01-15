import { PersonModel } from '../../person/model/person.model';
import { TenancyModel } from '../model/tenancy.model';
import { parseISO } from 'date-fns';

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

export const tenanciesDescComparer = (tenA: TenancyModel, tenB: TenancyModel) => {
    const dateA = parseISO(tenA.beginOfContract);
    const dateB = parseISO(tenB.beginOfContract);
    return dateB.getTime() - dateA.getTime();
};

export const sortTenanciesByBeginDateDesc = (tenancies: TenancyModel[]) => {
    tenancies.sort(tenanciesDescComparer);
};

export const getTenanciesByRentalUnitId = (rentalUnitId: string, tenancies: TenancyModel[]) =>
    tenancies.filter((ten) => ten.rentalUnitId === rentalUnitId);

export const getTenanciesByPropertyId = (propertyId: string, tenancies: TenancyModel[]) =>
    tenancies.filter((ten) => ten.propertyId === propertyId);

export const getRunningTenancyByRentalUnitId = (rentalUnitId: string, tenancies: TenancyModel[]) =>
    getTenanciesByRentalUnitId(rentalUnitId, tenancies).sort(tenanciesDescComparer)[0];

export const getRunningTenancies = (tenancies: TenancyModel[]) =>
    tenancies?.filter((t) => !t.endOfContract || parseISO(t.endOfContract) > new Date());
