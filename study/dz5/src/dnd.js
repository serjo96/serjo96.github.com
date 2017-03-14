/* ДЗ 5.2 - Div D&D */

/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом фона и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    var el = document.createElement('div');
    var rand = Math.floor(Math.random()*75)+25;
    var width = Math.round((window.innerWidth/100)*rand);
    var height = Math.round((window.innerHeight/100)*rand);
    var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    var left  = Math.round((window.innerWidth/100)*rand);
    var top  = Math.round((window.innerHeight/100)*rand);


    el.className += "draggable-div";
    el.style.width = width + "px";
    el.style.height = height + "px";
    el.style.background = color;
    el.style.position = "absolute";
    el.style.left = left + "px";
    el.style.top = top + "px";

    return el;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
