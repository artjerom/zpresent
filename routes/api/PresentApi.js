
function PresentApi() {}

// Поиск презентации по id
PresentApi.prototype.find = function (id) {};

// Вернуть все презентации
PresentApi.prototype.findAll = function () {
    return this.presentations
};

// Создание презентации
PresentApi.prototype.save = function (present) {};

// Удалить презентацию
PresentApi.prototype.remove = function (id) {};