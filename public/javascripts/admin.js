/**
 * Created by fred on 11.01.17.
 */

$(function () {

    // Меню
    var page = location.pathname.split("/")[2];
    if (typeof (page) === typeof (undefined)) {
        $($('#jsMenu > .item')[0]).addClass('active');
    } else {
        $('#jsMenu').find('a[href="/admin/'+ page +'"]').addClass('active');
    }

    $('#addSlide').on({
        'click': function () {
            $('#modalAddSlide').show();
        }
    });

    // Вывод изображений
    function handleFileSelect(ev) {
        var files = ev.target.files;

        for (var i = 0, f; f = files[i]; i++) {

            if (!f.type.match('image.*')) {
                continue;
            }

            var rd = new FileReader();

            rd.onload = (function (file) {
                return function (e) {
                    var li = document.createElement('li');
                    li.innerHTML = ['<img class="thumb" src="', e.target.result,
                        '" title="', file.name, '"/>'].join('');
                    document.getElementById('jsImages').insertBefore(li, null);
                };
            })(f);

            rd.readAsDataURL(f);
        }
    }

    // Отслеживаем изменение upImages
    if ($('*').is('#upImages')) {
        document.getElementById('upImages').addEventListener('change', handleFileSelect, false);
    }

});