export function renderTKBList(malop) {
    $.ajax({
        url: `/admin/modangky/thoikhoabieu/` + malop,
        type: "GET",
        dataType: "json",
        success: function (listTKB) {
            if (listTKB.length !== 0) {
                let html = "";
                listTKB.forEach((tkb) => {
                    html += "<tr>";
                    html += `<td> ${tkb.TEN_LOP}</td>`;
                    html += `<td> ${tkb.TEN_THU}</td>`;
                    html += `<td> ${tkb.TG_BD} - ${tkb.TG_KT}</td>`;
                    html += `<td> ${tkb.TEN_PHONG}</td>`;
                    html += `<td> 
                            <button class="btn btn-danger btn-sm delete-tkb" data-malop="${tkb.MA_LOP}" data-mathu="${tkb.MA_THU}" data-matg="${tkb.MA_TG}" data-maphong="${tkb.MA_PHONG}"><i class="fa fa-trash"></i></button></td>`;
                    html += "</tr>";
                });

                $(`#tkb_lop${malop}`).html(html);
            } else {
                $(`#tkb_lop${malop}`).html(
                    `<tr > <td colspan= '5' class="text-center">Chưa có thời khóa biểu</td> </tr>`
                );
            }
        },
        error: function (err) {
            console.log(err);
            // Xử lý lỗi nếu có
        },
    });
}
