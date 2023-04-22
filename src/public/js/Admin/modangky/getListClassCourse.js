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
