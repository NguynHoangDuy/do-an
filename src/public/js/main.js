import { bannerHome } from "./Guest/slider.js";
import { multiModal } from "./Admin/multiModal.js";
import { changeInputFile } from "./Admin/changeInputFile.js";
import { getListClassCourse } from "./Admin/modangky/getListClassCourse.js";
bannerHome();
multiModal();
getListClassCourse();
changeInputFile();

if ($("#noi_dung")) {
    CKEDITOR.replace("noi_dung", { height: "800px" });
}
