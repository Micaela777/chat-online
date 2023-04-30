export function initRegisterButtonComponent() {

    class RegisterButton extends HTMLElement {
        constructor() {
            super();
            this.render();
        };
        
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const button = document.createElement('button');
            button.className = "boton";
            button.textContent = this.textContent;

            const style = document.createElement('style');

            style.innerHTML = `
            .boton{
                margin-top: 2px;
                padding: 12px 41px;
                font-size: 19px;
                position: relative;
                letter-spacing: 1px;
                font-weight: bold;
                border: none;
                border-radius: 20px;
                color: #ffffff;
                font-family: 'Roboto', sans-serif;
                background: linear-gradient( to left ,#d9896c, #d14b88);
                transition: 0.5s;
                overflow: hidden;
            }
            @media (min-width: 860px){
                .boton:hover{
                    cursor: pointer;
              }
            }    
            @media (min-width: 1030px){
                .boton{
                    padding: 12px 31px;
              }
            }    

            .boton::before{
                content:'';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                transition: 0.5s;
            }

            .boton:hover::before{
                left: 100%;
            }
          `;

            shadow.appendChild(button);
            shadow.appendChild(style);

        };
    };
    customElements.define('custom-register-button', RegisterButton);
};