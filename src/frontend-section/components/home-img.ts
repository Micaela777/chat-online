export function initHomeImgComponent() {

    const homeImg = require("url:../img/image2.png");

    class HomeImg extends HTMLElement {
        constructor() {
            super();
            this.render()
        }
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const div = document.createElement('div');
            div.className = "homeImg";
            div.innerHTML = `
              <img class="people-img" src="${homeImg}">
            `;

            const style = document.createElement('style');

            style.innerHTML = `
            .homeImg{
                display: flex;
            }


            @media (min-width: 620px){
                .people-img{
                    max-height: 300px;
                    max-width: 297px;
                }
              }
            @media (min-width: 870px){
                .people-img{
                    max-height: 550px;
                    max-width: 547px;
                }
              }
          `;

            shadow.appendChild(div);
            shadow.appendChild(style);
        };
    };
    customElements.define('custom-home-img', HomeImg);
};