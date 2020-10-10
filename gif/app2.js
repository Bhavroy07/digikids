var express = require("express");
var path = require('path');
var passport = require('passport')
var LocalStrategy = require('passport-local')
var app = express();
var port = 3000;

var bodyParser = require('body-parser');


/*app.use(session({
    //cookieName: 'session',
    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
    //duration: 30 * 60 * 1000,
    //activeDuration: 5 * 60 * 1000,
    //httpOnly:true,
    //secure: true,
    //ephemeral: true,
    saveUninitialized:false,
    resave:false
  }));
  app.use(passport.initialize())
  app.use(passport.session())*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




var mongoose = require("mongoose");
var Child = require('./user2')
var func = require('../public/practice/assets/js/beginner')
const dir=path.join(__dirname, "public")
app.use(express.static(dir));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
mongoose.Promise = global.Promise;
//database connection
mongoose.connect("mongodb://localhost:27017/Child_details",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.use(require('express-session')({
    secret:"my name is roy",
    resave:false,
    saveUninitialized:false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Child.authenticate()));
passport.serializeUser(Child.serializeUser());
passport.deserializeUser(Child.deserializeUser());




/*app.use(function(req, res, next) {
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
  });*/


/*function requireLogin (req, res, next) {
    if (!req.user) {
      res.redirect('/');
    } else {
      next();
    }
  };*/




//index page on starting local host
app.get("/", (req, res) => {
    //res.sendFile(path.join(dir,"index.html")); 
    res.render("index.html")
    
});


//sign up
app.post("/user_save",(req,res)=>{
    Child.register(new Child({username:req.body.email}),req.body.password,function(err,user){
        if(err)
        {
            console.log(err)
            return res.render("signup.html")
        }
        passport.authenticate("local")(req, res, function() {
            //res.sendFile(dir+'/index.html')
            return res.redirect("/index.html")
            
        });
    });
});

/*function checkAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}*/


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
            //req.session.user = user;
            //const accessToken=jwt.sign(user.email,process.env.ACCESS_TOKEN_SECRET)
            /*res.json({
               accessToken
            })*/
            //res.redirect('/landing.html');
            isloggedIn=true
            res.redirect('/landing.html')
            }
         })
       }
    });
  });

  /*app.post('/users/login',passport.authenticate('local',{
    successRedirect:'/landing',
    failureRedirect:'/'
  }))*/



//get request to the video streaming pages
app.get('/listen/:id',authenticateToken,function(req,res){
    const tt=req.params.id
    res.sendFile(dir+`/listen/${tt}.html`)
})

//get request to the practice pages
app.get('/practice/:id',authenticateToken,function(req,res){
  const ttt=req.params.id
  /*Q2.findOne({answer:"apple"},function(err,user){
    if(err)
    console.log("kata")
    if(user)
    {
      //console.log(user.question)
      var st = func(user)
      console.log(st)
      res.sendFile(dir+`/practice/${ttt}.html`)
    }
  })*/
  

  res.sendFile(dir+`/practice/${ttt}.html`)
})

//play mode request
app.get('/Play',authenticateToken,function(req,res){
  res.sendFile(dir+'/play/game.html')

})



//logout code
//app.get('/logout',  (req, res)=> {
    
    //req.session.destroy((err)=>{
        //res.sendFile(dir+'/index.html')
    //})

  //});
app.get('/logout',(req,res)=>{
  isloggedIn=false
  res.redirect('/')
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


    /*function checkAuthenticated(req,res,next){
      if(req.isAuthenticated()){
        return next()
      }
      res.redirect('/')
    }*/
    

function authenticateToken(req,res,next){
  //const authHeader = req.headers['authorization']
  //const token = authHeader && authHeader.split(' ')[1]
  //if (token==null) return res.redirect('/index.html')

  //jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    //if(err)
    //return res.redirect('/index.html')
    //req.user=user 
    //next()
  //})
  if(isloggedIn===false)
  res.redirect('/index.html')
  else
  next()
  
}




//launching the express server
app.listen(port, () => {
    console.log("Server listening on port " +port );
});


/*Q1.findOne({question:"what is my name"},function(err,ques){
  if(err)
  console.log("kata")
  if(ques)
  {
    console.log(ques.option1)
  }
})*/


//var myobj = {question:"what is my name",option1:"BHARGAV",option2:"ROY",option3:"bhav",option4:"ana",answer:"BHARGAV"}
//var que = new Q1(myobj)
//que.save()

//var myobj = {question:"./videos/apple.jpg",answer:"apple"}
//var que = new Q2(myobj)
//que.save()

//var myobj = {question:"how are u",answer:"mai thik hoon"}
//var que = new Q3(myobj)
//que.save()
