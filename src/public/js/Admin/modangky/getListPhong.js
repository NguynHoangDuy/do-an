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
