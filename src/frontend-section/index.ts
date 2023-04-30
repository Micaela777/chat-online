import "./router";
import { initHomeTitleComponent } from "./components/home-title";
import { initSmallTextComponent } from "./components/home-smalltext";
import { initHomeImgComponent } from "./components/home-img";
import { initRegisterButtonComponent } from "./components/register-button";
import { initLogInButtonComponent } from "./components/login-button";
import { initRegisterFormComponent } from "./components/register-form";
import { initUserCreatedComponent } from "./components/user-created";
import { initLoginFormComponent } from "./components/login-form";
import { initAuthenticationErrorComponent } from "./components/authentication-error";
import { initAlertErrorComponent } from "./components/alert-error";
import { initChatRoomImgComponent } from "./components/chatroom-img";
import { initChatRoomHomeImgComponent } from "./components/chatroom-home-img";
import "./pages/home";
import  "./pages/register";
import "./pages/log-in";
import "./pages/chatroom";

import { state } from "./state";

(function(){
    state.init();
    initHomeTitleComponent();
    initSmallTextComponent();
    initHomeImgComponent();
    initRegisterButtonComponent();
    initLogInButtonComponent();
    initRegisterFormComponent();
    initUserCreatedComponent();
    initLoginFormComponent();
    initAuthenticationErrorComponent();
    initAlertErrorComponent();
    initChatRoomImgComponent(); 
    initChatRoomHomeImgComponent(); 
})();