module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'pipoca150',
    DB: 'nodeSequelize',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    }
};