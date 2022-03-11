const express = require('express')
import bc from 'bcrypt';
const app = express();
app.use(express.json());
const users = []
app.get('/user', (req , res)=>{
res.json(users)
res.end();
})
app.post('/users', async (req,res)=>{
  const user = {"username": req.body.username,
  "password": req.body.password }
  try {
    const salt =await  bc.genSalt(10);
  } catch (error) {
    console.log(error);
  }
})
app.listen(3000);