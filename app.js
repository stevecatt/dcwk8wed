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
  models.Blog.findAll({
    include:[
      {
        model:models.Comment,
        as: 'comments'
      }
    ]
  
  })
  .then((blogs)=>{
    
    res.render('blog',{blogs:blogs})
  })

})


app.post('/addpost', (req,res)=>{
  let title = req.body.title
  let body = req.body.body

  let blog = models.Blog.build({
    title:title,
    body:body
  })
  blog.save()
  .then(()=>{
    res.redirect('/blog')
  })
  


})


app.get('/update-blog/:Id',(req,res)=>{
  let id = parseInt(req.params.Id)
 
  models.Blog.findByPk(id).then((blog)=>{
    
    
    res.render('update-blog',{blog:blog})
  })

})

app.post('/update-blog', (req,res)=>{
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

  
  
 
  
res.redirect('/blog')

})


app.post("/delete-post",(req,res)=>{
  let id = parseInt(req.body.Id)
  
  
  
  models.Blog.destroy({
    where: {
        id:id
    }
    
})

res.redirect('/blog')


})

app.post('/add-comment',(req,res)=>{
  let title = req.body.commentTitle
  let body = req.body.comment
  let blogid = parseInt(req.body.Id)
  
  let comment= models.Comment.build({
    title: title,
    body:body,
    blogid :blogid
  })
  comment.save()
  .then(()=>{
    res.redirect('/blog')
  })
})


app.get('/view-comments/:Id',(req,res)=>{
  let blogid = parseInt(req.params.Id)

  models.Blog.findByPk(blogid,{
    include:[
      {
        model:models.Comment,
        as: 'comments'
      }
    ]
  
  })
  .then((blog)=>{
    
    res.render('view-comments',{blog:blog})
  })
})

app.get('/delete-comment/:Id',(req,res)=>{
  let id = parseInt(req.params.Id)
  models.Comment.destroy({
    where: {
        id:id
    }
    

})
res.redirect('/blog')
})


app.listen(3000,function(){
  console.log("node server has started")
})
