import { firestore, rtdb } from "./db";
import * as express from "express";
import * as nanoid from "nanoid";
import * as cors from "cors";
import * as path from "path"

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());



const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");


app.post("/signup", (req, res) => {
  const name = req.body.name
  const email = req.body.email;
  userCollection.where("email", "==", email).get().then((searchResponse)=>{
    if (searchResponse.empty){
      userCollection.add({
        name,
        email
      }).then((newUserRef) => {
        res.json({
          id: newUserRef.id,
          new: "Nuevo usuario creado",
          message: "Usuario creado"
        })
      })
    } else {
      res.status(400).json({
        message: "Este usuario ya existe"
      })
    }
  })
})


app.post("/auth", (req, res) => {
  const email = req.body.email
  userCollection.where("email", "==", email).get().then((searchResponse)=>{
    if (searchResponse.empty){
      res.status(404).json({
        message: "Usuario no encontrado"
      })
    } else {
      res.json({
        message: "Usuario encontrado",
        id: searchResponse.docs[0].id
      })
    }
  })
})


app.post("/rooms", (req, res) => {
  const userId = req.body.userId
  userCollection.doc(userId.toString()).get().then((doc) => {
    if(doc.exists){
      const roomRef = rtdb.ref("rooms/" + nanoid())
      roomRef.set({
        messages: [],
        owner: userId
      }).then(() => {
        const roomLongId = roomRef.key
        const roomId = 1000 + Math.floor(Math.random() * 999)
        roomsCollection.doc(roomId.toString()).set({
          rtdbRoomId: roomLongId
        }).then(() => {
          res.json({
            id: roomId.toString(),
            roomLongId
          })
        })
      })
    } else {
      res.status(401).json({
        message: "no existís"
      })
    }
  })
})


app.get("/rooms/:roomId", (req, res) => {
  const userId = req.query.userId
  const roomId = req.params.roomId
  userCollection.doc(userId.toString()).get().then((doc) => {
    if(doc.exists){
      roomsCollection.doc(roomId).get().then((snap) => {
        if(snap.exists){
          const data = snap.data()
          res.json(data)
        }else{
          res.status(401).json({
            message: "el room no existe"
          })
        }
      })
    } else {
      res.status(401).json({
        message: "no existis"
      })
    }
  })
})


app.post("/rooms/:longRoomId", (req, res) =>{
  const id = req.params.longRoomId
  const realTimeChatRoomRef = rtdb.ref("/rooms/" + id + "/messages")
  realTimeChatRoomRef.push(req.body, function(){
    res.json("todo ok")
  })
})


app.use(express.static("dist"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})