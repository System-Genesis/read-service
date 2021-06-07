export default {
    // The first element is the default value of who need rank
    RANK: { unknown: 2, rookie: 10, champion: 5, ultimate: 2, mega: 1 },

    CURRENT_UNIT: {
        nitro: 1,
        jelly: 1,
    },

    // the last element makes the 'domainUsers' field required (at least 1 value in the array)
    // the second to last element makes the 'rank' field required
    ENTITY_TYPE: { digimon: 10, agumon: 10, tamar: 1 },
    // If there is no ADFS you will write an empty string value ('')
    DOMAIN_MAP: [
        ['rabiran.com', 'rabiranuid'],
        ['somedomain.com', 'somedomainuid'],
        ['jello.com', 'jellouid'],
        ['jello2.com', 'jellouid'],
        ['yoda.sw', ''],
        ['turtle.com', ''],
        ['donatelo.turtle.com', ''],
        ['rafael.turtle.com', ''],
        ['leonardo.com', ''],
    ],
    // the first element is the default value
    SERVICE_TYPE: { A: 10, B: 2, C: 2, D: 2, E: 2, F: 2, G: 2, H: 2 },

    DATA_SOURCE: {
        aka: 'aka',
        es: 'es_name',
        ads: 'ads_name',
        adnn: 'adNN_name',
        nv: 'nvSQL_name',
        lmn: 'lmn_name',
        mdn: 'mdn_name',
        mm: 'mm_name',
        city: 'city_name',
        sf: 'sf_name',
        mir: 'mir_name',
    },

    SEX: {
        Male: 1,
        Female: 1,
    },

    STATUS: {
        ACTIVE: 10,
        INACTIVE: 1,
        INCOMPLETE: 1,
    },
};
