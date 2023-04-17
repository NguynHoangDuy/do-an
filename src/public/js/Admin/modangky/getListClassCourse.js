export function getListClassCourse() {
    if ($(".button-dslop").length) {
        const btn = $(".button-dslop");

        btn.click(function (event) {
            // Nút button được nhấn để mở modal
            const modal = $(this); // Modal hiện tại
            const courseId = modal.data("makh"); // Mã khóa học được chọn
            $.ajax({
                url: `/admin/modangky/danhsachlop/` + courseId,
                type: "GET",
                dataType: "json",
                success: function (classes) {
                    // Ẩn loading spinner
                    document
                        .querySelector("#button_molop")
                        .addEventListener("click", () => {
                            document.querySelector("#MA_KH_THEM").value =
                                classes[0].TEN_KH;
                            document.querySelector("#MA_KHCC_THEM").value =
                                courseId;
                            console.log(document.querySelector("#MA_KH_THEM"));
                        });
                    $("#button_molop").click(() => {
                        getListGv(classes[0].MA_CHI_NHANH);
                    });
                    if (classes.length !== 0) {
                        let html = "";
                        classes.forEach((item) => {
                            html += "<tr>";
                            html += `<td> ${item.MA_KH}</td>`;
                            html += `<td> ${item.TEN_KH}</td>`;
                            html += `<td> ${item.TEN_LOP}</td>`;
                            html += `<td> ${item.HO_TEN}</td>`;
                            html += `<td> ${item.SO_LUONG_HT} / ${item.SO_LUONG} </td>`;
                            html += `<td> <a data-toggle="modal" data-target= '#tkb${item.MA_LOP}' data-malop="${item.MA_LOP}" class="btn btn-primary btn-sm tkb-btn"><i class="fa fa-info-circle"></i> </a></td>`;
                            html += `<td> <button class="btn btn-primary btn-sm edit-btn"><i class="fa fa-pencil"></i> </button>
                            <button class="btn btn-danger btn-sm delete-btn"><i class="fa fa-trash"></i></button></td>`;
                            html += "</tr>";

                            let modalHtml = `
                  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal-title"   aria-hidden="true" id="tkb${item.MA_LOP}">
                  <div class="modal-dialog mw-70" role="document">
                    <div class="modal-content">
                      <form action="/admin/modangky/modangky" method="post">
                        <div class="modal-header">
                          <h5 class="modal-title" id="confirm-modal-title">Thời khóa biểu</h5>
                          <button class="close-alert close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                        <h2 class="text-center">THỜI KHÓA BIỂU</h2>
                        <div class="table-responsive">
                          <table class="table no-wrap user-table mb-0">
                            <thead>
                              <tr class="borderbottom">
                                <th scope="col" class="border-0 text-uppercase font-medium">Tên lớp</th>
                                <th scope="col" class="border-0 text-uppercase font-medium">Thứ</th>
                                <th scope="col" class="border-0 text-uppercase font-medium">Thời gian</th>
                                <th scope="col" class="border-0 text-uppercase font-medium">Phòng</th>
                                <th scope="col" class="border-0 text-uppercase font-medium">Chức năng</th>
                              </tr>
                            </thead>
                            <tbody id="tkb_lop${item.MA_LOP}">
                            </tbody>
                          </table>
                        </div>
                        </div>
                        <div class="modal-footer">
                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                `;
                            $(".modal-list").html(
                                $(".modal-list").html() + modalHtml
                            );
                        });
                        $(`#dslop${courseId}`).html(html);

                        if ($(".tkb-btn")) {
                            const tkbBtn = $(".tkb-btn");
                            console.log(tkbBtn);
                            tkbBtn.click(function (event) {
                                const modalTKB = $(this);
                                const malop = modalTKB.data("malop");
                                $.ajax({
                                    url:
                                        `/admin/modangky/thoikhoabieu/` + malop,
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
                                            html += `<tr > <td colspan= '5' class="text-center"><a class="button" data-toggle="modal" data-target="#themtkb">Thêm thời khóa biểu</a></td> </tr>`;
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
                    } else {
                        $(`#dslop${courseId}`).html(
                            `<tr > <td colspan= '7' class="text-center">Không có lớp nào</td> </tr>`
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

function getListGv(macn) {
    $.ajax({
        url: `/api/giaovien/${macn}`,
        type: "GET",
        dataType: "json",
        success: (listGv) => {
            let html = `<option value="" >Hãy chọn giáo viên</option>`;
            listGv.forEach((item) => {
                html += `<option value="${item.MA_GV}">${item.HO_TEN}</option>`;
            });
            $("#MA_GV_THEM_LOP").html(html);
        },
    });
}
