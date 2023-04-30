import { Router } from "@vaadin/router";
import { state } from "../state";

export function initLoginFormComponent() {

    class FormularioDeIniciarSesion extends HTMLElement {

        shadow = this.attachShadow({ mode: 'open' });

        constructor() {
            super();
            this.render();

            const loginForm = this.shadow.querySelector('.login-form');
            loginForm.addEventListener('submit', (e)=>{
                e.preventDefault();
                const target = e.target as any;
                const targetEmail = target.email.value;
                

                const userEmail = {
                    email: targetEmail,
                }
                
                state.signIn(userEmail).then((res) => {

                    if( res.message == "Usuario encontrado" ){

                        const authError = this.shadow.querySelector(".auth-error-text") as HTMLInputElement;
                        authError.style.display = 'none';
                        const emailInput = this.shadow.querySelector(".fieldset-email") as HTMLInputElement;
                        emailInput.style.marginBottom = '34px';
                
                        const select = this.shadow.querySelector(".select-rooms-options") as HTMLInputElement;
                        const selectValue = select.value;
                
                        if( selectValue == "valorUno" ){
                            //console.log("soy el valor uno")
                
                            state.askNewRoom().then((res) => {
                                const cs = state.getState()
                                cs.rtdbRoomId = res.roomLongId
                                //console.log(res.roomLongId) 
                                Router.go("/chatroom");
                            }); 
                
                        } else if ( selectValue == "valorDos" ){
                            //console.log("soy el valor dos")
                            const targetExistingRoomId = target.salaid.value;
                            //console.log(targetExistingRoomId)
                            state.existingRoom(targetExistingRoomId);
                
                            if( targetExistingRoomId ){
                                state.accessToRoom(targetExistingRoomId).then((res) => {
                                    if( res.rtdbRoomId ){
                                        //console.log("existe el room y es ", res.id)
                                        const cs = state.getState()
                                        //cs.rtdbRoomId = res.roomLongId
                                        Router.go("/chatroom");

                                    } else {
                                        //console.log("no existe el room")
                                        const nonExistingroomIdError = this.shadow.querySelector(".non-existent-room") as HTMLInputElement;
                                        nonExistingroomIdError.style.display = 'inherit';
                                        nonExistingroomIdError.style.marginTop = '6px';

                                        const roomIdError = this.shadow.querySelector(".room-id-error-text") as HTMLInputElement;
                                        roomIdError.style.display = 'none';

                                        setTimeout(() => {
                                            nonExistingroomIdError.style.display = 'none';
                                        }, 4000);
                                    }
                                });

                            } else {
                                const roomIdError = this.shadow.querySelector(".room-id-error-text") as HTMLInputElement;
                                roomIdError.style.display = 'inherit';
                                roomIdError.style.marginTop = '6px';
                                
                                const nonExistingroomIdError = this.shadow.querySelector(".non-existent-room") as HTMLInputElement;
                                nonExistingroomIdError.style.display = 'none';

                                setTimeout(() => {
                                    roomIdError.style.display = 'none';
                                }, 4000);
                            }
                        }
                        
                    } else if ( res.message == "Usuario no encontrado" ){
                        const authError = this.shadow.querySelector(".auth-error-text") as HTMLInputElement;
                        authError.style.display = 'inherit';
                
                        const emailInput = this.shadow.querySelector(".fieldset-email") as HTMLInputElement;
                        emailInput.style.marginBottom = '11px';

                        setTimeout(() => {
                            authError.style.display = 'none';
                            emailInput.style.marginBottom = '34px';
                        }, 4000);
                    }
                });
            });
        };

        render() {
            this.shadow.innerHTML = `
            <div class="login-form-container">
                <h1 class="login-title">Iniciar Sesión<h1>
                <form class="login-form" autocomplete="off">
                    <div class="fieldset-email">
                        <input class="email-input" type="email" name="email" required>
                        <label class="email-text">E-mail</label>
                    </div>
                    <authentication-error-text class="auth-error-text">✘ Este usuario no existe</authentication-error-text>
                    <div class="select-rooms-fieldset">
                        <h3 class="room-text">Sala</h3>
                        <select class="select-rooms-options">
                            <option value="valorUno" selected>Nueva sala</option>
                            <option value="valorDos">Sala existente</option>
                        </select>
                    </div>
                    <div class="existing-room-field-container"></div>
                    <alert-error-text class="room-id-error-text">⚠ Coloca un Id</alert-error-text>
                    <authentication-error-text class="non-existent-room">✘ Esta sala no existe</authentication-error-text>
                    <button class="button">
                        <span class="text">Comenzar</span>
                    </button>
                </form>
            </div>    
             `

            const style = document.createElement('style');

            style.innerHTML = `
                .login-form-container{
                    max-width: 450px;
                    margin: auto;
                    padding: 0px 20px 0px 20px;
                    border: 2px solid rgba(255, 255, 255, 0.6);
                    border-radius: 20px;
                    background: rgba(255, 255, 255, 0.1);
                }
                @media (min-width: 769px){
                    .login-form-container{
                        padding: 0px 40px 0px 40px;
                  }
                } 
                
                .login-title{
                    margin: 50px 0px;
                    text-align: center;
                    font-size: 45px;
                    font-weight: 500;
                    font-family: 'Roboto', sans-serif;
                    background: linear-gradient( to left ,#f0b199, #f090bc);
                    -webkit-text-fill-color: transparent;
                    -webkit-background-clip: text;
                }

                .login-form{
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                    align-items: center;
                    font-family: 'Inter', sans-serif;
                    font-size: 20px;
                    color: #EDE7E7;
                }

                .auth-error-text,
                .room-id-error-text,
                .non-existent-room{
                    display: none;
                }
                @media (min-width: 769px){
                    .auth-error-text{
                        margin-right: 190px;
                        margin-bottom: 19px;
                  }
                }
                @media (min-width: 769px){
                    .room-id-error-text{
                        margin-right: 258px;  
                  }
                }
                @media (min-width: 769px){
                    .non-existent-room{
                        margin-right: 213px; 
                  }
                }
                
                .fieldset-email,
                .existing-room-fieldset{
                    position: relative;
                    width: 100%;
                    margin-bottom: 34px;
                    border-bottom: 2px solid #ffffff;
                }
                @media (min-width: 769px){
                    .existing-room-fieldset{
                        margin-bottom: 34px;
                  }
                }
                @media (min-width: 769px){
                    .fieldset-email{
                        margin-bottom: 34px;
                  }
                }

                .select-rooms-fieldset{
                    width: 100%;
                    margin-bottom: 15px;
                }
 
                .email-input,
                .room-id-input{
                    height: 40px;
                    width: 100%;
                    font-size: 19px;
                    border: none;
                    color: rgba(255, 255, 255, 0.9);
                    background: transparent;
                    outline: 0px;
                }
                @media (min-width: 769px){ 
                    .email-input,
                    .room-id-input{
                        min-width: 350px;
                        outline: 0px;
                  }
                }

                .email-text,
                .room-id-text{
                    position: absolute;
                    top: 50%;
                    left: 10px;
                    font-size: 22px;
                    font-weight: 400;
                    font-family: 'Roboto', sans-serif;
                    transform: translateY(-50%);
                    transition: .3s;
                    color: rgba(255, 255, 255, 0.6);
                }

                .fieldset-email input:focus ~ label,
                .fieldset-email input:valid ~ label,
                .existing-room-fieldset input:focus ~ label,
                .existing-room-fieldset input:valid ~ label{
                    top: -10px;
                    color: #ffffff;
                }

                .room-text{
                    margin: 0px 0px 0px 11px;
                    font-size: 22px;
                    font-weight: 400;
                    font-family: 'Roboto', sans-serif;
                } 

                .select-rooms-options{
                    width: 100%;
                    padding: 11px 10px;
                    border: none;
                    border-radius: 10px;
                    font-size: 20px;
                    color: #ffffff;
                    background-color: rgba(156, 143, 179, 0.5);
                    outline: 0px;
                }
                @media (min-width: 769px){
                    .select-rooms-options{
                        text-align: center;
                  }
                }

                .select-rooms-options:hover{
                    cursor: pointer;
                    background-color: #675d7a;
                }

                .text{
                    background-color:  #3c3c53 ;
                    padding: 9px 29px;
                    border-radius: 18px;
                }
                
                .button{
                    margin-top: 23px;
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
                    .button:hover{
                        cursor: pointer;
                  }
                }
    
                .button:hover .text{
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
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);                        transition: 0.5s;
                }
    
                .text:hover::before{
                    left: 100%;
                }
            `

            this.shadow.appendChild(style);
            
            const select = this.shadow.querySelector(".select-rooms-options") as HTMLInputElement;
            select.addEventListener('change', () => {
                const selectOptions = select.value;
                if(selectOptions == "valorDos"){
                   const salaExistente = this.shadow.querySelector(".existing-room-field-container") as HTMLElement;
                   salaExistente.style.display = "inherit";
                   salaExistente.style.transform ="translateY(30px)";
                   salaExistente.style.transition = ".3s";
                   salaExistente.style.width = "100%";
                   salaExistente.innerHTML = `
                        <label class="existing-room-fieldset">
                            <input class="room-id-input" type="text" name="salaid" placeholder="Ej. 3164">
                            <label class="room-id-text">Sala Id</label>
                        </label>
                     `
                } else if(selectOptions == "valorUno"){
                    const salaExistente = this.shadow.querySelector(".existing-room-field-container") as HTMLElement;
                    salaExistente.style.display = "none";
                };
            });
        };
    };
    customElements.define('custom-login-form', FormularioDeIniciarSesion);
};