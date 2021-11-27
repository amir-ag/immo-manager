import { TenancyModel } from './model/tenancy.model';

export const dummyTenancies: TenancyModel[] = [
    {
        tenant: 'Max Mustermann',
        beginOfContract: new Date(2011, 2, 16),
        endOfContract: new Date(2017, 7, 30),
    },
    { tenant: 'Hans Meier', beginOfContract: new Date(2020, 9, 15) },
    { tenant: 'Viola Hunziker', beginOfContract: new Date(2017, 8, 1), endOfContract: new Date(2020, 9, 14) },
];
