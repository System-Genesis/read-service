import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';

import enums from '../config/enums';

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
        updatedFrom: Joi.date().iso(),
        pageNum: Joi.number().min(1),
        pageSize: Joi.number().min(50).max(1000),
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
        pageNum: Joi.number().min(1),
        pageSize: Joi.number().min(50).max(1000),
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
        pageNum: Joi.number().min(1),
        pageSize: Joi.number().min(50).min(50).max(1000),
        direct: Joi.boolean(),
        expanded: Joi.boolean(),
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
    },
    params: {
        hierarchy: Joi.string().required(),
    },
});
