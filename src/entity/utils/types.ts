export const enum EntityTypes {
    ENTITY = 'entity',
    DI = 'digitalIdentity',
    OG = 'organizationGroup',
    ROLE = 'role',
}

export const enum ScopeFields {
    SOURCE = 'source',
    HIERARCHY = 'hierarchy',
}

export type RuleFilter = {
    field: ScopeFields;
    values: string[];
    entityType: EntityTypes;
};

export const enum QueryFields {
    IDS = 'ids',
    DATE = 'date',
}

export type optionalQueries = {
    expanded?: string;
    ids?: string[];
    rank?: string;
    entityType?: string;
    digitalIdentitySource?: string;
    status?: string;
    updateFrom?: Date;
    page?: string;
    ruleFilters?: string | string[];
};
