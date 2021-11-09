const apiDatabases = [
    {
        dbName: 'Genesis',
        dbUsers: [
            {
                username: 'tstest',
                password: 'tstest',
                // roles: ['readWrite', 'dbAdmin'],
            },
        ],
        dbData: [],
    },
];

const createDatabaseUsers = (db, dbName, users) => {
    users.map((dbUserData) => {
        const roles = dbUserData.roles.reduce((previousValue, role) => {
            const roleDefinition = {
                role,
                db: dbName,
            };

            previousValue.push(roleDefinition);
            return previousValue;
        }, []);

        db.createUser({
            user: dbUserData.username,
            pwd: dbUserData.password,
            roles,
        });

        return true;
    });
};

try {
    apiDatabases.map((database) => {
        const { dbName, dbUsers } = database;

        db = db.getSiblingDB(dbName);
        createDatabaseUsers(db, dbName, dbUsers);
        return true;
    });
} catch ({ message }) {
    print(`[ERROR ] ${message}`);
}
