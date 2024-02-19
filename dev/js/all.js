window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener("DOMContentLoaded", () => {
  // svg
  $(function () {
    jQuery('img.svg').each(function () {
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      jQuery.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, else we gonna set it if we can.
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

      }, 'xml');

    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  //пишем событие при клике на кнопки - вызов функции toggle
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
  }

  //пишем функцию
  function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Accordeon
  $(document).ready(function () {
    $(".set > a").on("click", function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass("active");
        $(this).siblings('.content').slideUp(200);
        $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
      }
      else {
        $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
        $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
        $(".set > a").removeClass("active");
        $(this).addClass("active");
        $('.content').slideUp(200);
        $(this).siblings('.content').slideDown(200);
      }
      return false
    });

  });

});
document.addEventListener('DOMContentLoaded', function () {
  $('.my').change(function () {
    if ($(this).val() != '') $(this).prev().text('Выбрано файлов: ' + $(this)[0].files.length);
    else $(this).prev().text('Выберите файлы');
  });
});
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // инициализация .tabs как табов
  new ItcTabs('.tabs');
});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $(".youtube-link").grtyoutube({
      autoPlay: true
    });
  });

  (function ($) {

    $.fn.grtyoutube = function (options) {

      return this.each(function () {

        // Get video ID
        var getvideoid = $(this).attr("youtubeid");

        // Default options
        var settings = $.extend({
          videoID: getvideoid,
          autoPlay: true
        }, options);

        // Convert some values
        if (settings.autoPlay === true) { settings.autoPlay = 1 } else { settings.autoPlay = 0 }

        // Initialize on click
        if (getvideoid) {
          $(this).on("click", function () {
            $("body").append('<div class="grtvideo-popup">' +
              '<div class="grtvideo-popup-content">' +
              '<span class="grtvideo-popup-close">&times;</span>' +
              '<iframe class="grtyoutube-iframe" src="https://www.youtube.com/embed/' + settings.videoID + '?rel=0&wmode=transparent&autoplay=' + settings.autoPlay + '&iv_load_policy=3" allowfullscreen frameborder="0"></iframe>' +
              '</div>' +
              '</div>');
          });
        }

        // Close the box on click or escape
        $(this).on('click', function (event) {
          event.preventDefault();
          $(".grtvideo-popup-close, .grtvideo-popup").click(function () {
            $(".grtvideo-popup").remove();
          });
        });

        $(document).keyup(function (event) {
          if (event.keyCode == 27) {
            $(".grtvideo-popup").remove();
          }
        });
      });
    };
  }(jQuery));
});
document.addEventListener("DOMContentLoaded", () => {
  // Scroll
  $('.go_to').click(function () { // ловим клик по ссылке с классом go_to
    var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
    if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 50 }, 800); // анимируем скроолинг к элементу scroll_el
    }
    return false; // выключаем стандартное действие
  });
});
// document.addEventListener("DOMContentLoaded", () => {
//   $('.menu li a').click(function (event) {
//     $('.menu-btn').toggleClass('active');
//     $('.menu').toggleClass('active');
//     return false;
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  $('.item__link2').click(function (event) {
    $(this).css('display', 'none');
    $('.item__see').slideToggle();
    $('.about__content').addClass('opened');
    return false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  $('.about__link2').click(function (event) {
    $(this).css('display', 'none');
    $('.about__see2').slideToggle();
    $('.about__content').addClass('opened');
    return false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  $('.partners__link').click(function (event) {
    $(this).css('display', 'none');
    $('.partners__see').slideToggle();
    $('.about__content').addClass('opened');
    return false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  $('.partners__link2').click(function (event) {
    $(this).css('display', 'none');
    $('.partners__see2').slideToggle();
    $('.about__content2').addClass('opened');
    return false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  (function ($) {
    var elActive = '';
    $.fn.selectCF = function (options) {

      // option
      var settings = $.extend({
        color: "#888888", // color
        backgroundColor: "#FFFFFF", // background
        change: function () { }, // event change
      }, options);

      return this.each(function () {

        var selectParent = $(this);
        list = [],
          html = '';

        //parameter CSS
        var width = $(selectParent).width();

        $(selectParent).hide();
        if ($(selectParent).children('option').length == 0) { return; }
        $(selectParent).children('option').each(function () {
          if ($(this).is(':selected')) { s = 1; title = $(this).text(); } else { s = 0; }
          list.push({
            value: $(this).attr('value'),
            text: $(this).text(),
            selected: s,
          })
        })

        // style
        var style = " background: " + settings.backgroundColor + "; color: " + settings.color + " ";

        html += "<ul class='selectCF'>";
        html += "<li>";
        html += "<span class='arrowCF ion-chevron-right' style='" + style + "'></span>";
        html += "<span class='titleCF' style='" + style + "; width:" + width + "px'>" + title + "</span>";
        html += "<span class='searchCF' style='" + style + "; width:" + width + "px'><input style='color:" + settings.color + "' /></span>";
        html += "<ul>";
        $.each(list, function (k, v) {
          s = (v.selected == 1) ? "selected" : "";
          html += "<li value=" + v.value + " class='" + s + "'>" + v.text + "</li>";
        })
        html += "</ul>";
        html += "</li>";
        html += "</ul>";
        $(selectParent).after(html);
        var customSelect = $(this).next('ul.selectCF'); // add Html
        var seachEl = $(this).next('ul.selectCF').children('li').children('.searchCF');
        var seachElOption = $(this).next('ul.selectCF').children('li').children('ul').children('li');
        var seachElInput = $(this).next('ul.selectCF').children('li').children('.searchCF').children('input');

        // handle active select
        $(customSelect).unbind('click').bind('click', function (e) {
          e.stopPropagation();
          if ($(this).hasClass('onCF')) {
            elActive = '';
            $(this).removeClass('onCF');
            $(this).removeClass('searchActive'); $(seachElInput).val('');
            $(seachElOption).show();
          } else {
            if (elActive != '') {
              $(elActive).removeClass('onCF');
              $(elActive).removeClass('searchActive'); $(seachElInput).val('');
              $(seachElOption).show();
            }
            elActive = $(this);
            $(this).addClass('onCF');
            $(seachEl).children('input').focus();
          }
        })

        // handle choose option
        var optionSelect = $(customSelect).children('li').children('ul').children('li');
        $(optionSelect).bind('click', function (e) {
          var value = $(this).attr('value');
          if ($(this).hasClass('selected')) {
            //
          } else {
            $(optionSelect).removeClass('selected');
            $(this).addClass('selected');
            $(customSelect).children('li').children('.titleCF').html($(this).html());
            $(selectParent).val(value);
            settings.change.call(selectParent); // call event change
          }
        })

        // handle search 
        $(seachEl).children('input').bind('keyup', function (e) {
          var value = $(this).val();
          if (value) {
            $(customSelect).addClass('searchActive');
            $(seachElOption).each(function () {
              if ($(this).text().search(new RegExp(value, "i")) < 0) {
                // not item
                $(this).fadeOut();
              } else {
                // have item
                $(this).fadeIn();
              }
            })
          } else {
            $(customSelect).removeClass('searchActive');
            $(seachElOption).fadeIn();
          }
        })

      });
    };
    $(document).click(function () {
      if (elActive != '') {
        $(elActive).removeClass('onCF');
        $(elActive).removeClass('searchActive');
      }
    })
  }(jQuery));

  $(function () {
    var event_change = $('#event-change');
    $(".select").selectCF({
      change: function () {
        var value = $(this).val();
        var text = $(this).children('option:selected').html();
        console.log(value + ' : ' + text);
        event_change.html(value + ' : ' + text);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper(".swiper1", {
    spaceBetween: 0,
    slidesPerView: "1",
    loop: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination1",
      clickable: true,

    },
    navigation: {
      nextEl: ".swiper-button-next1",
      prevEl: ".swiper-button-prev1",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      1200: {
        spaceBetween: 0,
        slidesPerView: 1
      }
    }
  });
  var swiper2 = new Swiper(".swiper2", {
    spaceBetween: 20,
    slidesPerView: "2",
    loop: false,
    pagination: {
      el: ".swiper-pagination2",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next2",
      prevEl: ".swiper-button-prev2",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2
      }
    }
  });
  var swiper3 = new Swiper(".swiper3", {
    spaceBetween: 20,
    slidesPerView: "3",
    loop: false,
    pagination: {
      el: ".swiper-pagination3",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next3",
      prevEl: ".swiper-button-prev3",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 3
      }
    }
  });
  var swiper = new Swiper(".swiper4", {
    spaceBetween: 0,
    slidesPerView: "1",
    loop: false,
    pagination: {
      el: ".swiper-pagination4",
      clickable: true,

    },
    navigation: {
      nextEl: ".swiper-button-next4",
      prevEl: ".swiper-button-prev4",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      1200: {
        spaceBetween: 0,
        slidesPerView: 1
      }
    }
  });
  var swiper5 = new Swiper(".swiper5", {
    spaceBetween: 24,
    slidesPerView: "3",
    loop: false,
    pagination: {
      el: ".swiper-pagination5",
      clickable: true,

    },
    navigation: {
      nextEl: ".swiper-button-next5",
      prevEl: ".swiper-button-prev5",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 6,
        slidesPerView: 2
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 24,
        slidesPerView: 3
      }
    }
  });
  var swiper6 = new Swiper(".swiper_news", {
    slidesPerView: 3,
    grid: {
      rows: 2,
    },
    spaceBetween: 5,
    navigation: {
      nextEl: ".swiper-button-next_news",
      prevEl: ".swiper-button-prev_news",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 5,
        slidesPerView: 1,
        loop: true,
        grid: {
          rows: 1,
        },
      },
      767: {
        spaceBetween: 5,
        slidesPerView: 2
      },
      992: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3,
        grid: {
          rows: 2,
        },
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let menuBtn = document.querySelector('.menu-btn');
  let menu = document.querySelector('.menu');
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let menuBtn3 = document.querySelector('.menu-btn3');
  let menu3 = document.querySelector('.menu3');
  menuBtn3.addEventListener('click', function () {
    menuBtn3.classList.toggle('active');
    menu3.classList.toggle('active');
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup1
  let popupBg = document.querySelector('.popup__bg');
  let popup = document.querySelector('.popup');
  let openPopupButtons = document.querySelectorAll('.a1');
  let closePopupButton = document.querySelector('.close-popup');

  openPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg.classList.add('active');
      popup.classList.add('active');
    })
  });

  closePopupButton.addEventListener('click', () => {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg) {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });
  document.addEventListener('click', (e) => {
    if (e.target === popupBg) {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg3.classList.remove('active');
      popup3.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup2
  let popupBg2 = document.querySelector('.popup__bg2');
  let popup2 = document.querySelector('.popup2');
  let openPopupButtons2 = document.querySelectorAll('.i1');
  let closePopupButton2 = document.querySelector('.close-popup2');

  openPopupButtons2.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg2.classList.add('active');
      popup2.classList.add('active');
    })
  });

  closePopupButton2.addEventListener('click', () => {
    popupBg2.classList.remove('active');
    popup2.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg2) {
      popupBg2.classList.remove('active');
      popup2.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg2.classList.remove('active');
      popup2.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup3
  let popupBg3 = document.querySelector('.popup__bg3');
  let popup3 = document.querySelector('.popup3');
  let openPopupButtons3 = document.querySelectorAll('.i2');
  let closePopupButton3 = document.querySelector('.close-popup3');

  openPopupButtons3.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg3.classList.add('active');
      popup3.classList.add('active');
    })
  });

  closePopupButton3.addEventListener('click', () => {
    popupBg3.classList.remove('active');
    popup3.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg3) {
      popupBg3.classList.remove('active');
      popup3.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg3.classList.remove('active');
      popup3.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup4
  let popupBg4 = document.querySelector('.popup__bg4');
  let popup4 = document.querySelector('.popup4');
  let openPopupButtons4 = document.querySelectorAll('.i3');
  let closePopupButton4 = document.querySelector('.close-popup4');

  openPopupButtons4.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg4.classList.add('active');
      popup4.classList.add('active');
    })
  });

  closePopupButton4.addEventListener('click', () => {
    popupBg4.classList.remove('active');
    popup4.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg4) {
      popupBg4.classList.remove('active');
      popup4.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg4.classList.remove('active');
      popup4.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup5
  let popupBg5 = document.querySelector('.popup__bg5');
  let popup5 = document.querySelector('.popup5');
  let openPopupButtons5 = document.querySelectorAll('.i4');
  let closePopupButton5 = document.querySelector('.close-popup5');

  openPopupButtons5.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg5.classList.add('active');
      popup5.classList.add('active');
    })
  });

  closePopupButton5.addEventListener('click', () => {
    popupBg5.classList.remove('active');
    popup5.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg5) {
      popupBg5.classList.remove('active');
      popup5.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg5.classList.remove('active');
      popup5.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup6
  let popupBg6 = document.querySelector('.popup__bg6');
  let popup6 = document.querySelector('.popup6');
  let openPopupButtons6 = document.querySelectorAll('.i5');
  let closePopupButton6 = document.querySelector('.close-popup6');

  openPopupButtons6.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg6.classList.add('active');
      popup6.classList.add('active');
    })
  });

  closePopupButton6.addEventListener('click', () => {
    popupBg6.classList.remove('active');
    popup6.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg6) {
      popupBg6.classList.remove('active');
      popup6.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg6.classList.remove('active');
      popup6.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup7
  let popupBg7 = document.querySelector('.popup__bg7');
  let popup7 = document.querySelector('.popup7');
  let openPopupButtons7 = document.querySelectorAll('.i6');
  let closePopupButton7 = document.querySelector('.close-popup7');

  openPopupButtons7.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg7.classList.add('active');
      popup7.classList.add('active');
    })
  });

  closePopupButton7.addEventListener('click', () => {
    popupBg7.classList.remove('active');
    popup7.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg7) {
      popupBg7.classList.remove('active');
      popup7.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg7.classList.remove('active');
      popup7.classList.remove('active');
    }
  });
});
// document.addEventListener("DOMContentLoaded", () => {
//   let menuBtn2 = document.querySelector('.menu-btn2');
//   let menu2 = document.querySelector('.menu2');
//   menuBtn2.addEventListener('click', function () {
//     menuBtn2.classList.toggle('active');
//     menu2.classList.toggle('active');
//   });
// });
