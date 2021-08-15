import { RuleFilter } from '../../shared/types';

export const extractFilters = (queryFilters) => {
    const extractedFilters = queryFilters;
    delete extractedFilters.expanded;
    delete extractedFilters.page;
    delete extractedFilters.ruleFilters;
    return extractedFilters;
};

/* eslint-disable import/prefer-default-export */
const idsQuery = (idVals: string[]) => {
    return { $in: idVals };
};

const updatedFromQuery = (updatedFrom: Date) => {
    return { $gte: new Date(updatedFrom) };
};

const basicQuery = (value) => {
    return value;
};

export const mapFieldQueryFunc = new Map<string, any>([
    ['ids', idsQuery],
    ['updatedFrom', updatedFromQuery],
    ['source', basicQuery],
]);
