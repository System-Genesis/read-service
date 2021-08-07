import { RuleFilter } from '../../shared/types';

export const extractFilters = (queryFilters) => {
    const extractedFilters = queryFilters;
    delete extractedFilters.expanded;
    delete extractedFilters.page;
    delete extractedFilters.ruleFilters;
    return extractedFilters;
};

const basicQuery = (value) => {
    return value;
};

export const mapFieldQueryFunc = new Map<string, any>([['source', basicQuery]]);
