# Mirs Test V2

Это второе тестовое задание. Как и в первой реализации, для запуска приложения можно использовать содержимое папки dist, и весь код можно найти в папке src. Это то, что касается front-end.

В качестве back-end использую [json-server](https://github.com/typicode/json-server). (Он ужасен, но как имитация back-end сойдёт).
Для его запуска необходимо установить npm модули `npm install` находясь в директории проекта, 
затем запустить сервер командой: 

```

	npm run db

```

Таким образом хранимые данные будут обрабатываться при помощи файла db.json, который находится в корне папки.

Далее можно запустить локальный сервер с помощью стандартной команды:

```

	ng serve

```

После чего по адресу http://127.0.0.1:4200/ через пару минут будет доступен проект, либо же я оставлю уже сбилденную версию в папке dist,
предполагаю, что она так же должна работать.

Данная реализация тестового задания на мой взгляд не является полноценной, и выполнена лишь на минимум в плане
поставленных задач.

Все недочёты можем обсудить лично, много чего не сделал из дополнительного, зачастую в реальных проектах, необходимого функционала.

Снизу оставляю стандартное описание файла readme от angular-cli

## Default information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
