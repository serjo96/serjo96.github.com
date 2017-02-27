'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('../src/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ДЗ 4 - Работа с DOM', function () {
    describe('createDivWithText', function () {
        it('должна возвращать элемент с тегом DIV', function () {
            var text = 'привет!';
            var result = (0, _index.createDivWithText)(text);

            (0, _assert2.default)(result instanceof Element);
            _assert2.default.equal(result.tagName, 'DIV');
        });

        it('должна добавлять текст в элемент', function () {
            var text = 'привет!';
            var result = (0, _index.createDivWithText)(text);

            _assert2.default.equal(result.innerText, text);
        });
    });

    describe('createAWithHref', function () {
        it('должна возвращать элемент с тегом A', function () {
            var href = 'http://loftschool.com';
            var result = (0, _index.createAWithHref)(href);

            (0, _assert2.default)(result instanceof Element);
            _assert2.default.equal(result.tagName, 'A');
        });

        it('должна добавлять атрибут href', function () {
            var href = 'http://loftschool.com';
            var result = (0, _index.createAWithHref)(href);

            _assert2.default.equal(result.getAttribute('href'), href);
        });
    });

    describe('prepend', function () {
        it('должна добавлять элемента в начало', function () {
            var where = document.createElement('div');
            var what = document.createElement('p');

            where.innerHTML = ', <b>loftschool</b>!';
            what.innerText = 'привет';

            (0, _index.prepend)(what, where);

            _assert2.default.equal(where.firstChild, what);
            _assert2.default.equal(where.innerHTML, '<p>привет</p>, <b>loftschool</b>!');
        });
    });

    describe('findAllPSiblings', function () {
        it('должна возвращать массив с элементами, соседями которых являются P', function () {
            var where = document.createElement('div');
            var result = void 0;

            where.innerHTML = '<div></div><p></p><span></span><span></span><p></p>';
            result = (0, _index.findAllPSiblings)(where);

            (0, _assert2.default)(Array.isArray(result));
            _assert2.default.deepEqual(result, [where.children[0], where.children[3]]);
        });
    });

    describe('findError', function () {
        it('должна возвращать массив из текстового содержимого элементов', function () {
            var where = document.createElement('div');
            var result = void 0;

            where.innerHTML = ' <div>привет</div>, <div>loftschool</div>!!!';
            result = (0, _index.findError)(where);

            (0, _assert2.default)(Array.isArray(result));
            _assert2.default.deepEqual(result, ['привет', 'loftschool']);
        });
    });

    describe('deleteTextNodes', function () {
        it('должна удалить все текстовые узлы', function () {
            var where = document.createElement('div');

            where.innerHTML = ' <div></div>привет<p></p>loftchool!!!';
            (0, _index.deleteTextNodes)(where);

            _assert2.default.equal(where.innerHTML, '<div></div><p></p>');
        });
    });

    describe('deleteTextNodesRecursive', function () {
        it('должна рекурсивно удалить все текстовые узлы', function () {
            var where = document.createElement('div');

            where.innerHTML = '<span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>';
            (0, _index.deleteTextNodesRecursive)(where);

            _assert2.default.equal(where.innerHTML, '<span><div><b></b></div><p></p></span>');
        });
    });

    describe('collectDOMStat', function () {
        it('должна вернуть статистику по переданному дереву', function () {
            var where = document.createElement('div');
            var stat = {
                tags: { DIV: 1, B: 2 },
                classes: { 'class-1': 2, 'class-2': 1 },
                texts: 3
            };
            var result = void 0;

            where.innerHTML = '<div class="class-1"><b>привет!</b> <b class="class-1 class-2">loftschool</b></div>';
            result = (0, _index.collectDOMStat)(where);
            _assert2.default.deepEqual(result, stat);
        });
    });

    describe('observeChildNodes', function () {
        it('должна вызывать fn при добавлении элементов в указанный элемент', function (done) {
            var where = document.createElement('div');
            var fn = function fn(info) {
                (0, _assert2.default)((typeof info === 'undefined' ? 'undefined' : (0, _typeof3.default)(info)) == 'object' && info, 'info должен быть объектом');
                _assert2.default.equal(info.type, targetInfo.type, 'info.type \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0440\u0430\u0432\u0435\u043D ' + targetInfo.type);
                (0, _assert2.default)(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                _assert2.default.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                targetInfo.nodes.forEach(function (n) {
                    return (0, _assert2.default)(info.nodes.indexOf(n) > -1, 'некорректный элемент в info.nodes');
                });
                done();
            };
            var elementToInsert = document.createElement('div');
            var targetInfo = {
                type: 'insert',
                nodes: [elementToInsert]
            };

            document.body.appendChild(where);

            (0, _index.observeChildNodes)(where, fn);
            where.appendChild(elementToInsert);

            document.body.removeChild(where);
        });

        it('должна вызывать fn при добавлении множества элементов в указанный элемент', function (done) {
            var where = document.createElement('div');
            var fn = function fn(info) {
                (0, _assert2.default)((typeof info === 'undefined' ? 'undefined' : (0, _typeof3.default)(info)) == 'object' && info, 'info должен быть объектом');
                _assert2.default.equal(info.type, targetInfo.type, 'info.type \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0440\u0430\u0432\u0435\u043D ' + targetInfo.type);
                (0, _assert2.default)(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                _assert2.default.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                targetInfo.nodes.forEach(function (n) {
                    return (0, _assert2.default)(info.nodes.indexOf(n) > -1, 'некорректный элемент в info.nodes');
                });
                done();
            };
            var elementToInsert1 = document.createElement('div');
            var elementToInsert2 = document.createElement('div');
            var elementToInsert3 = document.createElement('div');
            var targetInfo = {
                type: 'insert',
                nodes: [elementToInsert1, elementToInsert2, elementToInsert3]
            };
            var fragment = new DocumentFragment();

            document.body.appendChild(where);

            fragment.appendChild(elementToInsert1);
            fragment.appendChild(elementToInsert2);
            fragment.appendChild(elementToInsert3);

            (0, _index.observeChildNodes)(where, fn);
            where.appendChild(fragment);

            document.body.removeChild(where);
        });

        it('должна вызывать fn при удалении элементов из указанного элемента', function (done) {
            var where = document.createElement('div');
            var fn = function fn(info) {
                (0, _assert2.default)((typeof info === 'undefined' ? 'undefined' : (0, _typeof3.default)(info)) == 'object' && info, 'info должен быть объектом');
                _assert2.default.equal(info.type, targetInfo.type, 'info.type \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0440\u0430\u0432\u0435\u043D ' + targetInfo.type);
                (0, _assert2.default)(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                _assert2.default.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                targetInfo.nodes.forEach(function (n) {
                    return (0, _assert2.default)(info.nodes.indexOf(n) > -1, 'некорректный элемент в info.nodes');
                });
                done();
            };
            var elementToRemove = document.createElement('div');
            var targetInfo = {
                type: 'remove',
                nodes: [elementToRemove]
            };

            document.body.appendChild(where);

            where.appendChild(elementToRemove);
            (0, _index.observeChildNodes)(where, fn);
            where.removeChild(elementToRemove);

            document.body.removeChild(where);
        });

        it('должна вызывать fn при удалении множества элементов из указанного элемента', function (done) {
            var where = document.createElement('div');
            var fn = function fn(info) {
                (0, _assert2.default)((typeof info === 'undefined' ? 'undefined' : (0, _typeof3.default)(info)) == 'object' && info, 'info должен быть объектом');
                _assert2.default.equal(info.type, targetInfo.type, 'info.type \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0440\u0430\u0432\u0435\u043D ' + targetInfo.type);
                (0, _assert2.default)(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                _assert2.default.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                targetInfo.nodes.forEach(function (n) {
                    return (0, _assert2.default)(info.nodes.indexOf(n) > -1, 'некорректный элемент в info.nodes');
                });
                done();
            };
            var elementToRemove1 = document.createElement('div');
            var elementToRemove2 = document.createElement('div');
            var elementToRemove3 = document.createElement('div');
            var targetInfo = {
                type: 'remove',
                nodes: [elementToRemove1, elementToRemove2, elementToRemove3]
            };

            document.body.appendChild(where);

            where.appendChild(elementToRemove1);
            where.appendChild(elementToRemove2);
            where.appendChild(elementToRemove3);

            (0, _index.observeChildNodes)(where, fn);
            where.innerHTML = '';

            document.body.removeChild(where);
        });
    });
});
//# sourceMappingURL=index.js.map