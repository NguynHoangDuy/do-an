const cron = require("node-cron");
const con = require("./db");

cron.schedule(
    "0 0 * * *",
    () => {
        // Cập nhật trạng thái của các bản ghi có ngày bắt đầu nhỏ hơn ngày hiện tại
        con.query(
            "UPDATE mo_dang_ky SET TINH_TRANG = 0 WHERE TG_BD < CURRENT_DATE"
        );
    },
    {
        scheduled: true,
        timezone: "Asia/Ho_Chi_Minh", // Chọn timezone phù hợp với vị trí của bạn
    }
);
