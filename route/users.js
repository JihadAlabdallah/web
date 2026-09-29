const express = require('express'); 
const router = express.Router(); 
router.use(express.json());
// app.use(express.static('public'));

router.listen(3000 , () =>
  console.log('Server running on port 3000')
);

let users = [ 
  { id: 1 , name: 'Ana'}, 
  { id: 2 , name: 'Sam'}, 
  {id: 3 , name: 'Lee'}
];

router.get('/users',(req , res) => {
  res.json(users)
});
// get 
router.get('/users/:id',(req , res) => {
   const user = users.find( u => u.id == req.params.id)
   if(!user)
   {
     return res.status(404).json({message: 'user not found'});
   }
   res.json(user);
});
// post 
router.post('/' ,(req, res) => {

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
router.put('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if(!user) {
      return res.status(404).json({message: 'User not found'});
  }
  Object.assign(user, req.body);
  res.json(user);
});

//DELETE
router.delete('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if(!user) {
      return res.status(404).json({message: 'User not found'});
  }
  users = users.filter(u => u.id != req.params.id);
  res.status(204).send();
}); 
module.exports =  router;