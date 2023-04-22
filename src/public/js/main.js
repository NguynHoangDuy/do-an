import { bannerHome } from "./Guest/slider.js";
import { multiModal } from "./Admin/multiModal.js";
import { changeInputFile } from "./Admin/changeInputFile.js";
import { getListClassCourse } from "./Admin/modangky/getListClassCourse.js";
import {
    addLop,
    addTKBLop,
    editLop,
    inputCapNhat,
    removeLop,
    removeTKB,
} from "./Admin/modangky/addLop.js";

bannerHome();
multiModal();

changeInputFile();
addLop();
inputCapNhat();
editLop();
removeLop();
addTKBLop();
removeTKB();
getListClassCourse();

if ($("#noi_dung")) {
    CKEDITOR.replace("noi_dung", { height: "800px" });
}
