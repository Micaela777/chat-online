import { Router } from '@vaadin/router';

class Home extends HTMLElement{
  connectedCallback(){
        this.render();

        const registerButton = this.querySelector('.register-button');
        registerButton.addEventListener('click', (e)=>{
            e.preventDefault();
            Router.go("/registrarse");
        });

        const loginButton = this.querySelector('.login-button');
        loginButton.addEventListener('click', (e)=>{
            e.preventDefault();
            Router.go("/iniciar-sesion");
        });

    };

    render(){
        this.innerHTML = `
               <div class="home-page-container">
                   <div class="text-section-container">
                       <div class="text-container">
                           <custom-title></custom-title>
                           <custom-small-text>
                               Un espacio donde podés conectarte con personas afines a vos y tener 
                               conversaciones interesantes, compartir tus ideas, intereses y opiniones. 
                           </custom-small-text>
                           <custom-home-img class="up-home-img"></custom-home-img>
                       </div>
                       <div class="buttons-container">
                            <custom-register-button class="register-button">Registrarse</custom-register-button>
                            <h5 class="letter-O">- o -</h5>
                            <custom-login-button class="login-button">Iniciar Sesión</custom-login-button>
                       </div>
                   </div>
                   <custom-home-img class="down-home-img"></custom-home-img>
               </div>
        `
        const style = document.createElement("style");
        style.innerHTML = `
                .home-page-container{
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                @media (min-width: 620px){
                    .home-page-container{
                        flex-direction: column;
                        gap: 20px;
                    }
                  }
                @media (min-width: 870px){
                    .home-page-container{
                        flex-direction: row;
                        justify-content: space-around;
                        margin: 0px 21px 0px 21px;
                    }
                  }
                @media (min-width: 985px){
                    .home-page-container{
                        margin: 0px 40px 0px 40px;
                    }
                  }  
                
                .up-home-img{
                    display: none;
                }  
                @media (min-width: 620px){
                   .up-home-img{
                        margin-top: 20px;
                        display: inherit;
                    }
                  } 
                  
                  @media (min-width: 870px){
                    .up-home-img{
                        display: none;
                    }
                  }  

                @media (min-width: 620px){
                    .text-section-container{
                        margin-bottom: 10px;
                    }
                  }  
                @media (min-width: 870px){
                    .text-section-container{
                        display: flex;
                        flex-direction: column;
                        margin: 0px;
                        gap: 40px;
                    }
                  }  
                @media (min-width: 970px){
                    .text-section-container{
                        display: flex;
                        flex-direction: column;
                        margin: 0px;
                        gap: 50px;
                    }
                  }   

                .text-container{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    margin-bottom: 50px;
                    gap: 10px;
                }
                @media (min-width: 620px){
                    .text-container{
                        align-items: center;
                        margin-bottom: 29px;
                    }
                  }
                @media (min-width: 870px){
                    .text-container{
                        align-items: self-start;
                        text-align: left;
                        margin: 0px;
                    }
                  }

                .text{
                    margin-top: 10px;
                    
                    margin: 0px 10px 0px 10px;
                }
                @media (min-width: 870px){
                    .text{
                        
                    }
                  }

                .buttons-container{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }
                @media (min-width: 620px){
                    .buttons-container{
                        flex-direction: row;
                        align-items: center;
                        gap: 20px;
                    }
                  }
                @media (min-width: 870px){
                    .buttons-container{
                        flex-direction: column;
                        align-items: center;
                        gap: 5px;
                    }
                  } 
                @media (min-width: 1030px){
                    .buttons-container{
                        flex-direction: row;
                        align-items: center;
                        gap: 20px;
                    }
                  }  
                  
                .letter-O{
                    margin: 0px;
                    font-size: 20px;
                    font-weight: 300;
                    font-family: 'Roboto', sans-serif;
                    color: #cfcfcf;
                }
                @media (min-width: 620px){
                    .letter-O{
                        display: none;
                    }
                  }
                @media (min-width: 870px){
                    .letter-O{
                        display: inherit;
                        margin: 0px;
                    }
                  }  
                @media (min-width: 1030px){
                    .letter-O{
                        display: none;
                    }
                  }  

                .down-home-img{
                    display: none;
                }
                @media (min-width: 870px){
                    .down-home-img{
                        display: inherit;
                    }
                  }
        `
        this.appendChild(style)
    };
};
customElements.define('home-page', Home);