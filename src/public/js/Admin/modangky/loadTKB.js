import { renderTKB } from "./renderTKB.js";

export function loadTKB(){
        $(document).on("click", ".btn-tkb", function (e) {
            e.preventDefault()
            console.log("click")
            // Nút button được nhấn để mở modal
            const modal = $(this); // Modal hiện tại
            const malop = modal.data("malop");
            renderTKB(malop)
        });
    }
