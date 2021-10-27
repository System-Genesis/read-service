import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import config from '../config/index';

import enums from '../config/db-enums';

const Joi = BaseJoi.extend(JoiDate);
Joi.objectId = require('joi-objectid')(Joi);

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
        id: Joi.objectId().required(),
    },
});

export const getChildren = getRequestBaseSchema.keys({
    query: {
        direct: Joi.boolean(),
        pageNum: Joi.number().min(1),
        pageSize: Joi.number().min(config.app.minPageSize).max(config.app.maxPageSize),
        expanded: Joi.string().valid(...expandedTypes),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    params: {
        id: Joi.string().required(),
    },
});

export const getGroupsByHierarchy = getRequestBaseSchema.keys({
    query: {
        pageNum: Joi.number().min(1),
        pageSize: Joi.number().min(config.app.minPageSize).max(config.app.maxPageSize),
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
        source: Joi.string().valid(...Object.values(enums.SOURCE)),
        updatedFrom: Joi.date().iso(),
        pageNum: Joi.number().min(1),
        pageSize: Joi.number().min(config.app.minPageSize).max(config.app.maxPageSize),
    },
});
