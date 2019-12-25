const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const passport = require("passport");
var path = require('path');
const app = express()

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/Devlancerfront/build')));





const db = require("./config/keys").mongoURI;

require('dotenv').config()
//require('./config/passport')(passport)

// create express server


//Midellware
app.use(cors())
//parse json sending and resiving 
app.use(express.json())

//connect DB
mongoose.connect(
    process.env.DEV_DB,{useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,},
    () => {
      console.log("MongoDB Connected");
    }
)

  // Passport middleware
  app.use(passport.initialize());

  //url+ /exercise or /users will loead everything from the called router
  const projectsRouter = require('./routes/projects')
  //const postsRouter = require('./routes/posts')
  const usersRouter = require('./routes/users')
  const PostRouter = require('./routes/posts')

// app.use('/')
  app.use('/projects', projectsRouter)
  //app.use('/posts', postsRouter)
  app.use('/users', usersRouter)
  app.use('/posts', PostRouter)


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/Devlancerfront/build/index.html'));
  });
  
const port = process.env.PORT || 5000;

//start server .. listen to port
app.listen(port, ()=> {
    console.log(`Server Running in port: ${port}`);
    
})

// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },