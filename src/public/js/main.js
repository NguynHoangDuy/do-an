import { bannerHome } from "./Guest/slider.js";
import { multiModal } from "./Admin/multiModal.js";
import { changeInputAllFile, changeInputFile } from "./Admin/changeInputFile.js";
import { modangky } from "./Admin/modangky/index.js";
import { hocVien } from "./HocVien/index.js";
// import { renderTKB } from "./Admin/modangky/renderTKB.js";

bannerHome();
multiModal();
changeInputAllFile()
changeInputFile();
modangky();
hocVien();

$("#noti-modal").modal("show");
if ($("#noi_dung")) {
    CKEDITOR.replace("noi_dung", { height: "800px" });
}
