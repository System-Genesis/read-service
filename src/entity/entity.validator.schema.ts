import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

const expandedTypes = ['true', 'false'];

const getRequestBaseSchema = Joi.object({
    query: {
        expanded: Joi.string().valid(...expandedTypes),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    body: {},
});

export const getEntitiesByRole = getRequestBaseSchema.keys({
    params: {
        roleId: Joi.string().required(),
    },
});

export const getEntitiesByDigitalIdentity = getRequestBaseSchema.keys({
    params: {
        digitalIdentityUniqueId: Joi.string().required(),
    },
});

export const getEntitiesById = getRequestBaseSchema.keys({
    params: {
        id: Joi.string().required(),
    },
});

export const getEntitiesByIdentifier = getRequestBaseSchema.keys({
    params: {
        identifier: Joi.string().required(),
    },
});

export const getEntitiesByGroup = getRequestBaseSchema.keys({
    query: {
        page: Joi.string(),
        limit: Joi.number().max(1000),
        expanded: Joi.string().valid(...expandedTypes),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    params: {
        groupId: Joi.string().required(),
    },
});

export const getEntitiesByHierarchy = getRequestBaseSchema.keys({
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

export const getEntitiesByCustomFilters = getRequestBaseSchema.keys({
    query: {
        // ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()).required(),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
        // userFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
        expanded: Joi.string().valid(...expandedTypes),
        ids: Joi.alternatives().try(Joi.array(), Joi.string()),
        rank: Joi.string(),
        entityType: Joi.string(),
        digitalIdentitySource: Joi.string(),
        status: Joi.string(),
        updatedFrom: Joi.date().format('YYYY-MM-DD').utc(),
        page: Joi.string(),
        limit: Joi.number().max(1000),
    },
});
