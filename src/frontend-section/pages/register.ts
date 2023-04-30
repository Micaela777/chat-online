
class Register extends HTMLElement{
  connectedCallback(){
        this.render();
        
        
    };
    render(){
        this.innerHTML = `
            <div class="register-page-container">
                <custom-register-form class="register-form"></custom-register-form>
            </div>    
        `

        const style = document.createElement("style");
        style.innerHTML = `
                .register-page-container{
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 30px;
                }

                .register-form{
                    width: 100%;
                    padding: 0px 20px;
                }
                @media (min-width: 769px){
                    .register-form{
                        max-width: 500px;
                  }
                }
        `
        this.appendChild(style);
    };
};
customElements.define('register-page', Register)