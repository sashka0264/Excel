/*
(Excel) Есть у нас класс Excel, который принимает ID === 'app' корневого 
'div'-а и обьект с массивом классов components. Он генерирует 'div' с классом 
'excel'. Затем, он перебирает переданный ему массив классов, генерирует на 
основе их 'div'-ы с классом Component.className (статическое свойство класса), 
помещает в них результат вызова инстансов класса component.toHTML и добавляет к 
'div'-у с классом 'excel'. Полученный в итоге 'div' с классом 'excel' он 
добавляет через appendChild к полученному на вход корневого 'div'-а 
с ID === 'app' в методе render. И навешивает в нем же обработчик событий на 
указанным Компонент (информация о событиях есть в самих компонентах).

(Header, Toolbar, Table, Formula) Второстепенные классы компонентов имеют
статическое className для создания корневого 'div' и метод toHTML, который 
вернет вложенные в этот корневой 'div' элементы в виде обычного HTML.

($) Вспомогательная функция $, которая возвращает инстанс класса Dom. Она
передает конструктору Dom selector либо в виде строки, либо уже реальный DOM 
элемент. Ее задача упрощать и сокращать работу с DOM элементами. Не более.

Структура наследований: Компонент => Dom => ExcelComponent => DomListener

(Отдельно по каждым из компонентов)
Внутри Table у нас есть метод init, вызов которого мы перехватываем из
Excel.render, чтобы сделать инстанс класса TableSelection и через него работать
с таблицей, а не просто навешивать классы и работать с реальным DOM-деревом. В
TableSelection мы храним выбранные ячейки
*/

import Excel from '@/components/excel/Excel';
import Header from '@/components/Header/Header';
import Toolbar from '@/components/Toolbar/Toolbar';
import Table from '@/components/Table/Table';
import Formula from '@/components/Formula/Formula';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {storage} from '@core/utils';
import {initialState} from '@/redux/initialState';
import './scss/index.scss';

const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
  storage('excel-state', state);
  console.log(state);
});

const excel = new Excel('#app', {
  components: [
    Header, 
    Toolbar, 
    Formula, 
    Table
  ],
  store
});

excel.render();
