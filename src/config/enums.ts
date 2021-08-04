export default {
    // The first element is the default value of who need rank
    RANK: { unknown: 'unknown', rookie: 'rookie', champion: 'champion', ultimate: 'ultimate', mega: 'mega' },

    CURRENT_UNIT: {
        1: 'nitro unit',
        2: 'jelly unit',
    },

    // the last element makes the 'domainUsers' field required (at least 1 value in the array)
    // the second to last element makes the 'rank' field required
    ENTITY_TYPE: { digimon: 'digimon', agumon: 'agumon', tamar: 'tamar' },
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
    SERVICE_TYPE: { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F', G: 'G', H: 'H' },

    SOURCE: {
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
        Male: 'm',
        Female: 'f',
    },

    STATUS: {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        INCOMPLETE: 'incomplete',
    },
};
