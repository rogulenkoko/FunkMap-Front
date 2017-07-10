# Funkmap-front
### Клиентская сторона проекта
### Технологии: Angular, TypeScript, SASS, HTML5

Ссылка на макеты: https://drive.google.com/drive/folders/0B3VWeKEo7dyydktxRUdYX2V4Sm8

Демо (без сервера): https://funkmap-fake.azurewebsites.net/

Реализовано:

1.  Карта, маркеры сохраненных объектов + объединение их в кластеры

2.  Боковая панель 
    - настройки
    - кнопка добавления сущности (если пользователь авторизован)

3.  Настройки 
    - настройка языка
    - типа карты
    
    todo выбор типа отображения : список/карта

4. Навигационная панель 
    - заголовок (при клике переходит на начальную страницу)
    - показать всех (при нажатой выдает все сущности, при не нажатой выдает ближайших в радиусе 1 градуса)
    - регистрация (пользователь неавторизован)
    - вход (пользователь неавторизован)
    - аватар пользователя (если нет фото, то дефолтная картинка)
    - выпадающий список, содержащий элементы Настройки, Смена автара, Выход

5. Страница музыканта (на главной)
    - боковая панель, возникающая при клике на маркер
    - отображение фото музыканта (если нет фото, то дефолтная картинка)
    - данные о музыканте (дата рождения, возраст, пол, опыт(фейковое значение), музыкальные стили, соц. сети)
    
    todo подумать какие поля стоит добавить для музыканта и какие стоит отображать в этой панели
6. Страница группы (на главной)
    - боковая панель, возникающая при клике на маркер
    - отображение фото группы (если нет фото, то дефолтная картинка)
    - данные о группе (ссылки на музыкантов состоящих в группе)
    todo подумать какие поля стоит добавить для группы и какие стоит отображать в этой панели

7. Регистрация
    - модальное окно, возникающее при клике на кнопку "Регистрация" на навигационной панели 
    - ввод логина, пароля (валидация полей)
    - ввод email, получение кода подтверждения по email (валидация полей)
    - окно успешной регистрации
8. Логин
    - модальное окно, возникающее при клике на кнопку "Вход" на навигационной панели 
    - ввод логина, пароля (валидация полей)
9. Аватар
    - модальное окно, возникающее при клике на кнопку "Сменить автар" из выпадающего списка на навигационной панели 
    - загрузка фотографии из файловой системы, ее сохранение 
    
    todo макет
  
9. Страница создания музыканта
    - страница, возникающая при клике на иконку плюса на боковой панели
    - заполнение полей, загрузка фотографии, выбор инструмента
    - отметка на карте локации музыканта, сохранение
    
    todo макет

Для установки необходимы Node.js, npm, angular-cli.

1.  Клонировать репозиторий
2.  Выполнить npm install
3.  Выполнить ng serve
4.  Для свзяи с <a href="https://github.com/rogulenkoko/funkmap-back">бекендом</a> заменить в файле environment.ts поле production на true или на предыдущем шаге выполнить ng serve --prod
