// rest files run with rest client extension to make crud requests from vs code
import express from "express";
import bc from "bcrypt" ;

const app = express();
app.use(express.json())
let users: object[] = []

app.get('/users',(req,res)=>{
res.json(users)
});

app.post('/users', async (req,res)=>{
const user = {"username": req.body.username,
"password": req.body.password }
try {
 // const salt = bc.
} catch (error) {
  console.log(error);
}

users.push(user);
res.end();
});


app.listen(3000)