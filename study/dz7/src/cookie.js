/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
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
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');




/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */


/**
 * Создает новый tr для таблицы со списком cookie
 *
 * @param name - имя cookie
 * @param value - значение cookie
 */
function createCookieTr(name, value) {
    var str = document.createElement('tr');
    var tdName = document.createElement('td');
    var tdValue = document.createElement('td');
    var tdDelete = document.createElement('td');
    var btnDelite = document.createElement('button');



    var filtr = filterNameInput.value;
   if (isMatching(name,filtr) || isMatching (value,filtr)){
       tdName.textContent = name;
       tdValue.textContent = value;
       btnDelite.textContent = 'Удалить cookie';
       btnDelite.className = 'delete';
       btnDelite.dataset.name = name;
       tdDelete.appendChild(btnDelite);

       str.appendChild(tdName);
       str.appendChild(tdValue);
       str.appendChild(tdDelete);
       listTable.appendChild(str);
   } else if(filtr.length == 0){
        tdName.textContent = name;
        tdValue.textContent = value;
        btnDelite.textContent = 'Удалить cookie';
        btnDelite.className = 'delete';
        btnDelite.dataset.name = name;
        tdDelete.appendChild(btnDelite);

        str.appendChild(tdName);
        str.appendChild(tdValue);
        str.appendChild(tdDelete);
        listTable.appendChild(str);
    }

}


function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();
    if (full.indexOf(chunk) == -1) {
        return false;
    } else {
        return true;
    }
}

function allCookie () {
    listTable.innerHTML = '';
    var arrCookie = getCookie();
    for(var i in arrCookie){
        createCookieTr( i , arrCookie[i]);
    }


}


function createCookie(name, value) {
    document.cookie = name + '=' + value;
}

function deleteCookie(name) {
    var now = new Date(0);
    document.cookie = name + '=;' + "expires=" + now.toUTCString();
}


function getCookie () {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

function refresh (string) {
     string.childNodes[1].innerHTML = addValueInput.value;
}


function filterCheck () {
    var filtr = filterNameInput.value;
    for(var i = 0; i<listTable.childNodes.length; i++){
        if( isMatching(listTable.childNodes[i].firstChild.innerHTML,filtr) ||  isMatching(listTable.childNodes[i].childNodes[1].innerHTML,filtr)) {
        }else{
            console.log(listTable.childNodes[i])
            listTable.childNodes[i].remove();
        }

    }
    console.log('work')
}

filterNameInput.addEventListener('keyup', function() {
    allCookie();
    filterCheck();

});

addButton.addEventListener('click', () => {
    createCookie(addNameInput.value, addValueInput.value);
    for(var i = 0; i<listTable.childNodes.length; i++){
        if(listTable.childNodes[i].firstChild.innerHTML == addNameInput.value){
            refresh(listTable.childNodes[i]);
            filterCheck ();
            return;
        }
    }
    createCookieTr(addNameInput.value, addValueInput.value);
});

document.addEventListener('DOMContentLoaded', function () {
    allCookie();
});


listTable.addEventListener('click', (e) => {
console.log(listTable.children.length);
console.log(listTable.children)
    if (e.target.className.indexOf('delete') > -1) {
        deleteCookie(e.target.dataset.name);
        e.target.parentNode.parentNode.remove();
    }
});

