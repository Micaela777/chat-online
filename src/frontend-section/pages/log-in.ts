import { Router } from '@vaadin/router';
import { state } from "../state";

class Login extends HTMLElement{
  connectedCallback(){
        this.render();
    }

    render(){
        
        this.innerHTML = `
            <div class="login-page-container">
                <custom-login-form class="login-form"></custom-login-form>
            </div>    
        `

        const style = document.createElement("style");
        style.innerHTML = `
                .login-page-container{
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 40px;
                }

                .login-form{
                    width: 100%;
                    padding: 0px 20px;
                }
                @media (min-width: 769px){
                    .login-form{
                        max-width: 500px;
                  }
                }
        `
        this.appendChild(style);
    };
};
customElements.define('login-page', Login)