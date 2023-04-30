export function initChatRoomImgComponent() {

    const chatRoomImg = require("url:../img/chat-image.png");

    class ChatroomImg extends HTMLElement {
        constructor() {
            super();
            this.render()
        }
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const div = document.createElement('div');
            div.className = "chatRoomImg";
            div.innerHTML = `
              <img class="chat-img" src="${chatRoomImg}">
            `;

            const style = document.createElement('style');

            style.innerHTML = `
            .chatRoomImg{
                display: flex;
            }
            .chat-img{
                height: 43px;
                width: 43px;
            }
          `;

            shadow.appendChild(div);
            shadow.appendChild(style);
        };
    };
    customElements.define('custom-chatroom-img', ChatroomImg);
}