import $ from "jquery";
window.jQuery = $;
require('@fancyapps/fancybox/dist/jquery.fancybox');
require('slick-carousel');
require('jquery-ui-bundle');

$(function() {
  init_gallery();
  init_zoom();
  init_order();
});

function init_order() {
  var eventDates = ['20190914']
  $('.js-datepicker').datepicker({
    closeText: "Закрыть",
    prevText: "&#x3C;Пред",
    nextText: "След&#x3E;",
    currentText: "Сегодня",
    monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
    monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
    "Июл","Авг","Сен","Окт","Ноя","Дек" ],
    dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
    dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
    dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
    weekHeader: "Нед",
    dateFormat: "dd.mm.yy",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "",
    minDate: 0,
    beforeShowDay: function( date ) {
      var str = date.toISOString().slice(0,10).replace(/-/g,"");
      if (eventDates.indexOf(str) > -1) {
        return [true, 'event', 'highlight'];
      } else {
        return [true, '', ''];
      }
    },
    onSelect: function(selectedDate) {
      console.log('select', selectedDate)
    }
  });
}

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
