import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

const expandedTypes = ['true', 'false'];

const getRequestBaseSchema = Joi.object({
    query: {
        expanded: Joi.string().valid(...expandedTypes),
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
    params: {
        groupId: Joi.string().required(),
    },
});

export const getEntitiesByHierarchy = getRequestBaseSchema.keys({
    params: {
        hierarchy: Joi.string().required(),
    },
});

export const getEntitiesByCustomFilters = getRequestBaseSchema.keys({
    query: {
        ids: Joi.array().items(Joi.string()),
        rank: Joi.string(),
        entityType: Joi.string(),
        digitalIdentitySource: Joi.string(),
        status: Joi.string(),
        updateFrom: Joi.date().format('YYYY-MM-DD').utc(),
        page: Joi.string(),
    },
});
