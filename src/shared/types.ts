export const enum EntityTypes {
    ENTITY = 'entity',
    DI = 'digitalIdentity',
    GROUP = 'group',
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
