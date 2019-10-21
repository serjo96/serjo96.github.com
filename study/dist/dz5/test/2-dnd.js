'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = require('../dnd-content.hbs');

describe('ДЗ 5.2 - Div D&D', function () {
    var homeworkContainer = document.createElement('div');
    var addDivButton = void 0;
    var dndPage = void 0;

    homeworkContainer.id = 'homework-container';
    homeworkContainer.innerHTML = template();
    document.body.appendChild(homeworkContainer);
    dndPage = require('../src/dnd');

    describe('Функциональное тестирование', function () {
        describe('createDiv', function () {
            it('должна создавать div с произвольными размерами/позицией/цветом', function () {
                var result = dndPage.createDiv();

                (0, _assert2.default)(result instanceof Element, 'не элемент');
                _assert2.default.equal(result.tagName, 'DIV', 'имя тега не DIV');
                _assert2.default.notEqual(result.style.backgroundColor || result.style.background, '', 'не указан цвет фона');
                _assert2.default.notEqual(result.style.top, '', 'не указана позиция по оси Y');
                _assert2.default.notEqual(result.style.left, '', 'не указана позиция по оси X');
                _assert2.default.notEqual(result.style.width, '', 'не указана ширина');
                _assert2.default.notEqual(result.style.height, '', 'не указана высота');
            });
        });
    });

    describe('Интеграционное тестирование', function () {
        it('на старнице должна быть кнопка с id addDiv', function () {
            addDivButton = homeworkContainer.querySelector('#addDiv');
            (0, _assert2.default)(addDivButton instanceof Element, 'не элемент');
            _assert2.default.equal(addDivButton.tagName, 'BUTTON', 'имя тега не BUTTON');
        });

        it('создавать div с классом draggable-div при клике на кнопку', function () {
            var divsCount = homeworkContainer.querySelectorAll('.draggable-div').length;
            var newDivsCount = void 0;

            addDivButton.dispatchEvent(new MouseEvent('click', { view: window }));
            newDivsCount = homeworkContainer.querySelectorAll('.draggable-div').length;

            _assert2.default.equal(newDivsCount - divsCount, 1);
        });
    });
});
//# sourceMappingURL=2-dnd.js.map