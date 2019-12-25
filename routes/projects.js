//exprss router router  we created
const router = require('express').Router()
// require the model first 
let Project = require('../models/Project')

//request /Project/
router.route('/all').get((req,res) =>{
    //list of all the Project in json
    Project.find()
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err))
})

///Project/add
router.route('/add').post((req,res) => {
    const title = req.body.title
    const description = req.body.description
    const price = Number(req.body.price)
    const type = req.body.type
    const pic = req.body.pic
    const tags = req.body.tags
    const client_id =  req.body.client_id

    const newProject = new Project({
        title,
        description,
        price,
        type,
        pic,
        tags,
        client_id
    })
    //save in data base 
    newProject.save()
    .then(() => res.json('Project Added !'))
    .catch(err => res.status(400).json('Error: ' + err))
})
//calling id as var an object 
//return info about that object
//pass id by url
router.route('/:id').get((req,res) => {

    Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err))
})
//delete
//pass id by url
router.route('/:id').delete((req,res) => {
    Project.findByIdAndDelete(req.params.id)
    .then(() => res.json('Project Deleted !'))
    .catch(err => res.status(400).json('Error: ' + err))
})
//update 
//pass id by url
// router.route('/update/:id').post((req,res) => {
//     Project.findById(req.params.id)
//     .then(project => {
//         project.title = req.body.title
//         project.description = req.body.description
//         project.price_from = Number(req.body.price_from)
//         project.price_to = Number(req.body.price_to)
//         project.date = Date.parse(req.body.date)

//         project.save()
//             .then(() => res.json('Project Updated !'))
//             .catch(err => res.status(400).json('Error: ' + err))
//     })
//     .catch(err => res.status(400).json('Error: ' + err))
// })

//add a project by client
router.post("/:id/addfreelancer/:u_id", async (req, res) => {
  console.log("route1111");
  console.log(req.params.id);
  console.log(req.params.u_id);
  
  Project.findByIdAndUpdate(req.params.id)
  .then(project =>{
    project.freelancer_ids.push(req.params.u_id)
  
  project.save()
            .then(() => res.json('Project Updated !'))
            .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
  //{ $push:{ name: ooo}}
    // console.log(req.body);
    // Project.findById(req.params.id).then(project => {
    //   // let user = new User(req.body);
    //   project.freelancer_ids.push(u_id)
    //   project.save().then(check => {
    //     console.log("ewrwr");
        
    //     res.send({ project, check })
    //   })
    // })
   })

  // router.put("/:id/users/freelancer", async (req, res) => {
  //   // console.log(req.body);
  //   Project.findById(req.params.id).then(project => {
  //     let user = new User(req.body)
  //     project.freelancer_id = user._id;
  //     project.save().then(check => {
  //       res.send({ project, client, check })
  //     })
  //   })
  // })
  

module.exports = router
