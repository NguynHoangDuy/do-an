export function renderTKBList() {
    if ($(".tkb-btn")) {
        const tkbBtn = $(".tkb-btn");

        tkbBtn.click(function (event) {
            const modalTKB = $(this);
            const malop = modalTKB.data("malop");
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
                            html += `<td> ${tkb.MA_PHONG}</td>`;
                            html += `<td> <button class="btn btn-primary btn-sm edit-btn"><i class="fa fa-pencil"></i> </button>
                              <button class="btn btn-danger btn-sm delete-btn"><i class="fa fa-trash"></i></button></td>`;
                            html += "</tr>";
                        });
                        
                        $(`#tkb_lop${malop}`).html(html);
                    } else {
                        $(`#tkb_lop${malop}`).html(
                            `<tr > <td colspan= '5' class="text-center"><a class="button" data-toggle="modal" data-target="#themtkb">Thêm thời khóa biểu</a></td> </tr>`
                        );
                    }
                },
                error: function (err) {
                    console.log(err);
                    // Xử lý lỗi nếu có
                },
            });
        });
    }
}
