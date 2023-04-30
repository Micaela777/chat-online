import { state } from "../state";

type Message = {
    from: string,
    message: string
};

class ChatroomPage extends HTMLElement{

    connectedCallback(){

      state.listenRoom();

      state.subscribe(()=>{
        const cs = state.getState();
        this.messages = cs.messages;
        this.render();
        this.addListeners();
      }) 

      const cs = state.getState()
      this.messages = cs.messages;
      this.render();
      this.addListeners();
    };

    messages: Message[] = [];

    addListeners(){

      const currentState = state.getState();
      const roomId = currentState.roomId;
      //console.log(roomId)

      const idRoomReference = this.querySelector(".id")
      idRoomReference.textContent = `${roomId}`;

      const messagesForm = this.querySelector('.submit-message');
          messagesForm.addEventListener('submit', (e)=>{
              e.preventDefault();
              const target = e.target as any;
              
              if(target["new-message"].value == ""){

                console.log("Que haces enviando mensajes vacíos, animal.");

              } else {
                state.pushMessage(target["new-message"].value);
              };
        }); 
      
      const inputMessage = this.querySelector(".input-message") as HTMLElement;
      inputMessage.focus(); 
        
      const chatSection = this.querySelector(".chat-section");
      chatSection.scrollTop = chatSection.scrollHeight;  
    } 
    
    render(){

        this.innerHTML = `
          <div class="chatroom-container">
              <div class="chat-container">
                  <div class="chat-header-section">
                      <custom-chatroom-img></custom-chatroom-img>
                      <div>
                          <h3 class="room-id-reference">ID DE LA SALA</h3>
                          <h3 class="id"></h3>
                      </div>
                  </div>
                  <div class="chat-section">
                      <div class="messages-container">
                              ${this.messages.map(m=>{

                                const cs = state.getState();

                                if(cs.name == m.from){
                                    return `
                                        <div class="my-messages">
                                            <div class="my-name">${m.from}</div>
                                            <div class="my-message-container">
                                                  <div class="my-message">${m.message}</div>
                                            </div> 
                                        </div> `
                                } else if(cs.name !== m.from){
                                    return `
                                        <div class="other-messages">
                                            <div class="other-name">${m.from}</div>
                                            <div class="other-message-container">
                                                <div class="other-message">${m.message}</div>
                                            </div> 
                                        </div> `
                                }
                           }).join("")}
                      </div>
                  </div>
                  <form class="submit-message" autocomplete="off">
                      <input class="input-message" type="text" name="new-message" placeholder="Mensaje...">
                      <button class="chat-send-button">⮞</button>
                  </form>
              </div>
          </div>
        `

        const style = document.createElement("style");
        style.innerHTML = `
                .chatroom-container{
                   height: 100vh;
                   display: flex;
                   flex-direction: column;
                   align-items: center;
                   justify-content: center;
                }

                .chat-header-section{
                  padding: 12px 0px 11px 25px;;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  gap: 15px;
                }

                .room-id-reference{
                  margin: 0px;
                  font-size: 16px;
                  font-weight: 500;
                  font-family: 'Roboto', sans-serif;
                  color: #ededed;
                }

                .id{
                  margin: 0px;
                  font-size: 20px;
                  font-weight: 500;
                  font-family: 'Roboto', sans-serif;
                  color: #ffffff;
                }

                .chat-container{
                  height: 100vh;
                  width: 100%;
                  overflow: auto;
                  font-family: 'Inter', sans-serif;
                  background-color: rgba(181, 166, 191, 0.2);
                }
                @media (min-width: 769px){
                  .chat-container{
                    height: 620px;
                    width: 550px;
                    border-radius: 30px;
                  }
                }

                .chat-section{
                  height: 100%;
                  overflow: auto;
                  background-color: rgba(145, 125, 153, 0.3);
                }
                @media (min-width: 769px){
                  .chat-section{
                    height: 490px;
                  }
                }

                .chat-section::-webkit-scrollbar{
                  width: 4px;
                }

                .chat-section::-webkit-scrollbar-thumb{
                  border-radius: 50px;
                  background: #b5a6bf;
                }

                .my-name{
                  margin-bottom: 3px;
                  color: #f5a2c7;
                }

                .other-name{
                  margin-bottom: 3px;
                  color: #f7b59e;
                }

                .messages-container{
                  width: 100%;
                  padding: 14px;
                  overflow: auto;
                }

                .my-messages{
                  display: flex;
                  flex-direction: column;
                  align-items: self-end;
                }
                
                .other-messages{
                  display: flex;
                  flex-direction: column;
                  align-items: self-start;
                }

                .my-message-container{
                  width: fit-content;
                  max-width: 50%;
                  margin-bottom: 10px;
                  padding: 10px 13px;
                  border-radius: 17px 0px 17px 17px;
                  background-color: #25284a;
                }
                
                .other-message-container{
                  width: fit-content;
                  max-width: 50%;
                  margin-bottom: 10px;
                  padding: 10px 13px;
                  border-radius: 0px 17px 17px 17px;
                  background-color: #dedfe0;
                }

                .my-message{
                  color:#edebeb;
                  word-wrap: break-word;
                }
                
                .other-message{
                  word-wrap: break-word;
                }

                .submit-message{
                  height: 60px;
                  padding: 0px 30px;
                  display: flex;
                  align-items: center;
                  flex-direction: row;
                  justify-content: center;
                  gap: 25px;
                }

                .input-message{
                  width: 100%;
                  height: 40px;
                  border: none;
                  font-size: 17px;
                  background: none;
                  outline: 0px;
                  color: #edebeb;
                  font-family: 'Roboto', sans-serif;
                }

                .chat-send-button{
                  position: relative;
                  padding: 5px 20px;
                  border: none;
                  border-radius: 20px;
                  font-size: 22px;
                  color: #ffffff;
                  background: linear-gradient( to left ,#d9896c, #d14b88);
                  transition: 0.5s;
                  overflow: hidden;
                }
                @media (min-width: 769px){
                    .chat-send-button:hover{
                        cursor: pointer;
                  }
                }        
  
                .chat-send-button::before{
                  content:'';
                  position: absolute;
                  top: 0;
                  left: -100%;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                  transition: 0.5s;
                }
  
                .chat-send-button:hover::before{
                  left: 100%;
                }
        `;

        

        this.appendChild(style);

    };
};
customElements.define('chatroom-page', ChatroomPage);