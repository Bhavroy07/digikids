var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan");
var User = require("./models/User");
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const otpgenerator=require('./public/assets/js/generateotp')

var app = express();
const dir=path.join(__dirname, "public")
app.use(express.static(dir));

var sendTime = 0
var emal = ''
var otp = 'abce'

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
      expires: 60000,
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
    if(req.body.password!==req.body.confirmPassword)
    {
      res.sendFile(dir+'/errors/passwordsdontmatch.html')
    }

    else
    {
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
  }
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
            res.sendFile(dir+"/errors/invalidemail.html");
        }
        user.comparePassword(password, (error, match) => {
            if(!match) {
              res.redirect('/errors');
            }
        });
        req.session.user = user;
        res.redirect("/landing");
    } catch (error) {
      console.log(error)
    }
  });

//route for login error
app.get('/errors',(req,res)=>{
  res.sendFile(dir+"/errors/loginerror.html")
})


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

//forgot password route
app.get('/forgot',function(req,res){
  res.sendFile(dir+'/verification/authentication.html')
})

// Use Smtp Protocol to send Email
app.post('/sendmail',function(req,res){
  otp = otpgenerator()
  var d = new Date()
  sendTime = d.getTime()
  
  var email_add = req.body.email
  emal = email_add
  

  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'bhargavbale80@gmail.com',
      pass: 'Bhaskar230620'
    }
  }));
  
  var mailOptions = {
    from: 'bhargavbale80@gmail.com',
    to: email_add,
    subject: 'OTP for email verification',
    text: `Your OTP is ${otp}. This will be valid for 3 mins`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/otp')
    }
  });  
  
  });


//otp enter page
app.get('/otp',function(req,res){
  res.sendFile(dir+'/verification/otp.html')
}) 

//verify otp
app.post('/changepwd',function(req,res){
  var otps = req.body.otp
  var d = new Date()
  var recieveTime = d.getTime()
  if(recieveTime-sendTime>180000)
  {
    res.sendFile(dir+'/errors/otptimeout.html')
  }
  else
  {
    if(otps==otp)
    {
    res.redirect('/change_pwd')
    }
    else
    {
      res.sendFile(dir+'/errors/invalidotp.html')
    }
  }

})

//change password page
app.get('/change_pwd',function(req,res){
  res.sendFile(dir+'/verification/password.html')
})

app.get('/invalid',(req,res)=>{
  res.sendFile(dir+'/errors/nouser.html')
})

//update password in database
app.post('/update_password',async(req,res)=>{
  var updateuser = await User.findOne({email:emal})
  if(!updateuser)
  {
    res.redirect('/invalid')
  }
  else
  {
    if(req.body.password!==req.body.confirmpassword)
    {
      res.redirect('/invalidmatch')
    }
    var pwd = req.body.password
    pwd = bcrypt.hashSync(pwd,10)
    console.log(pwd)
    User.updateOne({email: emal}, {
      password: pwd
  }, function(err, affected, resp) {
     console.log(resp);
  })
    res.redirect('/login')
  }


})

app.get('/invalidmatch',(req,res)=>{
  res.sendFile(dir+'/errors/credsdontmatch.html')
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