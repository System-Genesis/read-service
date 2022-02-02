import BaseJoi from 'joi';
import JoiDate from '@joi/date';
import config from '../config/index';

const Joi = BaseJoi.extend(JoiDate);
Joi.objectId = require('joi-objectid')(Joi);

const expandedTypes = ['true', 'false'];

const getRequestBaseSchema = Joi.object({
    query: {
        expanded: Joi.string().valid(...expandedTypes),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
        stream: Joi.string().valid(...expandedTypes),
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
        id: Joi.objectId(),
    },
});

export const getEntitiesByIdentifier = getRequestBaseSchema.keys({
    params: {
        identifier: Joi.string().required(),
    },
});

export const getEntitiesByGroup = getRequestBaseSchema.keys({
    query: {
        page: Joi.number().min(1).required(),
        pageSize: Joi.number().min(config.app.minPageSize).max(config.app.maxPageSize).required(),
        direct: Joi.boolean(),
        expanded: Joi.string().valid(...expandedTypes),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    params: {
        groupId: Joi.string().required(),
    },
});

export const getEntitiesByHierarchy = getRequestBaseSchema.keys({
    query: {
        page: Joi.number().min(1).required(),
        pageSize: Joi.number().min(config.app.minPageSize).max(config.app.maxPageSize).required(),
        direct: Joi.boolean(),
        expanded: Joi.string().valid(...expandedTypes),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    params: {
        hierarchy: Joi.string().required(),
    },
});

export const getPictureByIdentifier = getRequestBaseSchema.keys({
    params: {
        identifier: Joi.string().required(),
    },
});

export const getEntitiesByCustomFilters = getRequestBaseSchema.keys({
    query: {
        // ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()).required(),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
        // userFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
        expanded: Joi.string().valid(...expandedTypes),
        ids: Joi.alternatives().try(Joi.array(), Joi.string()),
        rank: Joi.alternatives().try(Joi.array(), Joi.string()), // TODO: test rank array or string
        akaUnit: Joi.alternatives().try(Joi.array(), Joi.string()),
        entityType: Joi.string(),
        'digitalIdentity.source': Joi.alternatives().try(Joi.array(), Joi.string()),
        status: Joi.string(),
        stream: Joi.string().valid(...expandedTypes),
        'digitalIdentities.uniqueIds': Joi.alternatives().try(Joi.array(), Joi.string()),
        personalNumbers: Joi.alternatives().try(Joi.array(), Joi.string()),
        identityCards: Joi.alternatives().try(Joi.array(), Joi.string()),
        updatedFrom: Joi.date().iso(),
        page: Joi.number().min(1),
        pageSize: Joi.number().min(config.app.minPageSize).max(config.app.maxPageSize),
    },
});
