import IDenormalizedEntity from '../denormal/entity.denormalized.interface';

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

export type EntityFilters = {
    status: string[];
    entityType: string[];
    'digitalIdentities.source': string[];
    'digitalIdentities.mail': string[];
    mail: string[];
    rank: string[];
    responsibility: string[];
    hierarchyPath: string[];
};

export const entityMapFieldType: Map<string, Map<string, string>> = new Map<string, Map<string, string>>([
    ['source', new Map<string, string>([['Digital Identity', 'digitalIdentities.source']])],
    [
        'mail',
        new Map<string, string>([
            ['Digital Identity', 'digitalIdentities.mail'],
            ['Entity', 'mail'],
        ]),
    ],
    ['rank', new Map<string, string>([['Entity', 'rank']])],
    ['status', new Map<string, string>([['Entity', 'status']])],
    ['responsibility', new Map<string, string>([['Entity', 'responsibility']])],
    ['hierarchyPath', new Map<string, string>([['Entity', 'hierarchyPath']])],
]);

export const extractFilters = (queryFilters: optionalQueries) => {
    const extractedFilters = queryFilters;
    delete extractedFilters.expanded;
    delete extractedFilters.page;
    delete extractedFilters.ruleFilters;
    return extractedFilters;
};

const queryParser = (queryObj: object): any => {
    const cond = {};
    Object.entries(queryObj).forEach(([field, value]) => {
        if (Array.isArray(value)) {
            cond[field] = { $in: value };
        } else {
            cond[field] = value;
        }
    });
    return cond;
};

export const tranformIntoQuery = (queries: optionalQueries) => {
    const getAllFilters = queryParser(queries);
    if (getAllFilters.updatedFrom) {
        getAllFilters.updatedFrom = { updatedAt: { $gte: getAllFilters.updatedFrom } };
    }
    return getAllFilters;
};

export const removeDenormalizedFields = (entityDN: IDenormalizedEntity) => {
    const entity = entityDN;
    ['digitalIdentities'].forEach((prop) => delete entity[prop]);
    return entity;
};
