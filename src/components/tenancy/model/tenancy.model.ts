import * as constants from '../../../constants';
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
    cancellationMonths: typeof constants.months[number][];
    rentNet: number;
    utilities: number;
    rentDeposit: number;
    rentAccount: string;
};

export const emptyTenancy: TenancyModel = {
    id: '',
    propertyId: '',
    rentalUnitId: '',
    beginOfContract: format(new Date(), constants.dateFormatStoring),
    cancellationPeriod: 3,
    cancellationMonths: ['March', 'June', 'September'],
    rentNet: 0,
    utilities: 0,
    rentDeposit: 0,
    rentAccount: '',
};
