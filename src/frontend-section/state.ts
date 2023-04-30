import { rtdb } from "./rtdb";

import map from "lodash/map";

const API_BASE_URL = "http://localhost:3000";

const state = {
    data: {
        email: "",
        name:"",
        userId: "",
        roomId: "",
        rtdbRoomId: "",
        messages: []
    },
    listeners: [],

    init() {
        const localData = JSON.parse(localStorage.getItem("state"));
        if (!localData) {
            return;
        } else {
            this.setState(localData);
        };
    },

    getState() {
        return this.data;
    },

    setEmailAndName(name: string, email:string,){
        const cs = this.getState();

        cs.name = name;
        cs.email = email;
        
        this.setState(cs)
    },
    
    signUp(newUser){

        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/signup", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
        }).then((res) => {
            return res.json()
        }).then((data) => {
            cs.userId = data.id
            //console.log(data)
            this.setState(cs)
            return data
        });
    },

    signIn(userEmail){

        const cs = this.getState()

        return fetch(API_BASE_URL + "/auth", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userEmail),
        }).then((res) => {
            return res.json()
        }).then((data) => {
            cs.userId = data.id
            //console.log(data)
            this.setState(cs)
            return data
        });
    },

    askNewRoom(){
        const cs = this.getState();

            return fetch(API_BASE_URL + "/rooms", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({userId: cs.userId}),
            }).then((res) => {
                return res.json()
            }).then((data) => {
                cs.roomId = data.id
                //console.log(data)
                this.setState(cs)
                
                return data
            });
    },

    accessToRoom(roomId){
        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + cs.userId)
        .then((res) => {
            return res.json();
        }).then((data) => {
            cs.rtdbRoomId = data.rtdbRoomId;
            //console.log(data);
            this.setState(cs);
            return data;
        });
    },

    existingRoom(roomId){
        const cs = this.getState();
        cs.roomId = roomId;
        this.setState(cs);
    },

    pushMessage(message: string) {

        const cs = this.getState()

        const nombreDelState = this.data.name;
        const roomLongId = cs.rtdbRoomId;

        fetch(API_BASE_URL + "/rooms/" + roomLongId ,{
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body:JSON.stringify({
                from: nombreDelState,
                message: message
            })
        });
    },

    listenRoom(){
        const cs = this.getState();

        const chatroomReference = rtdb.ref("/rooms/" + cs.rtdbRoomId) 

        chatroomReference.on("value", (snapshot)=>{
            const messagesFromServer = snapshot.val();
            //console.log(messagesFromServer)
            const messagesList = map(messagesFromServer.messages);
            cs.messages = messagesList;
            //console.log(cs)
            this.setState(cs);
        })
    },
    
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
        }
        localStorage.setItem("state", JSON.stringify(newState))
        //console.log("Soy es State, he cambiado", this.data);
    },

    subscribe(callback: (any) => any) {
        this.listeners.push(callback)
    },
};

export { state }
