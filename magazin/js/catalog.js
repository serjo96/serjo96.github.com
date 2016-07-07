'use strict';

// Модуль каталога
var catalog = (function($) {

    // Инициализация модуля
    function init() {
        _render();
    }

    // Рендерим каталог
    function _render() {
        var template = _.template($('#catalog-template').html()),
            $goods = $('#js-catalohue-list');

        $.getJSON('data/goods.json', function(data) {
            $goods.html(template({goods: data}));
        });
    }


    // Экспортируем наружу
    return {
        init: init
    }
    
})(jQuery);