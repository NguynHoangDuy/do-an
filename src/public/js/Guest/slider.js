

export function bannerHome(){
  if ($(".hero-swiper").length > 0) {
    var heroSwiper = new Swiper(".hero-swiper", {
      loop: true,
      autoplay: {
        delay: 4000, // thời gian chờ giữa các slide (đơn vị: ms)
        disableOnInteraction: false, // tắt autoplay khi người dùng vuốt slider
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  
    var slidingSwiper = new Swiper(".sliding-swiper", {
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  
    var reviewSwiper = new Swiper(".review-swiper", {
      // slidesPerView: 'auto',
      grabCursor: true,
      navigation: {
        hiddenClass: "swiper-button-hidden",
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        980: {
          slidesPerView: 1.2,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: "auto",
        },
      },
    });
  
    reviewSwiper.on("reachBeginning", function () {
      jQuery(".list-review").addClass("start");
      jQuery(".list-review").removeClass("end");
    });
  
    reviewSwiper.on("reachEnd", function () {
      jQuery(".list-review").addClass("end");
      jQuery(".list-review").removeClass("start");
    });
  
    reviewSwiper.on("slideChange", function (e) {
      const length_reviews =
        jQuery(".list-review .swiper-wrapper .review-item").length - 1;
  
      if (length_reviews === reviewSwiper.activeIndex) {
        jQuery(".swiper-button-next").addClass("swiper-button-disabled");
      }
    });
  }
}