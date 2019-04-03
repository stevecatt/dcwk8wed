const express = require('express')
const models = require('./models')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')




app.get('/blog',function(req,res){

  // get all the posts from the database using sequelize
  models.Blog.findAll().then(function(blogs){
  
    res.render('blog',{blogs:blogs})
  })

})


app.post("/addpost", (req,res)=>{
  let title = req.body.title
  let body = req.body.body

  let blog = models.Blog.build({
    title:title,
    body:body
  })
  blog.save()
res.redirect("/blog")
})


app.get('/update-blog/:Id',(req,res)=>{
  let id = parseInt(req.params.Id)
 
  models.Blog.findByPk(id).then((blog)=>{
    
    
    res.render('update-blog',{blog:blog})
  })

})

app.post("/update-blog", (req,res)=>{
  let id = parseInt(req.body.Id)
  let title= req.body.title
  let body = req.body.body
  
  models.Blog.update({
    title : title,
    body:body
  },{
    where: {
      id : id
    }
  })
  console.log("this is what im trying to send back")
  
  
 
  
res.redirect("/blog")

})


app.post("/delete-post",(req,res)=>{
  let id = parseInt(req.body.Id)
  console.log(id)
  
  
  models.Blog.destroy({
    where: {
        id:id
    }
    
})

res.redirect('/blog')


})
//building a post
/*const post = models.blog.build({
  title :"Hello CSS",
  body: 'This is CSS course'
})

console.log("post before saving")
console.log(post)

*/

// inserting the post in the database
/*
post.save().then(function(newPost){
  console.log("newPost object")
  console.log(newPost)
})
*/



// find the post in the database
/*
models.post.findOne().then(function(post){
  console.log(post)
}) */


// find the post by id
/*
models.post.findById(2).then(function(post){
  console.log(post)
}) */

// find all the posts
/*
models.post.findAll().then(function(posts){
  console.log(posts)
}) */

// find the posts by username
/*
models.post.findAll({
  where: {
    username : 'johndoe'
  }
}).then(function(posts){
  console.log(posts)
}) */


// updating the post

/*
models.Blog.update({
  title : 'mary'
},{
  where: {
    id : 1
  }
}).then(function(post){
  console.log(post)
}) 
*/

app.listen(3000,function(){
  console.log("node server has started")
})
