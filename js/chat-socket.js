$(function () {
    var socket = io();
    $('.chat-form').submit(function(){
        var chatInput = $(this).find('.chat-input');
        socket.emit('chat message', chatInput.val());
        chatInput.val();
        return false;
    });
    socket.on('chat message', function(msg){
        $('.chat-texts').append($('<div>').text(msg));
    });
});