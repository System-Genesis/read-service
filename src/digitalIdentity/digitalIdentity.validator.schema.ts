import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';

import enums from '../config/enums';

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
        expanded: Joi.boolean(),
        updatedFrom: Joi.date().format('YYYY-MM-DD').utc(),
        pageNum: Joi.number().min(1),
        pageSize: Joi.number().min(50).max(1000),
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
