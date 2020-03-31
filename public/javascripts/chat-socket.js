(function() {
    //make connection
    const socket = io.connect(window.location.host);

    //buttons and inputs
    const chatStorage = localStorage.getItem('chat');
    const usernameRegisterButton = $('#chat__username_save');
    const message = $('#chat__message_input');
    const send_message = $('#chat__message_send');
    const chatroom = $('#chat__room');
    const feedback = $('#chat__feedback');
    const usersList = $('#chat__users_list');

    //checking chat storage
    if (!chatStorage) {
        usernameRegisterButton.click(() => socket.emit('username_register', { username : $('#chat__username_input').val() }));
    } else {
        socket.emit('username_register', { username : JSON.parse(chatStorage).username });
    }

    //Listen on users connected
    socket.on('user_connected', (data) => {
        usersList.html('');
        data['users'].forEach(user => {
            usersList.append(`<p id="chat__username"><i class="far fa-user"></i> ${ user }</p>`)
        });

        $('#chat__username').html(`<span class="badge badge-success">Admin</span> ${ data['users'][0] }`)
    });

    //Emit message
    send_message.click(() => socket.emit('new_message', { message : message.val() }));

    //Listen on new_message
    socket.on('new_message', (data) => {
        feedback.html('');
        message.val('');
        chatroom.append(`<p class="message"><span class="badge badge-primary mr-1">${ data.username }</span> ${ data.message }</p>`)
    });

    //Emit typing
    message.bind('keypress', () => socket.emit('typing'));

    //Listen on typing
    socket.on('typing', (data) => feedback.html(`<p id="chat__feedback_msg"><i> ${ data.username } is typing a message...</i></p>`))

    //Listen on user disconnected
    socket.on('user_disconnected', (data) => {
        usersList.html('');
        data['users'].forEach(user => {
            usersList.append(`<p id="chat__username">${user}</p>`);
        });

        $('#chat__username').html(`${ data['users'][0] } <span class="badge badge-success">Admin</span>`)
    });

    if (chatStorage) {
        //Listen on user delete
        socket.on(JSON.parse(chatStorage).username + '_delete', (data) => {
            console.log('delete event - ', data);
            localStorage.removeItem('chat');

            setTimeout(() => window.location.reload(), 2000)
        });

        //Listen admin event
        socket.on(JSON.parse(chatStorage).username, (data) => {
            usersList.html('');
            data['users'].forEach(user => {
                usersList.append(`<p id="chat__username"><i class="far fa-user"></i> ${ user } <span class="chat__delete_user" ><i id="chat__delete_user" class="fas fa-times text-danger" data-user="${ user }"></i></span> </p>`)
            });

            $('#chat__username').html(`<span class="badge badge-success">Admin</span> ${ data['users'][0] }`)
        });
    }

    //Listen after user delete
    socket.on('after_delete', (data) => {
        feedback.html(`<p id="chat__feedback_msg">Admin deleted user "${ data['user'] }" with reason: <i>${ data['reason'] }</i></p>`);
        feedback.html('');
    });

    document.addEventListener('DOMContentLoaded', () => {
        const usernameRegisterModal = document.getElementById('chat__username_signup');
        const usernameRegisterInput = document.getElementById('chat__username_input');
        const usernameRegisterButton = document.getElementById('chat__username_save');

        //remove all data and reload page
        document.getElementById('chat__clear_confirm_button').onclick = () => {
            socket.emit('disconnected', JSON.parse(localStorage.getItem('chat')).username);
            localStorage.removeItem('chat');

            document.location.reload();
        };

        //check for username register
        if (!localStorage.getItem('chat') || !JSON.parse(localStorage.getItem('chat')).register) {
            //show username register modal
            $(usernameRegisterModal).modal({ backdrop: 'static'}, 'show');

            //toggle save button disabled attribute
            usernameRegisterInput.oninput = event => event.target.value.length > 0 ? usernameRegisterButton.removeAttribute('disabled') : usernameRegisterButton.setAttribute('disabled', 'disabled');

            usernameRegisterButton.onclick = () => {
                //save storage value
                localStorage.setItem('chat', JSON.stringify({ register: true, username: usernameRegisterInput.value }))

                //hide modal
                $(usernameRegisterModal).modal('hide');
            }
        }

        //check message input and toogle send button disabled attribute
        document.getElementById('chat__message_input').oninput = event => event.target.value.length > 0 ? document.getElementById('chat__message_send').removeAttribute('disabled') : document.getElementById('chat__message_send').setAttribute('disabled', 'disabled');

        //delete user
        document.onclick = event => {
            if (event.target.parentElement.id === 'chat__delete_user') {
                let username = event.target.parentElement.dataset.user;
                let userRecord = event.target.parentElement.parentElement.parentElement;

                $('#chat__delete_user_confirm').modal('show');

                document.getElementById('chat__delete_user_reason').oninput = event => event.target.value.length > 0 ? document.getElementById('chat__delete_user_button').removeAttribute('disabled') : document.getElementById('chat__delete_user_button').setAttribute('disabled', 'disabled');

                document.getElementById('chat__delete_user_button').onclick = () => {
                    document.getElementById('chat__delete_user_reason').value = '';
                    document.getElementById('chat__delete_user_button').setAttribute('disabled', 'disabled');
                    $('#chat__delete_user_confirm').modal('hide');
                    userRecord.remove();

                    socket.emit('user_delete', { user: username, reason:  $('#chat__delete_user_reason').val() });
                };
            }
        };

    });
})();
