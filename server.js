const express = require('express'); 
const app = express(); 
app.use(express.json());
app.use(express.static('public'));
const useRoute = require('./route/users')
app.use('/api',useRoute);

app.listen(3000 , () =>
  console.log('Server running on port 3000')
);

let users = [ 
  { id: 1 , name: 'Ana'}, 
  { id: 2 , name: 'Sam'}, 
  {id: 3 , name: 'Lee'}
];

app.get('/users',(req , res) => {
  res.json(users)
});
// get 
app.get('/users/:id',(req , res) => {
   const user = users.find( u => u.id == req.params.id)
   if(!user)
   {
     return res.status(404).json({message: 'user not found'});
   }
   res.json(user);
});
// post 
app.post('/' ,(req, res) => {

const{id , name} = req.body
const user = users.find(u=> u.id == id);
if(user){
  return res.status(409).json({message: 'user id already exists '});
}
const newUser = { id , name }; 
users.push(newUser); 
res.status(201).json(newUser);
});

//PUT
app.put('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if(!user) {
      return res.status(404).json({message: 'User not found'});
  }
  Object.assign(user, req.body);
  res.json(user);
});

//DELETE
app.delete('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if(!user) {
      return res.status(404).json({message: 'User not found'});
  }
  users = users.filter(u => u.id != req.params.id);
  res.status(204).send();
});

/*
const http = require ('http') ; 
const fs = require('fs'); 
const path = require('path'); 
*/

/*
 const server = http.createServer((req , res) => {
  let filePath = path.join(__dirname , 'public' , req.url === '/' ? 'homepage.html' : req.url); 
  fs.readFile(filePath , (err , content) => {
      if(err) {
        res.writeHead(404) ; 
        res.end('file not found') ; 
      } else {
        res.writeHead(200) ; 
        res.end(content);
      }
  });
});
*/

/* 
const server = http.createServer((req , res) => {
   res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello,World!\n');
})
 */

/*
server.listen(3000,() => {
  console.log('server running at http:localhost:3000/'); 
})
*/

/*
const EventEmitter = require('events'); 
const emitter = new EventEmitter(); 

emitter.on('greet' , (name) => {
    console.log(`hello , ${name}!`);

});
emitter.emit('greet','sam'); 
*/ 
