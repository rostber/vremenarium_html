import $ from "jquery";
window.jQuery = $;
require('@fancyapps/fancybox/dist/jquery.fancybox');
require('slick-carousel');

$(function() {
  init_gallery();
  init_zoom();
});

function init_zoom() {
  $('.js-zoom').fancybox();
  $('.js-modal').fancybox({
    baseClass: 'modal-wrap'
  });
}

function init_gallery() {
  $('.js-gallery').slick({
    dots: false,
    infinite: true,
    speed: 300,
    nextArrow: '<span class="gallery__next"><svg class="gallery__next-icon"><use xlink:href="/img/icon.svg#icon_arrow"></use></svg></span>',
    prevArrow: '<span class="gallery__prev"><svg class="gallery__prev-icon"><use xlink:href="/img/icon.svg#icon_arrow"></use></svg></span>',
    responsive: [{
      breakpoint: 1920,
      settings: {
        arrows: true,
        slidesToShow: 3
      }
    }, {
      breakpoint: 1000,
      settings: {
        arrows: true,
        slidesToShow: 1
      }
    }]
  });
}
