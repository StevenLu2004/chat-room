var socket = null;
var vmChat = null;

window.onload = function() {
    socket = io();
    socket.on('message', (msg) => {
        vmChat.recv(JSON.parse(msg));
    });
    vmChat = new Vue({
        el: '#chat',
        data: {
            messages: [],
            newMessage: ""
        },
        methods: {
            send: function(event) {
                // No reload
                event.preventDefault();
                // No sending empty messages
                if (this.newMessage !== "") {
                    // Send back non-empty message with Socket.IO
                    socket.emit('message', JSON.stringify({
                        type: 'message',
                        content: this.newMessage
                    }));
                    // Clear message input box
                    this.newMessage = "";
                    // Scroll message input box into view
                    document.getElementsByTagName('input')[0].scrollIntoView();
                }
            },
            recv: function(msg) {
                this.messages.push(msg);
                document.getElementsByTagName('input')[0].scrollIntoView();
            }
        }
    });
};
