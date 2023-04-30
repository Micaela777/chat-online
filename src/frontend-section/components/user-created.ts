export function initUserCreatedComponent() {

    class UserCreated extends HTMLElement {
        constructor() {
            super();
            this.render()
        };
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const h3 = document.createElement('h3');
            h3.className = "user-created"
            h3.textContent = this.textContent 

            const style = document.createElement('style');

            style.innerHTML = `
              .user-created{
                  margin: 0px 0px 30px 0px;
                  font-size: 16px;
                  font-weight: 100;
                  text-align: center;
                  font-family: 'Roboto', sans-serif;
                  color: #63bf95; 
              }
        `;

            shadow.appendChild(h3);
            shadow.appendChild(style);
        };
    };
    customElements.define('custom-user-created-text', UserCreated); 
}