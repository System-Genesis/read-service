export type RequestQueryFields = {
    expanded?: string;
    ids?: string[];
    rank?: string[];
    akaUnit?: string[];
    entityType?: string[];
    'digitalIdentities.uniqueIds'?: string[];
    personalNumbers?: string[];
    identityCards?: string[];
    'digitalIdentity.source'?: string[];
    status?: string;
    updateFrom?: Date;
    page?: string;
    limit?: string;
    ruleFilters?: string | string[];
};

export type EntityQueries = Omit<RequestQueryFields, 'expanded' | 'page' | 'limit' | 'ruleFilters'>;
