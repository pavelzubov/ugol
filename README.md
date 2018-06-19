# Тестовое задание Ugol

Потестировать тут: https://ugol.herokuapp.com/

## Задание:
Дано: магазины продают одинаковую краску, фасованную в банки по 5, 10, 15 и 40 литров. У каждого 
магазина своя цена на каждую тару.
Необходимо реализовать расчет подбора необходимого количества краски для определенной 
площади.
Пользователь указывает площадь поверхности требующей покраски — система должна подобрать 
оптимальный набор банок для покраски данной площади. Важно: подбирается набор c минимальной 
стоимостью, а все товары набора необходимо купить у одного поставщика.
Пример данных:
{
expenditure: 0.4, // расход литров на метр квадратный
materials : {
1: 5, // id товара : объем в упаковке (id=1: 5 литров)
2: 10,
67: 15,768
34: 40
},
prices: {
1: { // id товара
3:120, // id поставщика: цена за упаковку
5:123.45,
49:135
},
// …
}

## Требования к результату:
### Уровень Start:
1. Использовать последний Angular stable
2. Интерфейс, в котором есть инпут для ввода площади и загрузки файла JSON c набором данных.
После ввода значения площади отобразить перечень товаров, которые закрывают указанную площадь 
поверхности, имя поставщика и суммарную стоимость заказа. 
Плюсом будет вывести объем краски, который останется после покраски.
3. Сделать обработку ошибок. (некорректно введенная пользователем площадь, некорректная цена в 
json и дальше на вкус)
### Уровень Medium:
1. Интерфейс с авторизацией, страница с интерфейсом из уровня Start доступна только 
авторизованному пользователю.
2. Интерфейс, в котором после ввода данных отобразить отсортированный список магазинов по 
суммарной стоимости заказа. Каждая строка в этом списке содержит перечень товаров, которые 
закрывают указанную площадь поверхности, имя поставщика и суммарную стоимость заказа. 
### Уровень Hardcore:
1. Реализовать алгоритм решения, который учитывает, что площадь может быть бесконечно большим 
числом, например 999 999 999 999 999 999 999 кв. метров.
2. Использовать Angular Universa

## Комментарии

Логин/пароль для входа - test/test.

Аутентификация проходит через простое сравнение с локальной переменной. Можно было бы реализовать через подключение к какому-нибудь ресурсу, но сейчас у меня особо нет на это времени.
Заменил в json-файле названия материалов и фирм на более приятные глазу.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

