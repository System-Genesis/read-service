import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import config from '../config/index';

import enums from '../config/db-enums';

const Joi = BaseJoi.extend(JoiDate);

const getRequestBaseSchema = Joi.object({
    query: {
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
        expanded: Joi.boolean(),
    },
    body: {},
});

export const getDIByCustomFilters = getRequestBaseSchema.keys({
    query: {
        ruleFilters: Joi.alternatives().try(Joi.array(), Joi.string()),
        source: Joi.alternatives().try(Joi.array(), Joi.string()),
        expanded: Joi.boolean(),
        updatedFrom: Joi.date().iso(),
        pageNum: Joi.number().min(1),
        pageSize: Joi.number().min(config.app.minPageSize).max(config.app.maxPageSize),
    },
});

export const getDIByRoleId = getRequestBaseSchema.keys({
    params: {
        roleId: Joi.string().required(),
    },
});

export const getDIByUniqueId = getRequestBaseSchema.keys({
    params: {
        uniqueId: Joi.string().required(),
    },
});
