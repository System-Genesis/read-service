export type RequestQueryFields = {
    expanded?: string;
    ids?: string[];
    rank?: string;
    entityType?: string;
    'digitalIdentity.source'?: string;
    status?: string;
    updateFrom?: Date;
    page?: string;
    limit?: string;
    ruleFilters?: string | string[];
};

export type EntityQueries = Omit<RequestQueryFields, 'expanded' | 'page' | 'limit' | 'ruleFilters'>;
