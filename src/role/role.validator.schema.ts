import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import config from '../config/index';

import enums from '../config/db-enums';

const Joi = BaseJoi.extend(JoiDate);

const getRequestBaseSchema = Joi.object({
    query: {
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    body: {},
});

export const getRolesByCustomFilters = getRequestBaseSchema.keys({
    query: {
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
        source: Joi.alternatives().try(Joi.array(), Joi.string()),
        updatedFrom: Joi.date().iso(),
        page: Joi.number().min(1).required(),
        pageSize: Joi.number().min(config.app.minPageSize).max(config.app.maxPageSize).required(),
    },
});

export const getRoleByRoleId = getRequestBaseSchema.keys({
    params: {
        roleId: Joi.string().required(),
    },
});

export const getRoleByDIUniqueId = getRequestBaseSchema.keys({
    params: {
        digitalIdentityUniqueId: Joi.string().required(),
    },
});

export const getRolesByGroupId = getRequestBaseSchema.keys({
    query: {
        page: Joi.number().min(1).required(),
        pageSize: Joi.number().min(config.app.minPageSize).max(config.app.maxPageSize).required(),
        direct: Joi.boolean(),
        expanded: Joi.boolean(),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    params: {
        groupId: Joi.string().required(),
    },
});

export const getRolesByHierarchy = getRequestBaseSchema.keys({
    query: {
        page: Joi.number().min(1).required(),
        pageSize: Joi.number().min(config.app.minPageSize).max(config.app.maxPageSize).required(),
        direct: Joi.boolean(),
        expanded: Joi.boolean(),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    params: {
        hierarchy: Joi.string().required(),
    },
});
