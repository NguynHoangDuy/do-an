import { renderLopList } from "./renderLopList.js";

export function addLop() {
    $(document).on("click", "#them-lop-mdk", function () {
        const MA_KHCC = $("#MA_KHCC_THEM").val();
        const TEN_LOP = $("#TEN_LOP").val();
        const MA_GV = $("#MA_GV_THEM_LOP").val();
        const SO_LUONG = $("#SO_LUONG").val();
        console.log(MA_KHCC);
        $.ajax({
            url: "/admin/lop/them",
            method: "POST",
            data: { MA_KHCC, TEN_LOP, MA_GV, SO_LUONG },
            success: function (result) {
                renderLopList(MA_KHCC);
            },
            error: function (err) {
                console.log(err);
                // Xử lý lỗi nếu có
            },
        });
        
        $("#molop").modal().hide();
    });
}


export function inputCapNhat() {

    $(document).on("click", ".edit-lop-buton", function (e) {
        e.preventDefault()
        const dl = $(this)
        const tenKH = dl.data("tenkh")
        const tenLop = dl.data("tenlop")
        const magv = dl.data("magv")
        const macn = dl.data("macn")
        const malop = dl.data("malop")
        const soluong = dl.data("sl")
        const makhcc = dl.data("makhcc")
        getListGv(macn, magv)
        $("#MA_KH_CN").val(tenKH) 
        $("#MA_LOP_CN").val(malop) 
        $("#TEN_LOP_CN").val(tenLop) 
        $("#SO_LUONG_CN").val(soluong)
        $("#MA_KHCC_CN").val(makhcc)
        
    });
    $(document).on("click", ".remove-lop", function (e) {
        e.preventDefault()
        const dl = $(this)
        const malop = dl.data("malop")
        const makhcc = dl.data("makhcc")
        $("#MA_KHCC_RM").val(makhcc)
        $("#MA_LOP_RM").val(malop)       
    });

}

function getListGv(macn, magv) {
    $.ajax({
        url: `/api/giaovien/${macn}`,
        type: "GET",
        dataType: "json",
        success: (listGv) => {
            let html = `<option value="" >Hãy chọn giáo viên</option>`;
            listGv.forEach((item) => {
                html += `<option value="${item.MA_GV}" ${magv == item.MA_GV ? "selected" : ""}>${item.HO_TEN}</option>`;
            });
            $("#MA_GV_CN").html(html);
        },
    });
}


export function editLop() {
    $(document).on("click", "#capnhat-lop-mdk", function (e) {
        e.preventDefault()
        const MA_KHCC = $("#MA_KHCC_CN").val();
        const malop = $("#MA_LOP_CN").val();
        const MA_GV = $("#MA_GV_CN").val();
        const SO_LUONG = $("#SO_LUONG_CN").val();

        $.ajax({
            url: `/admin/lop/sua/${malop}`,
            method: "POST",
            data: {  MA_GV, SO_LUONG },
            success: function (result) {
                console.log(result)
                renderLopList(MA_KHCC);
            },
            error: function (err) {
                console.log(err);
                // Xử lý lỗi nếu có
            },
        });
        
        $("#capnhatlop").modal().hide();
    })
}
export function removeLop() {
    $(document).on("click", "#xoa-lop-mdk", function (e) {
        e.preventDefault()
        const malop = $("#MA_LOP_RM").val();
        const MA_KHCC = $("#MA_KHCC_RM").val();
        console.log(malop, MA_KHCC)
        $.ajax({
            url: `/admin/lop/xoa/${malop}`,
            method: "POST",
            success: function (result) {
                console.log(result)
                renderLopList(MA_KHCC);
            },
            error: function (err) {
                console.log(err);
                // Xử lý lỗi nếu có
            },
        });
        
        $("#capnhatlop").modal().hide();
    })
}