import { bannerHome } from "./Guest/slider.js";
import { multiModal } from "./Admin/multiModal.js";
import {
    changeInputAllFile,
    changeInputFile,
} from "./Admin/changeInputFile.js";
import { modangky } from "./Admin/modangky/index.js";
import { hocVien } from "./HocVien/index.js";
// import { renderTKB } from "./Admin/modangky/renderTKB.js";

bannerHome();
multiModal();
changeInputAllFile();
changeInputFile();
modangky();
hocVien();
$(document).ready(function () {
    var map = L.map("map").setView([0, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    function geocodeAddress(address) {
        var url =
            "https://nominatim.openstreetmap.org/search?format=json&q=" +
            encodeURIComponent(address);

        $.ajax({
            url: url,
            dataType: "json",
            success: function (data) {
                if (data && data.length > 0) {
                    var lat = parseFloat(data[0].lat);
                    var lon = parseFloat(data[0].lon);

                    L.marker([lat, lon]).addTo(map);
                    map.setView([lat, lon], 17);
                } else {
                    alert("No results found for the address: " + address);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error:", errorThrown);
            },
        });
    }

    geocodeAddress("Đường Đoàn trần nghiệp, Nha Trang, Viet Nam");

    const listBranch = $(".branch-item");
    listBranch.on("click", (e) => {
        const item = e.currentTarget;
        listBranch.removeClass("active");
        item.classList.add("active");
        geocodeAddress(item.dataset.diachi);
    });
});

$(".btn-search").on("click", (e) => {
    e.preventDefault();
    $(".search-content").addClass("active");
});

$(".search-content").on("click", (e) => {
    if (e.currentTarget === e.target) {
        e.currentTarget.classList.remove("active");
    }
});

$("#noti-modal").modal("show");
if ($("#noi_dung")) {
    CKEDITOR.replace("noi_dung", { height: "800px" });
}


const tkbBtn = $(".tkb-btn");
tkbBtn.on("click", () => {
    console.log("click")
})