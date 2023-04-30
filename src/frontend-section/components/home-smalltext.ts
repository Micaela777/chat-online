export function initSmallTextComponent() {

    class TextoPequeño extends HTMLElement {
        constructor() {
            super();
            this.render();
        };
        render() {
            var shadow = this.attachShadow({ mode: 'open' });

            const div = document.createElement('div');
            div.className = "texto-pequeño";
            div.textContent = this.textContent; 

            const style = document.createElement('style');

            style.innerHTML = `
              .texto-pequeño{
                  max-width: 290px;
                  margin: 4px 0px 0px 0px;
                  font-size: 18px;
                  font-weight: 100;
                  font-family: 'Roboto', sans-serif;
                  color: #cfcfcf; 
              }
              @media (min-width: 620px){
                .texto-pequeño{
                    max-width: 400px;
                }
              }
              @media (min-width: 870px){
                .texto-pequeño{
                    max-width: 430px;
                }
              }
        `;

            shadow.appendChild(div);
            shadow.appendChild(style);
        };
    };
    customElements.define('custom-small-text', TextoPequeño); 
}