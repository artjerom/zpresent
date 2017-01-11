/**
 * Created by fred on 11.01.17.
 */
$(function () {

    Reveal.initialize({
        history: true
    });

    var socket = io();

    // Меняем слайд
    var check = false;

    $(window).on('hashchange', function () {
        if (check) {
            return;
        }

        var hash = window.location.hash;

        socket.emit('change-slide', {
            hash: hash
        });
    });

    socket.on('nav', function (data) {
        window.location.hash = data.hash;

        check = true;

        setInterval(function () {
            check = false;
        }, 100);
    });

});