export function changeInputFile() {
    const fileInput = document.getElementById("anh_dd");
    const imagePreview = document.querySelector(".img-account-profile");
    if (fileInput && imagePreview) {
        fileInput.addEventListener("change", function () {
            const file = this.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                imagePreview.src = event.target.result;
            };

            reader.readAsDataURL(file);
        });
    }
}
export function changeInputAllFile() {
    const fileInput = $(".anh_dd");
    if (fileInput) {
        fileInput.on("change", function () {
            const file = this.files[0];
            const reader = new FileReader();
            const imagePreview = $(this).prev().children()
            console.log(imagePreview)
            reader.onload = function (event) {
                
                imagePreview.attr('src',event.target.result)
            };

            reader.readAsDataURL(file);
        });
    }
}
