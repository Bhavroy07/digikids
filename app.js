var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan");
var User = require("./models/User");
const fs = require('fs')
const path = require('path')

var app = express();
const dir=path.join(__dirname, "public")
app.use(express.static(dir));

// set our application port
app.set("port", 3000);

// set morgan to log info about our requests for development use.
app.use(morgan("dev"));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/landing");
  } else {
    next();
  }
};

// route for Home-Page
app.get("/", sessionChecker, (req, res) => {
  res.redirect("/login");
});

// route for user signup
app
  .route("/signup")
  .get(sessionChecker, (req, res) => {
    res.sendFile(dir + "/signup.html");
  })
  .post((req, res) => {

    var user = new User({
      name: req.body.name,
      email: req.body.email,
      gender:req.body.gender,
      password:req.body.password,
    });
    user.save((err, docs) => {
      if (err) {
        res.redirect("/signup");
      } else {
          console.log(docs)
        req.session.user = docs;
        res.redirect("/landing");
      }
    });
  });

// route for user Login
app
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.sendFile(dir + "/login.html");
  })
  .post(async (req, res) => {
    var email = req.body.email,
      password = req.body.password;

      try {
        var user = await User.findOne({ email: email }).exec();
        if(!user) {
            res.redirect("/login");
        }
        user.comparePassword(password, (error, match) => {
            if(!match) {
              res.redirect("/login");
            }
        });
        req.session.user = user;
        res.redirect("/landing");
    } catch (error) {
      console.log(error)
    }
  });


// route for user's dashboard
app.get("/landing", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile(dir + "/landing.html");
  } else {
    res.redirect("/login");
  }
});

//get request to the practice pages
app.get('/practice/:id',function(req,res){
  const ttt=req.params.id
  if(req.session.user && req.cookies.user_sid)
    {
      res.sendFile(dir+`/practice/${ttt}.html`)
    }
    else{
      res.redirect('/login')
    }
})

//graded mode pages
app.get('/graded/:id',function(req,res){
  const ttt=req.params.id
  if(req.session.user && req.cookies.user_sid)
    {
      res.sendFile(dir+`/graded/${ttt}.html`)
      
    }
    else{
      res.redirect('/login')
    }
  
})

//listen mode pages
app.get('/listen/:id',function(req,res){
  const tt=req.params.id
  if(req.session.user && req.cookies.user_sid)
  {
  res.sendFile(dir+`/listen/${tt}.html`)
  }
  else
  {
    res.redirect("/login")
  }
})

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

  //play mode request
  app.get('/Play',function(req,res){
    if(req.session.user && req.cookies.user_sid)
    {
    res.sendFile(dir+'/play/game.html')
    }
    else{
      res.redirect('/login')
    }
  
  })



// route for user logout
app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// start the express server
app.listen(app.get("port"), () =>
  console.log(`App started on port ${app.get("port")}`)
);