import { months } from '../../../constants';
import { PersonModel } from '../../persons/models/person.model';
import { format } from 'date-fns';

export type TenancyModel = {
    id: string;
    propertyId: string;
    rentalUnitId: string;
    tenant1Id?: string;
    tenant2Id?: string;
    isVacancy?: boolean;
    isFamilyApartment?: boolean;
    beginOfContract: string;
    endOfContract?: string;
    cancellationPeriod: number;
    cancellationMonths: typeof months[number][];
    rentNet: number;
    utilities: number;
    rentDeposit: number;
    rentAccount: string;
};

export const emptyTenancy: TenancyModel = {
    id: '',
    propertyId: '',
    rentalUnitId: '',
    beginOfContract: format(new Date(), 'yyyy.MM.dd'),
    cancellationPeriod: 3,
    cancellationMonths: ['March', 'June', 'September'],
    rentNet: 0,
    utilities: 0,
    rentDeposit: 0,
    rentAccount: '',
};

// Helper functions
export const getTenantsOfTenancy = (tenancy: TenancyModel, allTenants: PersonModel[]) => {
    return allTenants.filter((t) => t.id === tenancy.tenant1Id || t.id === tenancy.tenant2Id);
};

export const getDisplayNameOfTenancy = (tenancy: TenancyModel, allTenants: PersonModel[]) => {
    const tenants = getTenantsOfTenancy(tenancy, allTenants);
    const desc = 'Tenancy';

    if (tenants?.length) {
        return desc;
    }

    return `${desc} (${tenants.map((t) => t.firstName + ' ' + t.lastName).join(' & ')})`;
};
