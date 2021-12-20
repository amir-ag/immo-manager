import { months } from '../../../constants';

export type TenancyModel = {
    id: string;
    propertyId: string;
    rentalUnitId: string;
    tenant1Id?: string;
    tenant2Id?: string;
    isVacancy?: boolean;
    isFamilyApartment?: boolean;
    beginOfContract: Date;
    endOfContract?: Date;
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
    beginOfContract: new Date(),
    cancellationPeriod: 3,
    cancellationMonths: ['March', 'June', 'September'],
    rentNet: 0,
    utilities: 0,
    rentDeposit: 0,
    rentAccount: '',
};

// Helper functions
export const getDisplayNameOfTenancy = (t: TenancyModel) => {
    return `Tenancy (${t.id})`;
};
