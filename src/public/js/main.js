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

if ($(".button-dslop").length) {
  const btn = $(".button-dslop");

  btn.click(function (event) {
    // Nút button được nhấn để mở modal
    const modal = $(this); // Modal hiện tại
    const courseId = modal.data("makh"); // Mã khóa học được chọn
    $.ajax({
      url: `/admin/modangky/danhsachlop/` + courseId,
      type: "GET",
      dataType: "json",
      success: function (classes) {
        // Ẩn loading spinner

        if (classes.length !== 0) {
          let html = "";
          classes.forEach((item) => {
            html += "<tr>";
            html += `<td> ${item.MA_KH}</td>`;
            html += `<td> ${item.TEN_KH}</td>`;
            html += `<td> ${item.TEN_LOP}</td>`;
            html += `<td> ${item.HO_TEN}</td>`;
            html += `<td> <a data-toggle="modal" data-target= '#tkb${item.MA_LOP}' data-malop="${item.MA_LOP}" class="btn btn-primary btn-sm tkb-btn"><i class="fa fa-info-circle"></i> </a></td>`;
            html += `<td> <button class="btn btn-primary btn-sm edit-btn"><i class="fa fa-pencil"></i> </button>
            <button class="btn btn-danger btn-sm delete-btn"><i class="fa fa-trash"></i></button></td>`;
            html += "</tr>";

            let modalHtml = `
              <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal-title"   aria-hidden="true" id="tkb${item.MA_LOP}">
              <div class="modal-dialog mw-70" role="document">
                <div class="modal-content">
                  <form action="/admin/modangky/modangky" method="post">
                    <div class="modal-header">
                      <h5 class="modal-title" id="confirm-modal-title">Thời khóa biểu</h5>
                      <button class="close-alert close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                    <h2 class="text-center">THỜI KHÓA BIỂU</h2>
                    <div class="flex justify-content-end">
                      <a class="button" data-toggle="modal" data-target="#molop">Thêm thời khóa biểu</a>
                    </div>
                    <div class="table-responsive">
                      <table class="table no-wrap user-table mb-0">
                        <thead>
                          <tr class="borderbottom">
                            <th scope="col" class="border-0 text-uppercase font-medium">Tên lớp</th>
                            <th scope="col" class="border-0 text-uppercase font-medium">Thứ</th>
                            <th scope="col" class="border-0 text-uppercase font-medium">Thời gian</th>
                            <th scope="col" class="border-0 text-uppercase font-medium">Phòng</th>
                            <th scope="col" class="border-0 text-uppercase font-medium">Chức năng</th>
                          </tr>
                        </thead>
                        <tbody id="tkb_lop${item.MA_LOP}">
                        </tbody>
                      </table>
                    </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            `;
            $(".modal-list").html($(".modal-list").html() + modalHtml);
          });
          $(`#dslop${courseId}`).html(html);

          if ($(".tkb-btn")) {
            const tkbBtn = $(".tkb-btn");
            console.log(tkbBtn);
            tkbBtn.click(function (event) {
              const modalTKB = $(this);
              console.log(modalTKB); // Modal hiện tại
              const malop = modalTKB.data("malop"); // Mã khóa học được chọn
              console.log(malop);

              $.ajax({
                url: `/admin/modangky/thoikhoabieu/` + malop,
                type: "GET",
                dataType: "json",
                success: function (classes) {
                  console.log(classes);

                  if (classes.length !== 0) {
                    let html = "";
                    classes.forEach((tkb) => {
                      html += "<tr>";
                      html += `<td> ${tkb.TEN_LOP}</td>`;
                      html += `<td> ${tkb.TEN_THU}</td>`;
                      html += `<td> ${tkb.TG_BD} - ${tkb.TG_KT}</td>`;
                      html += `<td> ${tkb.MA_PHONG}</td>`;
                      html += `<td> <button class="btn btn-primary btn-sm edit-btn"><i class="fa fa-pencil"></i> </button>
                      <button class="btn btn-danger btn-sm delete-btn"><i class="fa fa-trash"></i></button></td>`;
                      html += "</tr>";

                      $(`#tkb_lop${malop}`).html(html);
                    });
                  } else {
                    $(`#tkb_lop${malop}`).html(
                      `<tr > <td colspan= '5' class="text-center">Không có lớp nào</td> </tr>`
                    );
                  }
                },
                error: function (err) {
                  console.log(err);
                  // Xử lý lỗi nếu có
                },
              });
            });
          }
        } else {
          $(`#dslop${courseId}`).html(
            `<tr > <td colspan= '5' class="text-center">Không có lớp nào</td> </tr>`
          );
        }
      },
      error: function (err) {
        console.log(err);
        // Xử lý lỗi nếu có
      },
    });
  });
}

(function ($, window) {
  "use strict";

  var MultiModal = function (element) {
    this.$element = $(element);
    this.modalCount = 0;
  };

  MultiModal.BASE_ZINDEX = 1040;

  MultiModal.prototype.show = function (target) {
    var that = this;
    var $target = $(target);
    var modalIndex = that.modalCount++;

    $target.css("z-index", MultiModal.BASE_ZINDEX + modalIndex * 20 + 10);

    // Bootstrap triggers the show event at the beginning of the show function and before
    // the modal backdrop element has been created. The timeout here allows the modal
    // show function to complete, after which the modal backdrop will have been created
    // and appended to the DOM.
    window.setTimeout(function () {
      // we only want one backdrop; hide any extras
      if (modalIndex > 0) $(".modal-backdrop").not(":first").addClass("hidden");

      that.adjustBackdrop();
    });
  };

  MultiModal.prototype.hidden = function (target) {
    this.modalCount--;

    if (this.modalCount) {
      this.adjustBackdrop();

      // bootstrap removes the modal-open class when a modal is closed; add it back
      $("body").addClass("modal-open");
    }
  };

  MultiModal.prototype.adjustBackdrop = function () {
    var modalIndex = this.modalCount - 1;
    $(".modal-backdrop:first").css(
      "z-index",
      MultiModal.BASE_ZINDEX + modalIndex * 20
    );
  };

  function Plugin(method, target) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("multi-modal-plugin");

      if (!data)
        $this.data("multi-modal-plugin", (data = new MultiModal(this)));

      if (method) data[method](target);
    });
  }

  $.fn.multiModal = Plugin;
  $.fn.multiModal.Constructor = MultiModal;

  $(document).on("show.bs.modal", function (e) {
    $(document).multiModal("show", e.target);
  });

  $(document).on("hidden.bs.modal", function (e) {
    $(document).multiModal("hidden", e.target);
  });
})(jQuery, window);
