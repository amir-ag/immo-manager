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
    PROPERTIES_DETAIL: '/app/properties/:id',
    // Rental Units
    RENTAL_UNITS_CREATE: '/app/rental-units/create',
    RENTAL_UNITS_DETAIL: '/app/rental-units/:id',
    // Tenancies
    TENANCIES_CREATE: '/app/tenancies/create',
    TENANCIES_DETAIL: '/app/tenancies/:id',
    // Rent Schedule
    RENT_SCHEDULE: '/app/rent-schedule',
};

export default routes;
