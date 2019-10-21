'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../src/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ДЗ 5.1 - DOM Events', function () {
    describe('addListener', function () {
        it('должна добавлять обработчик событий элемента', function () {
            var target = document.createElement('div');
            var eventName = 'click';
            var passed = false;
            var fn = function fn() {
                return passed = true;
            };

            (0, _index.addListener)(eventName, target, fn);

            (0, _assert2.default)(!passed);
            target.dispatchEvent(new CustomEvent(eventName));
            (0, _assert2.default)(passed);
        });
    });

    describe('removeListener', function () {
        it('должна удалять обработчик событий элемента', function () {
            var target = document.createElement('div');
            var eventName = 'click';
            var passed = false;
            var fn = function fn() {
                return passed = true;
            };

            target.addEventListener(eventName, fn);

            (0, _index.removeListener)(eventName, target, fn);

            target.dispatchEvent(new CustomEvent(eventName));
            (0, _assert2.default)(!passed);
        });
    });

    describe('skipDefault', function () {
        it('должна добавлять такой обработчик, который предотвращает действие по умолчанию', function () {
            var target = document.createElement('div');
            var eventName = 'click';
            var result = void 0;

            (0, _index.skipDefault)(eventName, target);

            result = target.dispatchEvent(new CustomEvent(eventName, { cancelable: true }));
            (0, _assert2.default)(!result);
        });
    });

    describe('emulateClick', function () {
        it('должна эмулировать клик по элементу', function () {
            var target = document.createElement('div');
            var eventName = 'click';
            var passed = false;
            var fn = function fn() {
                return passed = true;
            };

            target.addEventListener(eventName, fn);

            (0, _index.emulateClick)(target);

            (0, _assert2.default)(passed);
        });
    });

    describe('delegate', function () {
        it('должна добавлять обработчик кликов, который реагирует только на клики по кнопкам', function () {
            var target = document.createElement('div');
            var eventName = 'click';
            var passed = false;
            var fn = function fn() {
                return passed = true;
            };

            target.innerHTML = '<div></div><a href="#"></a><p></p><button></button>';

            (0, _index.delegate)(target, fn);

            (0, _assert2.default)(!passed);
            target.children[0].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
            (0, _assert2.default)(!passed);
            target.children[1].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
            (0, _assert2.default)(!passed);
            target.children[2].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
            (0, _assert2.default)(!passed);
            target.children[3].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
            (0, _assert2.default)(passed);
        });
    });

    describe('once', function () {
        it('должна добавлять обработчик кликов, который сработает только один раз и удалится', function () {
            var target = document.createElement('div');
            var eventName = 'click';
            var passed = 0;
            var fn = function fn() {
                return passed++;
            };

            (0, _index.once)(target, fn);

            _assert2.default.equal(passed, 0);
            target.dispatchEvent(new CustomEvent(eventName));
            _assert2.default.equal(passed, 1);
            target.dispatchEvent(new CustomEvent(eventName));
            _assert2.default.equal(passed, 1);
            target.dispatchEvent(new CustomEvent(eventName));
        });
    });
});
//# sourceMappingURL=1-index.js.map