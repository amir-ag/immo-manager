export type TenancyModel = {
    id: string;
    tenant: string;
    beginOfContract: Date;
    endOfContract?: Date;
};

// Helper functions
export const getDisplayNameOfTenancy = (t: TenancyModel) => {
    return `Tenancy (${t.id})`;
};
