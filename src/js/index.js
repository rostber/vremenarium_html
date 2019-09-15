import $ from "jquery";
window.jQuery = $;
require('@fancyapps/fancybox/dist/jquery.fancybox');
require('slick-carousel');
require('jquery-ui-bundle');

$(function() {
  init_slider();
  init_zoom();
  init_order();
  init_scroll();
});

function init_scroll() {
  $('.js-scroll a').click(function(e) {
    var data = this.href.split('#')
    var url = data[0]
    var hash = data[1]
    if (url === window.location.href.replace(/#.*/g, '')) {
      var $el = $('#'+hash);
      if ($el) {
        e.preventDefault()
        $('html, body').animate({
          'scrollTop': $el.offset().top
        }, 500)
      }
    }
  })
}

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
  var bindZoom = function($el) {
    $el = $el ? $el.find('.js-zoom') : $('.js-zoom');
    $el.fancybox();
  }
  bindZoom();

  $('.js-modal').fancybox({
    baseClass: 'modal-wrap',
    afterShow: function(instance, current) {
      bindZoom(current.$content);
      init_slider(current.$content);
    }
  });
}

function init_slider($el) {
  $el = $el ? $el.find('.js-slider') : $('.js-slider');
  $el.slick({
    dots: true,
    infinite: true,
    speed: 300,
    nextArrow: '<span class="slider__next"></span>',
    prevArrow: '<span class="slider__prev"></span>',
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
