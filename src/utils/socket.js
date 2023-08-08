class Socket {
    constructor(url, customOnOpen, customOnClose, customOnMessage, protocols = []){
        this.url = url;
        this.connected = false;

        this.customOnOpen = customOnOpen;
        this.customOnClose = customOnClose;
        this.customOnMessage = customOnMessage;
        
        this.socketObj = new WebSocket(url, protocols);
        this.socketObj.onopen = () => this.onOpen();
        this.socketObj.onclose = e => this.onClose(e);
        this.socketObj.onmessage = (message) => this.onMessage(message);
        this.socketObj.onerror = e => console.log(e);
    }

    onOpen() {
        console.log('SOCKET OPEN', this.url);

        this.connected = true;

        this.customOnOpen();
    }
    onClose(e) {
        // console.log('SOCKET CLOSE', e);
        console.log('SOCKET CLOSE');

        this.connected = false;

        this.customOnClose();
    }
    onMessage(message) {
        message = JSON.parse(message.data);

        this.customOnMessage(message);
    }
 
    close(){
        this.socketObj?.close();
    }
    send(action, data = {}) {
        var dataToSend = {
            'type': 'request',
            'data': Object.assign({}, {
                'action': action,
            }, data)
        };

        this.socketObj.send(JSON.stringify(dataToSend));
    }
}

export default Socket;