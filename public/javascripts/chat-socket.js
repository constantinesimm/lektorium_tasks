(function() {
    //make connection
    const socket = io.connect(`${document.location.hostname}:3003`);

    //buttons and inputs
    const chatStorage = localStorage.getItem('chat');
    const usernameRegisterButton = $('#chat__username_save');
    const message = $('#chat__message_input');
    const send_message = $("#chat__message_send");
    const chatroom = $("#chat__room");
    const feedback = $("#chat__feedback");

    //checking chat storage
    if (!chatStorage) {
        usernameRegisterButton.click(function(){
            socket.emit('username_register', { username : $('#chat__username_input').val() })
        });
    } else {
        socket.emit('username_register', { username : JSON.parse(chatStorage).username })
    }


    //Emit message
    send_message.click(function(){
        socket.emit('new_message', {message : message.val()})
    });

    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + "<span class='badge badge-primary mr-1'>" + data.username + "</span>" + data.message + "</p>")
    });

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing');
    });

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p id='chat__feedback_msg'><i>" + data.username + " is typing a message..." + "</i></p>")
    })
})();