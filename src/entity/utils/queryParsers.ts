export const extractFilters = (queryFilters) => {
    const extractedFilters = queryFilters;
    delete extractedFilters.expanded;
    delete extractedFilters.page;
    delete extractedFilters.ruleFilters;
    return extractedFilters;
};

const idsQuery = (idVals: string[]) => {
    return { $in: idVals };
};

const updatedFromQuery = (updatedFrom: Date) => {
    return { $gte: new Date(updatedFrom) };
};

const basicQuery = (value) => {
    return { $in: value };
};

export const mapFieldQueryFunc = new Map<string, any>([
    ['ids', idsQuery],
    ['updatedFrom', updatedFromQuery],
    ['entityType', basicQuery],
    ['rank', basicQuery],
    ['digitalIdentities.source', basicQuery],
    ['status', basicQuery],
]);
