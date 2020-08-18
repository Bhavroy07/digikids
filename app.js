var express = require("express");
var session=require('express-session')
var path = require('path');
var app = express();
var port = 3000;
const fs=require('fs')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(session({
    cookieName: 'session',
    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly:true,
    secure: true,
    ephemeral: true,
    saveUninitialized:true,
    resave:true
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


var mongoose = require("mongoose");
var User = require('./models/user')
const dir=path.join(__dirname, "public")
app.use(express.static(dir));
mongoose.Promise = global.Promise;
//database connection
mongoose.connect("mongodb://localhost:27017/Child_details",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


app.use(function(req, res, next) {
    if (req.session && req.session.user) {
      User.findOne({ email: req.session.user.email }, function(err, user) {
        if (user) {
          req.user = user;
          delete req.user.password; // delete the password from the session
          req.session.user = user;  //refresh the session value
          res.locals.user = user;
        }
        // finishing processing the middleware and run the route
        next();
      });
    } else {
      next();
    }
  });


function requireLogin (req, res, next) {
    if (!req.user) {
      res.redirect('/');
    } else {
      next();
    }
  };




//index page on starting local host
app.get("/", (req, res) => {
    res.sendFile(path.join(dir,"index.html")); 
    
});


//sign up
app.post("/user_save",(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(user) return res.status(400).json({message:'account already exists with this email'})
    })
    if(req.body.confirmPassword!==req.body.password)
    res.send('passwords do not match')
    else
    {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.sendFile(dir+"/index.html");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
    }
})


//login code
app.post('/users/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (!user) {
        res.send( { error: 'Invalid email or password.' });
      } else {
        user.comparePassword(req.body.password,(err,isMatch)=>
        {
            if(err) throw err
            if(!isMatch){
              res.status(400).json({message:'incorrect password'})
            }
            else{
            req.session.user = user;
            res.redirect('/landing.html');
            }
         })
       }
    });
  });



//get request to the video streaming pages
app.get('/listen/:id',requireLogin,function(req,res){
    const tt=req.params.id
    res.sendFile(dir+`/listen/${tt}.html`)
})

//play mode request
app.get('/Play',function(req,res){
  res.sendFile(dir+'/play/game.html')

})



//logout code
app.get('/logout',  (req, res)=> {
    
    req.session.destroy((err)=>{
        res.sendFile(dir+'/index.html')
    })

  });


//video streaming
app.get('/:level/:f', function(req, res) {
    const levell=req.params.level
    const fi=req.params.f
    const path = `public/listen/assets/videos/${levell}/${fi}`
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
     
    if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
    ? parseInt(parts[1], 10)
    : fileSize-1
     
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': 'video/mp4',
    }
     
    res.writeHead(206, head)
    file.pipe(res)
    } else {
    const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
    }
    })




//launching the express server
app.listen(port, () => {
    console.log("Server listening on port " +port );
});

