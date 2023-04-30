export function initAuthenticationErrorComponent() {

    class AuthenticationError extends HTMLElement {
        constructor() {
            super();
            this.render()
        };
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const h3 = document.createElement('h3');
            h3.className = "auth-error"
            h3.textContent = this.textContent 

            const style = document.createElement('style');

            style.innerHTML = `
              .auth-error{
                  margin: 0px;
                  font-size: 17px;
                  font-weight: 100;
                  font-family: 'Roboto', sans-serif;
                  color: #eb7575; 
              }
        `;

            shadow.appendChild(h3);
            shadow.appendChild(style);
        };
    };
    customElements.define('authentication-error-text', AuthenticationError); 
}