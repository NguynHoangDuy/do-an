import { bannerHome } from "./Guest/slider.js";
import { multiModal } from "./Admin/multiModal.js";
import { changeInputFile } from "./Admin/changeInputFile.js";
import { modangky } from "./Admin/modangky/index.js";
// import { renderTKB } from "./Admin/modangky/renderTKB.js";

bannerHome();
multiModal();

changeInputFile();
modangky();

if ($("#noi_dung")) {
    CKEDITOR.replace("noi_dung", { height: "800px" });
}

console.log($(".btn-tkb"))
