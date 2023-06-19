export function getListPhong() {
    const MA_CN = $("#MA_CN_TKB").val();
    const MA_THU = $("#tkb-thu").val();
    const optionSelected = $("#tkb-tg").find(":selected");
    const TG_BD = optionSelected.data("tgbd");
    const TG_KT = optionSelected.data("tgkt");

    $.ajax({
        url: `/api/phonghoc`,
        type: "GET",
        data: { MA_CN, MA_THU, TG_BD, TG_KT },
        dataType: "json",
        success: (listPH) => {
            let html = "";
            listPH.forEach((item) => {
                html += `<option value="${item.MA_PHONG}">${item.TEN_PHONG}</option>`;
            });
            $("#tkb-phong").html(html);
        },
    });
}
export function getListTG() {
    const MA_GV = $("#MA_GV_TKB").val();
    const MA_THU = $("#tkb-thu").val();

    $.ajax({
        url: `/api/thoigian`,
        type: "GET",
        data: { MA_GV, MA_THU },
        dataType: "json",
        success: (listPH) => {
            let html = "";
            listPH.forEach((item) => {
                html += `<option value="${item.MA_TG}" data-tgbd="${item.TG_BD}" data-tgkt="${item.TG_KT}">${item.TG_BD} - ${item.TG_KT}</option>`;
            });
            $("#tkb-tg").html(html);
        },
    });
}
