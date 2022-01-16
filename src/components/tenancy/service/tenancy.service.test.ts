import { emptyPerson, PersonModel } from '../../person/model/person.model';
import { emptyTenancy, TenancyModel } from '../model/tenancy.model';
import * as tenancyService from './tenancy.service';

test('Get tenants of tenants correctly', () => {
    // Arrange
    const tenancy: TenancyModel = {
        ...emptyTenancy,
        tenant1Id: '1',
        tenant2Id: '2',
    };
    const tenants: PersonModel[] = [
        {
            ...emptyPerson,
            firstName: 'Hans',
            lastName: 'Müller',
            id: '1',
        },
        { ...emptyPerson, firstName: 'Sabrina', lastName: 'Meier', id: '2' },
        { ...emptyPerson, firstName: 'Jürg', lastName: 'Stucker', id: '3' },
    ];

    const expectedTenants: PersonModel[] = [
        {
            ...emptyPerson,
            firstName: 'Hans',
            lastName: 'Müller',
            id: '1',
        },
        { ...emptyPerson, firstName: 'Sabrina', lastName: 'Meier', id: '2' },
    ];

    // Act
    const actualTenants = tenancyService.getTenantsOfTenancy(tenancy, tenants);

    // Assert
    expect(actualTenants).toEqual(expectedTenants);
});

test('Get display name of tenants correctly', () => {
    // Arrange
    const tenancy: TenancyModel = {
        ...emptyTenancy,
        tenant1Id: '1',
        tenant2Id: '2',
    };
    const tenants: PersonModel[] = [
        {
            ...emptyPerson,
            firstName: 'Hans',
            lastName: 'Müller',
            id: '1',
        },
        { ...emptyPerson, firstName: 'Sabrina', lastName: 'Meier', id: '2' },
    ];

    const expectedDisplayName = 'Hans Müller, Sabrina Meier';

    // Act
    const displayName = tenancyService.getDisplayNameOfTenants(tenancy, tenants);

    // Assert
    expect(displayName).toEqual(expectedDisplayName);
});

test('Get display name of tenancy (with vacancy) correctly', () => {
    // Arrange
    const tenancy: TenancyModel = {
        ...emptyTenancy,
    };
    const tenants: PersonModel[] = [
        {
            ...emptyPerson,
            firstName: 'Hans',
            lastName: 'Müller',
            id: '1',
        },
        { ...emptyPerson, firstName: 'Sabrina', lastName: 'Meier', id: '2' },
    ];

    const expectedDisplayName = 'Tenancy (Vacancy)';

    // Act
    const displayName = tenancyService.getDisplayNameOfTenancy(tenancy, tenants);

    // Assert
    expect(displayName).toEqual(expectedDisplayName);
});

test('Get display name of tenancy correctly', () => {
    // Arrange
    const tenancy: TenancyModel = {
        ...emptyTenancy,
        tenant1Id: '1',
        tenant2Id: '2',
    };
    const tenants: PersonModel[] = [
        {
            ...emptyPerson,
            firstName: 'Hans',
            lastName: 'Müller',
            id: '1',
        },
        { ...emptyPerson, firstName: 'Sabrina', lastName: 'Meier', id: '2' },
    ];

    const expectedDisplayName = 'Tenancy (Hans Müller & Sabrina Meier)';

    // Act
    const displayName = tenancyService.getDisplayNameOfTenancy(tenancy, tenants);

    // Assert
    expect(displayName).toEqual(expectedDisplayName);
});

test('Verify the tenancy sorting order', () => {
    // Arrange
    const tenancy1: TenancyModel = {
        ...emptyTenancy,
        beginOfContract: '2018-06-05',
    };
    const tenancy2: TenancyModel = {
        ...emptyTenancy,
        beginOfContract: '2017-06-05',
    };

    const expectedDiff = -31536000000;

    // Act
    const diff = tenancyService.tenanciesDescComparer(tenancy1, tenancy2);

    // Assert
    expect(diff).toEqual(expectedDiff);
});

test('Sort tenancies by contract begin correctly', () => {
    // Arrange
    const tenancies: TenancyModel[] = [
        {
            ...emptyTenancy,
            beginOfContract: '2018-06-05',
        },
        {
            ...emptyTenancy,
            beginOfContract: '2017-06-05',
        },
        {
            ...emptyTenancy,
            beginOfContract: '2019-06-05',
        },
    ];

    const expectedTenancies: TenancyModel[] = [
        {
            ...emptyTenancy,
            beginOfContract: '2019-06-05',
        },
        {
            ...emptyTenancy,
            beginOfContract: '2018-06-05',
        },
        {
            ...emptyTenancy,
            beginOfContract: '2017-06-05',
        },
    ];

    // Act
    tenancyService.sortTenanciesByBeginDateDesc(tenancies);

    // Assert
    expect(tenancies).toEqual(expectedTenancies);
});

test('Get the correct running tenancy by rental unit id', () => {
    // Arrange
    const tenancies: TenancyModel[] = [
        {
            ...emptyTenancy,
            rentalUnitId: '1',
            beginOfContract: '2018-06-05',
        },
        {
            ...emptyTenancy,
            rentalUnitId: '2',
            beginOfContract: '2017-06-05',
        },
        {
            ...emptyTenancy,
            rentalUnitId: '1',
            beginOfContract: '2019-06-05',
        },
    ];

    const expectedRunningTenancy: TenancyModel = {
        ...emptyTenancy,
        rentalUnitId: '1',
        beginOfContract: '2019-06-05',
    };

    // Act
    const runningTenancy = tenancyService.getRunningTenancyByRentalUnitId('1', tenancies);

    // Assert
    expect(runningTenancy).toEqual(expectedRunningTenancy);
});

test('Get all running tenancies', () => {
    // Arrange
    const tenancies: TenancyModel[] = [
        {
            ...emptyTenancy,
            id: '1',
            beginOfContract: '2018-06-05',
            endOfContract: '2025-06-05',
        },
        {
            ...emptyTenancy,
            id: '2',
            beginOfContract: '2017-06-05',
            endOfContract: '2020-06-05',
        },
        {
            ...emptyTenancy,
            id: '3',
            beginOfContract: '2019-06-05',
            endOfContract: '2021-06-05',
        },
        {
            ...emptyTenancy,
            id: '4',
            beginOfContract: '2017-06-05',
        },
    ];

    const expectedRunningTenancies: TenancyModel[] = [
        {
            ...emptyTenancy,
            id: '1',
            beginOfContract: '2018-06-05',
            endOfContract: '2025-06-05',
        },
        {
            ...emptyTenancy,
            id: '4',
            beginOfContract: '2017-06-05',
        },
    ];

    // Act
    const runningTenancies = tenancyService.getRunningTenancies(tenancies);

    // Assert
    expect(runningTenancies).toEqual(expectedRunningTenancies);
});
