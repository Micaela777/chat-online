import {Router} from '@vaadin/router';

const router = new Router(document.querySelector('.root'));
router.setRoutes([
  {path: '/', component: 'home-page'},
  {path: '/registrarse', component: 'register-page'},
  {path: '/iniciar-sesion', component: 'login-page'},
  {path: '/chatroom', component: 'chatroom-page'}
]);