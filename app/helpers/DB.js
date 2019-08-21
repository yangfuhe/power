const mysql = require('mysql');
class DB {
    constructor(config) {
        this.pool = mysql.createPool(config);
    }
    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, params, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    }
    find(sql, params) {
        return new Promise((resolve, reject) => this.query(sql, params).then(list => resolve(list)).catch(e => reject(e)))
    }
    findOne(sql, params) {
        return new Promise((resolve, reject) => this.query(sql, params).then(list => resolve(list[0])).catch(e => reject(e)))
    }
    count(sql, params) {
        return new Promise((resolve, reject) => this.query(sql, params).then(list => resolve(list[0]['count(*)'])).catch(e => reject(e)))
    }
    create(sql, params) {
        return new Promise((resolve, reject) => this.query(sql, params).then(list => resolve(list)).catch(e => reject(e)))
    }
    remove(sql, params) {
        return new Promise((resolve, reject) => this.query(sql, params).then(list => resolve(list)).catch(e => reject(e)))
    }
    modify(sql, params) {
        return new Promise((resolve, reject) => this.query(sql, params).then(list => resolve(list)).catch(e => reject(e)))
    }
    beginTransaction() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err)
                } else {
                    connection.beginTransaction(error => {
                        if (error) {
                            reject(error)
                        } else {
                            this.connection = connection;
                            resolve();
                        }
                    })
                }
            })
        })
    }
    run(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
    commit() {
        return new Promise((resolve, reject) => {
            this.connection.commit((err, msg) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            });
        })

    }
    rollback() {
        return new Promise((resolve, reject) => {
            this.connection.rollback((err, msg) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            });
        })
    }
    release() {
        this.connection.release();
    }
}

module.exports = DB