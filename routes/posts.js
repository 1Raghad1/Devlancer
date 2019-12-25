//exprss router router  we created
const router = require('express').Router()
// require the model first 
let Post = require('../models/Post')

//request /Project/
router.route('/all').get((req,res) =>{
    //list of all the Project in json
    Post.find()
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err))
})

///Project/add
router.route('/add').post((req,res) => {
    const title = req.body.title
    const description = req.body.description
    const tags = req.body.tags
    const comments = req.body.comments
    const postedBy =req.body.comments.postedBy
    const date = Date (req.body.date)
    const User_id =  req.body.User_id
 const User_name =  req.body.User_name
    const newPost = new Post({
        title,
        description,
        tags,
        comments,
        postedBy,
        date,
        User_id ,
        User_name
    })
    //save in data base 
    newPost.save()
    .then(() => res.json('Post Added !'))
    .catch(err => res.status(400).json('Error: ' + err))
})
//calling id as var an object 
//return info about that object
//pass id by url
router.route('/:id').get((req,res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err))
})
//delete
//pass id by url
router.route('/:id').delete((req,res) => {
    Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post Deleted !'))
    .catch(err => res.status(400).json('Error: ' + err))
})
//update 
//pass id by url
router.route('/update/:id').post((req,res) => {
    Post.findById(req.params.id)
    .then(project => {
        post.title = req.body.title
        post.description = req.body.description
        post.tags = Array(req.body.tags)
        post.comments = Array(req.body.comments)
        post.date = Date.parse(req.body.date)
        post.User_id = req.body.User_id
 post.User_name = req.body.User_name

        post.save()
            .then(() => res.json('Project Updated !'))
            .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

// //add a project by client
// router.put("/:id/newsfreelancer", async (req, res) => {
//     // console.log(req.body);
//     Project.findById(req.params.id).then(project => {
//       let user = new User(req.body);
//       project.freelancer_ids.push(user._id)
//       project.save().then(check => {
//         res.send({ project, user, check })
//       })
//     })
//   })

//   router.put("/:id/users/freelancer", async (req, res) => {
//     // console.log(req.body);
//     Project.findById(req.params.id).then(project => {
//       let user = new User(req.body)
//       project.freelancer_id = user._id;
//       project.save().then(check => {
//         res.send({ project, client, check })
//       })
//     })
//   })
  

module.exports = router
