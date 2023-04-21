import { renderLopList } from "./renderLopList.js";

export function getListClassCourse() {
    if ($(".button-dslop").length) {
        const btn = $(".button-dslop");
        btn.on("click", function (event) {
            // Nút button được nhấn để mở modal
            const modal = $(this); // Modal hiện tại
            const courseId = modal.data("makh");
            const tenKH = modal.data("tenkh");
            const maCn = modal.data("macn");
            getListGv(maCn);
            getListPhong(maCn);
            renderTKBList();
            setInputThemLop(tenKH, courseId);
            renderLopList(courseId);
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

function getListPhong(macn) {
    $.ajax({
        url: `/api/phonghoc/${macn}`,
        type: "GET",
        dataType: "json",
        success: (listPH) => {
            let html = "";
            listPH.forEach((item) => {
                html += `<option value="${item.MA_PHONG}">${item.MA_PHONG} - ${item.DIA_CHI}</option>`;
            });
            $("#tkb-phong").html(html);
        },
    });
}

function setInputThemLop(tenKH, makhcc) {
    $(".button_molop").on("click", () => {
        document.querySelector("#MA_KH_THEM").value = tenKH;
        document.querySelector("#MA_KHCC_THEM").value = makhcc;
    });
}

function renderTKBList() {
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
}
