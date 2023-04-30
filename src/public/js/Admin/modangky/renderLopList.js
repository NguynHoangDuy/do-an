import { renderTKBList, renderTKB } from "./renderTKB.js";

export function renderLopList(courseId) {
    $.ajax({
        url: `/admin/modangky/danhsachlop/` + courseId,
        type: "GET",
        dataType: "json",
        success: function (classes) {
            // Ẩn loading spinner

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
                    html += `<td> <button class="btn btn-primary btn-sm edit-btn edit-lop-buton" data-toggle="modal" data-target="#capnhatlop" data-malop="${item.MA_LOP}" data-magv="${item.MA_GV}" data-tenlop="${item.TEN_LOP}" data-sl="${item.SO_LUONG}" data-tenkh="${item.TEN_KH}" data-macn="${item.MA_CHI_NHANH}" data-makhcc = "${item.MA_KHCC}" ><i class="fa fa-pencil"></i> </button>
                    <button class="btn btn-danger btn-sm delete-btn remove-lop" data-toggle="modal" data-target="#remove-lop" data-malop="${item.MA_LOP}" data-makhcc = "${item.MA_KHCC}" ><i class="fa fa-trash"></i></button></td>`;
                    html += "</tr>";

                    let modalHtml = `
          <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal-title" data-backdrop="false",  aria-hidden="true" id="tkb${item.MA_LOP}">
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
                <div class="flex flex-end"><a class="button them-tkb-btn" data-malop="${item.MA_LOP}" data-macn="${item.MA_CHI_NHANH}" data-toggle="modal" data-target="#themtkb-modal">Thêm thời khóa biểu</a></div>
                
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
                    $(".modal-list").html($(".modal-list").html() + modalHtml);
                });
                $(`#dslop${courseId}`).html(html);

                if ($(".tkb-btn")) {
                    const tkbBtn = $(".tkb-btn");
                    tkbBtn.click(function (event) {
                        const modalTKB = $(this);
                        const malop = modalTKB.data("malop");
                        renderTKBList(malop);
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
}
export function renderLopListHv(makhcc, mahv) {
    $.ajax({
        url: "/hocvien/dangkylop/dslop",
        type: "GET",
        data: { makhcc, mahv },
        dataType: "json",
        success: function (classes) {
            // Ẩn loading spinner

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
                    html += `<td> <a class="btn btn-primary btn-sm edit-btn dang-ky-lop" data-malop="${item.MA_LOP}" data-mahv = "${mahv}" ><i class="fa fa-info-circle"></i> </a></td>`;
                    html += "</tr>";

                    let modalHtml = `
          <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal-title" data-backdrop="false",  aria-hidden="true" id="tkb${item.MA_LOP}">
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
                    $(".modal-list").html($(".modal-list").html() + modalHtml);
                });
                $(`#dslop${makhcc}`).html(html);

                if ($(".tkb-btn")) {
                    const tkbBtn = $(".tkb-btn");
                    tkbBtn.click(function (event) {
                        const modalTKB = $(this);
                        const malop = modalTKB.data("malop");
                        renderTKB(malop);
                    });
                }
            } else {
                $(`#dslop${makhcc}`).html(
                    `<tr > <td colspan= '7' class="text-center">Không có lớp nào</td> </tr>`
                );
            }
        },
        error: function (err) {
            console.log(err);
            // Xử lý lỗi nếu có
        },
    });
}
