import { bannerHome } from "./Guest/slider.js";
import { multiModal } from "./Admin/multiModal.js";
import { changeInputFile } from "./Admin/changeInputFile.js";
import { getListClassCourse } from "./Admin/modangky/getListClassCourse.js";
import { addLop, editLop, inputCapNhat, removeLop } from "./Admin/modangky/addLop.js";

bannerHome();
// multiModal();

changeInputFile();
addLop();
inputCapNhat()
editLop()
removeLop()
getListClassCourse();

if ($("#noi_dung")) {
    CKEDITOR.replace("noi_dung", { height: "800px" });
}


