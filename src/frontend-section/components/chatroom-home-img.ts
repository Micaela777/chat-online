import { Route, Router } from "@vaadin/router";

export function initChatRoomHomeImgComponent() {

    const chatRoomHomeImg = require("url:../img/home.png");

    class ChatroomHomeImg extends HTMLElement {
        constructor() {
            super();
            this.render()
        }
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const button = document.createElement('button');
            button.className = "chatRoomHomeButton";
            button.innerHTML = `
              <img class="chat-home-img" src="${chatRoomHomeImg}">
            `;

            const style = document.createElement('style');

            style.innerHTML = `
            .chatRoomHomeButton{
                background: none;
                border: none;
            }
            .chatRoomHomeButton:hover{
                cursor: pointer;
            }

            .chat-home-img{
                height: 31px;
                width: 31px;
            }
          `;

            shadow.appendChild(button);
            shadow.appendChild(style);
        };
    };
    customElements.define('custom-chatroom-home-img', ChatroomHomeImg);
}