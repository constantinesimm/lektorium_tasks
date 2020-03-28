(function(){
    document.addEventListener('DOMContentLoaded', () => {
        const usernameRegisterModal = document.getElementById('chat__username_signup');
        const usernameRegisterInput = document.getElementById('chat__username_input');
        const usernameRegisterButton = document.getElementById('chat__username_save');

        //remove all data and reload page
        document.getElementById('chat__clear_confirm_button').onclick = () => {
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
    });
})();