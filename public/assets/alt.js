/*req.session.destroy(function(err){
            console.log(sess.email)
            res.redirect('/')
    
    })*/


/*app.get('/:page/:level', function(req,res){
    const page=req.params.page
    const ll=req.params.level
    if(!req.session.user)
    res.redirect('/index.html')
    else
    res.redirect(`/${page}/${ll}`)
})*/


/*app.post('/users/login', (req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.status(400).json({message:'login failed, no matching email found'})
    
        user.comparePassword(req.body.password,(err,isMatch)=>
        {
            if(err) throw err
            if(!isMatch) return res.status(400).json({message:'wrong password'})
            sess=req.session
            sess.email=req.body.email
            console.log(sess.email)
            res.redirect("/landing.html")//not working(only skeleton html page showing ) res.sendFile(dir+"/landing.html");
        })
    })
    

})*/

/*if (req.body.password === user.password) {
          // sets a cookie with the user's info
          req.session.user = user;
          res.redirect('/landing.html');
        } else {
          res.send( { error: 'email or password.' });
        }*/