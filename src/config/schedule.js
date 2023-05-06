const con = require("./db");

exports.updateModangKy = () => {
    // Lệnh UPDATE của bạn
    con.query(
        "UPDATE mo_dang_ky SET TINH_TRANG = 0 WHERE DATE_ADD(TG_BD, INTERVAL TG_KT MONTH) < CURRENT_DATE"
    );
};
