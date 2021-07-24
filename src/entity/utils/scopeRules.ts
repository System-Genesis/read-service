// export type entitiesExcluders = {
//     entity: Omit<RuleFilter, 'entityType'>[];
//     digitalIdentity: Omit<RuleFilter, 'entityType'>[];
//     organizationGroup: Omit<RuleFilter, 'entityType'>[];
//     role: Omit<RuleFilter, 'entityType'>[];
// };

// export const extractEntitiesExcluders = (filtersQuery: RuleFilter[] = []) => {
//     const excluders: entitiesExcluders = {
//         entity: [],
//         digitalIdentity: [],
//         organizationGroup: [],
//         role: [],
//     };
//     filtersQuery.forEach((filterRule) => {
//         excluders[filterRule.entityType] = {
//             field: filterRule.field,
//             values: filterRule.values,
//         };
//     });

//     return excluders;
// };
