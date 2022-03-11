const express = require('express')
const bc = require('bcrypt') ;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const app = express();
app.use(express.json());
const users = [{username:'ahmed', password:'$2b$10$Lf19bx7hWuvk/kG0nWVYMOsG7g/1.mqCB6ePYaCHgamU6Ca8NYoh6'},
{username:'samy', password:'$2b$10$qHM7ze/7ze7sYKKQP8E/R.O4cAYfgCg4wl3HVzvkUgxtvg0q.xdtK'}]; //ahamd 123 samy 456
const posts =[{
  username:"ahmed",
  title:"first post"
}, 
{
  username:"ahmed",
  title:"second post"
},
{
  username:"samy",
  title:"first post"
}]



app.get('/users', (req , res)=>{
  res.json(users)
  res.end();
})
app.get('/posts', authentication , (req , res)=>{
res.json(posts.filter(post => post.username === req.user.username))
})
// adding user to array (todo:db) and crypt password with salt and hash
app.post('/users', async (req,res)=>{
  try {
    const salt =await  bc.genSalt(10); // more than 10 more time to process
    const hashpss = await bc.hash(req.body.password , salt);
    //const hashpss = await bc.hash(req.body.password , 10); // make salt and hash in one step
    const user = {"username": req.body.username,
    "password": hashpss } // the encrpted pass goto db
    users.push(user);
    res.send("user add to db")

  } catch (error) {
    console.log(error);
  }
})
app.post('/users/login', async (req , res)=>{
  const user = users.find(user=>user.username === req.body.username)
  if(!user) return res.status(400).send("the user not found");
  try {
   const success = await bc.compare(req.body.password , user.password)
   if (success) {
     // begin access token sign
     const accessToken = await jwt.sign(user,process.env.SECRET_KEY)
        res.send("log in succssfully  HI: "+user.username + "and your access token is "+ accessToken)
        //res.json({accessToken : accessToken})
   } else {
     res.send("the password is not correct")
   }
  } catch (error) {
    res.status(500).send("internal errror")
  }
});
// middlewear carry user obj based on jwt verification
function authentication(req, res,next){
  const auth_header =  req.headers['authorization']  // bearer token
    const token = auth_header && auth_header.split(' ')[1]
    if(token == null) return res.status(401).send('no autheriztion for user')
    jwt.verify(token, process.env.SECRET_KEY,(err, user)=>{
      if(err) return res.status(401).send('not valid token')
      req.user = user // we send the user in req body to make auth routes
    })
  next()
}
app.listen(3000);