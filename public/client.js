//global io
let socket = io();

//Connexion de l'utilisateur:
$('#login form').submit(function (e, nb_user) {
    e.preventDefault();
    let user = {
        username : $('#login input').val().trim()
    };

    if (user.username.length > 0) { 
        socket.emit('user-login', user);
        $('body').removeAttr('id');
        $('#chat input').focus(); 
    }
});

//Envoi d'un message
$('#chat form').submit(function (e) {
    e.preventDefault();
    let message = {
        text : $('#m').val()
    };
    $('#m').val(''); 
    if (message.text.trim().length !== 0) { 
        socket.emit('chat-message', message);
    }
    $('#chat input').focus(); 
});

// Réception d'un message
socket.on('chat-message', function (message) {
    $('#messages').append($('<li>').html('<span class="username">' + message.username + '</span> ' + message.text));
});
 
socket.on('service-message', function (message) {
    $('#messages').append($('<li class="' + message.type + '">').html('<span class="info">information</span> ' + message.text));
});
