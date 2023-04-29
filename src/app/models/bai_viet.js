const db = require("../../config/db");
class BaiViet {
    count() {
        return new Promise((resolve, reject) => {
            const query = "SELECT count(*) as count FROM bai_viet";
            db.query(query, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(res[0].count);
                }
            });
        });
    }

    create(baiviet) {
        const query = "INSERT INTO bai_viet SET ?";
        return new Promise((resolve, reject) => {
            db.query(query, baiviet, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(1);
                }
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM bai_viet WHERE id = ${id}`;
            db.query(query, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    getAll(offset, perPage) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM bai_viet Limit ${offset}, ${perPage}`;
            db.query(query, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    updateById(id, baiviet) {
        const query = "UPDATE bai_viet SET ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(query, [baiviet, id], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(1);
                }
            });
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM bai_viet WHERE id = ?";
            db.query(query, id, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(1);
                }
            });
        });
    }
    getLatestPosts() {
        return new Promise((resolve, reject) => {
            const query =
                "SELECT * FROM bai_viet ORDER BY ngay_tao DESC LIMIT 6";
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}

module.exports = BaiViet;
