export function initLogInButtonComponent() {

    class LogInButton extends HTMLElement {
        constructor() {
            super();
            this.render();
        };
        
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const button = document.createElement('button');
            button.className = "boton";
            button.textContent = this.textContent;
            button.innerHTML = `
                <span class="text">${this.textContent}</span>
            `;

            const style = document.createElement('style');

            style.innerHTML = `

            .text{
                background-color: #1e1d39 ;
                padding: 9px 28px;
                border-radius: 18px;
            }
            
            .boton{
                margin-top: 2px;
                padding: 3px;
                display: flex;
                border: none;
                font-size: 19px;
                position: relative;
                letter-spacing: 1px;
                font-weight: bold;
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

                .boton:hover .text{
                    background: none;
                    transition: all ease-out 95ms;
                }

                .text::before{
                    content:'';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    right: auto;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    transition: 0.5s;
                }

                .text:hover::before{
                    left: 100%;
                }
              }
          `;

            shadow.appendChild(button);
            shadow.appendChild(style);

        };
    };
    customElements.define('custom-login-button', LogInButton);
};