const express = require("express");
const cors = require("cors");
const { response, request } = require("express");

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.use(express.json());

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (request, response)=>{ //return all messages
  response.send(messages);
})

app.get("/messages/search", (request, response)=>{
  response.send(messages.find(i=> i.text.toLowerCase().includes(request.query.text) ))
})

app.get("/messages/latest", (request, response)=>{
  let max = Math.max(...messages.map(i=>i.id)) - 10 
  response.send(messages.filter(i=> i.id > max ))
})

app.get("/messages/:id", (request, response)=>{ //get one message by id
  let id = parseInt(request.params.id);
  response.send(messages.find(i=>i.id == id));
})

app.post("/messages", (request, response)=>{ //create a new message 
  let message = request.body;
  if(message.text && message.from){
    let id = Math.max(...messages.map(i=>i.id)) + 1;
    message.id = id;
    messages.push(message);
    response.send(messages);
  }else{
    response.status(400).send("some parameter is missing")
  }
})

app.delete("/messages/:id", (request, response)=>{//deledte a message by id
  id = request.params.id;
  console.log(id);
  messages.forEach((Element, i) => {
    if(Element.id == id) messages.splice(i, i+1)
  });
  response.send("deleted")
})

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
