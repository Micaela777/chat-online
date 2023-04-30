export function initHomeTitleComponent() {

    class Titulo extends HTMLElement {
        constructor() {
            super();
            this.render()
        };
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const div = document.createElement('div');
            div.innerHTML = `
                <h1 class="titulo">Chat <span class="color-title">Online</span> </h1>
            `;

            const style = document.createElement('style');

            style.innerHTML = `
              .titulo{
                  margin: 4px 0px 0px 0px;
                  font-size: 60px;
                  font-weight: 600;
                  font-family: 'Roboto', sans-serif;
                  color: #ffffff;
              }
              @media (min-width: 860px){
                .titulo{
                    padding-top: 0px;
                }
              }

             .color-title{
                background: linear-gradient( to left ,#f0b199, #f090bc);
                -webkit-text-fill-color: transparent;
                -webkit-background-clip: text;
             }  
        `;
            shadow.appendChild(div);
            shadow.appendChild(style);
        };
    };
    customElements.define('custom-title', Titulo); 
}