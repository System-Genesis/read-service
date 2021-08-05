import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';

import enums from '../config/enums';

const Joi = BaseJoi.extend(JoiDate);

const expandedTypes = ['true', 'false'];

const getRequestBaseSchema = Joi.object({
    query: {
        expanded: Joi.string().valid(...expandedTypes),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    body: {},
});

export const getGroupById = getRequestBaseSchema.keys({
    params: {
        groupId: Joi.string().required(),
    },
});

export const getChildren = getRequestBaseSchema.keys({
    query: {
        direct: Joi.boolean(),
        page: Joi.string(),
        limit: Joi.number().max(1000),
        expanded: Joi.string().valid(...expandedTypes),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    params: {
        groupId: Joi.string().required(),
    },
});

export const getGroupsByHierarchy = getRequestBaseSchema.keys({
    query: {
        page: Joi.string(),
        limit: Joi.number().max(1000),
        expanded: Joi.string().valid(...expandedTypes),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    params: {
        hierarchy: Joi.string().required(),
    },
});

export const getGroupsByCustomFilters = getRequestBaseSchema.keys({
    query: {
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
        expanded: Joi.string().valid(...expandedTypes),
        source: Joi.string().valid(Object.values(enums.SOURCE)),
        updatedFrom: Joi.date().format('YYYY-MM-DD').utc(),
        page: Joi.string(),
        limit: Joi.number().max(1000),
    },
});
