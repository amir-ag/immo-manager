const propertiesDetailRoute = '/app/properties/:id';
const rentalUnitsDetailRoute = '/app/rental-units/:id';
const tenanciesDetailRoute = '/app/tenancies/:id';

const routes = {
    // Base
    HOME: '/',
    SIGNUP: '/signup',
    AUTHENTICATED_AREA: '/app',

    // Profile
    PROFILE: '/app/profile',

    // Dashboard
    DASHBOARD: '/app/dashboard',

    // Persons
    PERSONS: '/app/persons',

    // Properties
    PROPERTIES_OVERVIEW: '/app/properties',
    PROPERTIES_CREATE: '/app/properties/create',
    PROPERTIES_DETAIL: propertiesDetailRoute,
    getPropertyDetailRouteById: (id: string) => propertiesDetailRoute.replace(':id', id),

    // Rental Units
    RENTAL_UNITS_CREATE: '/app/rental-units/create',
    RENTAL_UNITS_DETAIL: rentalUnitsDetailRoute,
    getRentalUnitDetailRouteById: (id: string) => rentalUnitsDetailRoute.replace(':id', id),

    // Tenancies
    TENANCIES_CREATE: '/app/tenancies/create',
    TENANCIES_DETAIL: tenanciesDetailRoute,
    getTenancyDetailRouteById: (id: string) => tenanciesDetailRoute.replace(':id', id),

    // Rent Schedule
    RENT_SCHEDULE: '/app/rent-schedule',
};

export default routes;
