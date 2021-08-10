export const extractFilters = (queryFilters) => {
    const extractedFilters = queryFilters;
    delete extractedFilters.expanded;
    delete extractedFilters.page;
    delete extractedFilters.ruleFilters;
    return extractedFilters;
};

const updatedFromQuery = (updatedFrom: Date) => {
    return { $gte: updatedFrom };
};

const basicQuery = (value) => {
    return value;
};

export const mapFieldQueryFunc = new Map<string, any>([['updatedFrom', updatedFromQuery]]);
