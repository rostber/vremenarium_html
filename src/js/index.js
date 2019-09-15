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
  $('.js-datepicker').each(function() {
    var $el = $(this);
    var eventDates = $el.data('exclude') || [];
    $el.datepicker({
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
      dateFormat: "yy-mm-dd",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: "",
      minDate: 0,
      beforeShowDay: function( date ) {
        var str = date.toISOString().slice(0,10);
        if (eventDates.indexOf(str) > -1) {
          return [false, 'ui-state-disabled-order'];
        } else {
          return [true, '', ''];
        }
      },
      onSelect: function(selectedDate) {
        select_date(selectedDate)
      }
    });
    select_date((new Date()).toISOString().slice(0,10));
  })
}
function select_date(date) {
  var $date = $('.js-order-date')
  var $time = $('.js-order-time')
  var $quest = $('.js-order-quest')
  $date.val(date)
  $time.val('')
  $quest.val('')
  $('.js-order-times').each(function() {
    var $el = $(this)
    var orders = $el.data('orders')
    var times = $el.data('times')
    var quests = $el.data('quests')
    var html = ''
    for (var time of times) {
      var disabled = orders[date] && orders[date].indexOf(time) > -1
      html += order_template(time, quests, disabled)
    }
    $el.html(html)
    order_select_bind()
  })
}
function order_template(time, quests, disabled) {
  var html = quests.map(function(i) {
    return '<div class="order-i__drop-i js-order-select-i" data-quest="'+i+'" data-time="'+time+'">квест <b>№'+i+'</b></div>'
  }).join('')
  return `
<div class="order-i">
  <div class="order-i__time">`+time+`</div>
  <div class="order-i__select js-order-select`+(disabled ? ' order-i__select_type_disabled' : '')+`">
    <div class="order-i__value js-order-select-value">-</div>
    <div class="order-i__drop">
      <div class="order-i__drop-i js-order-select-i" data-quest="" data-time="">-</div>
      `+html+`
    </div>
  </div>
</div>
  `
}
function order_select_bind() {
  var $time = $('.js-order-time')
  var $quest = $('.js-order-quest')
  $('.js-order-select').each(function() {
    var $el = $(this)
    var $v = $el.find('.js-order-select-value')
    var $i = $el.find('.js-order-select-i')
    $v.text($i.first().text())
    $i.click(function() {
      $('.js-order-select').each(function() {
        $(this).find('.js-order-select-value').html($(this).find('.js-order-select-i').first().html())
      })
      $v.html($(this).html())
      $time.val($(this).data('time'))
      $quest.val($(this).data('quest'))
    })
  })
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
    slidesToShow: 3
  });
}
