'use strict';

// Модуль каталога
var catalog = (function($) {

    // Инициализация модуля
    function init() {
        _render();
    }
  function init_six() {
      _renders();
    }

    // Рендерим каталог
    function _render() {
        var template = _.template($('#catalog-template').html()),
            $goods = $('#js-catalogue-list');

        $.getJSON('data/goods.json', function(data) {
            $goods.html(template({goods: data}));
        });
    }
    



    // Экспортируем наружу
    return {
      init: init,
      init_six: init_six
        
    }
    
    function _renders() {
      var template = _.template($('#catalog-template').html()),
          $goods = $('#js-load-catalogue');

      $.getJSON('data/six.json', function(data) {
        $goods.html(template({goods: data}));
      });
    }
  
    
})(jQuery);