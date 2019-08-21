const redis = {
    port: 6379,
    host: 'localhost',
    family: 4,
    db: 0
};


let mysql = {
    "host": '127.0.0.1',
    "port": 3306,
    "user": "root",
    "password": "wanlian2018",
    "database": "power",
    "charset": "UTF8_GENERAL_CI",
    "connectTimeout": 1000,
    "connectionLimit": 100,
};

module.exports = {
    redis,
    mysql
}