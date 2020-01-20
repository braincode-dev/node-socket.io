$(document).ready(() => {
    const socket = io.connect()
    const nickname = $('.login-form #nickname')
    const loginForm = $('.login-form')
    const messageForm = $('.message-form')
    const userList = $('.user-list')
    const userUl = $('.user-list > ul')
    const messagesList = $('.messages-list')
    const message = $('.message')
    const newMessages = $('.new-messages')
    

    loginForm.submit((e) => {
        e.preventDefault()
        socket.emit('login', nickname.val())
    })

    messageForm.submit((e) => {
        e.preventDefault()
        socket.emit('messages', message.val())
        message.val('')
    })

    // listeners
    socket.on('login', (data) => {
        if(data.status === 'OK'){
            loginForm.hide()
            messageForm.removeClass('d-none')
            userList.removeClass('d-none')
            messagesList.removeClass('d-none')
        }
    })

    socket.on('new message', (data) => {
        let newMsg = `
            <div class="card mb-3">
                <div class="card-body">
                    ${data.message}
                </div>
                <p class="pl-4 pr-4 pb-2 text-secondary">${data.nickname} <span class="ml-3">${data.time}</span></p>
            </div>`
        newMessages.append(newMsg)
    })

    socket.on('users', (data) => {
        userList.children('ul').html('')
        for (let index = 0; index < data.users.length; index++) {
            const user = `<li class="list-group-item">${data.users[index]}</li>`
            userList.children('ul').append(user)
        }
    })

})