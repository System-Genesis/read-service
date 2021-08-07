export const extractFilters = (queryFilters) => {
    const extractedFilters = queryFilters;
    delete extractedFilters.expanded;
    delete extractedFilters.page;
    delete extractedFilters.ruleFilters;
    return extractedFilters;
};

const updatedFromQuery = (updatedFrom: string) => {
    return { $gte: new Date(updatedFrom) };
};

const basicQuery = (value) => {
    return { $in: value };
};

export const mapFieldQueryFunc = new Map<string, any>([['updatedFrom', updatedFromQuery]]);
