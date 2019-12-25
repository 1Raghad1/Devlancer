const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require('../models/User')

//const router = express.Router()

//request /User/
// router.route('/').get((req,res) =>{
//     //list of all the user in json
//     User.find()
//     .then(user =>{ 
//         for (user in all){
//             all[user].password = "Hashed Password"
//         }res.json(user)
//     })
//     .catch(err => res.status(400).json('Error: ' + err))
// })


router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User(req.body)
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            console.log(newUser.password)

            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  })


// router.post("/register", (req, res) => {
//     const newUser = { ...req.body };
//     User.findOne({ email: newUser.email })
//       .then(user => {
//         if (!user) {
//           bcrypt.hash(newUser.password, 10, (err, hash) => {
//             newUser.password = hash;
//             User.create(newUser)
//               .then(user =>
//                 res.json(`user ${newUser.email} created successfully`)
//               )
//               .catch(err => res.send(err));
//           });
//         } else {
//           res.send("Exists,Use a different email");
//         }
//       })
//       .catch(err => res.send(err));
// });

router.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Find user by email
    User.findOne({ email }).then(async user => {
        // Check if user exists
        if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then( async isMatch => {
        if (isMatch) {
            // User matched
            // Create JWT Payload
            user.state = true
            const payload = {
              id: user.id,
              name: user.firstname,
              state: user.state,
              type: user.type
            };
    // Sign token
            jwt.sign(
              payload,
              process.env.JWT_KEY,
              {
                expiresIn: 31556926 // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
      });
    });
// router.post("/login", (req, res) => {
//     // Form validation
//   const { errors, isValid } = validateLoginInput(req.body);
//   // Check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//   const email = req.body.email;
//     const password = req.body.password;
//   // Find user by email
//     User.findOne({ email }).then(user => {
//       // Check if user exists
//       if (!user) {
//         return res.status(404).json({ emailnotfound: "Email not found" });
//       }
//   // Check password
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//           // User matched
//           // Create JWT Payload
//           const payload = {
//             id: user.id,
//             name: user.name
//           };
//   // Sign token
//           jwt.sign(
//             payload,
//             keys.secretOrKey,
//             {
//               expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: "Bearer " + token
//               });
//             }
//           );
//         } else {
//           return res
//             .status(400)
//             .json({ passwordincorrect: "Password incorrect" });
//         }
//       });
//     });
//   });

// router.get('/users/me', auth, async(req, res) => {
//     // View logged in user profile
//     res.send(req.user)
// })

// router.post('/users/me/logout', auth, async (req, res) => {
//     // Log user out of the application
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token != req.token
//         })
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// router.post('/users/me/logoutall', auth, async(req, res) => {
//     // Log user out of all devices
//     try {
//         req.user.tokens.splice(0, req.user.tokens.length)
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })




//login
// router.post("/login", (req, res) => {
//     User.findOne({ email: req.body.email })
//       .then(user => {
//         if (user) {
//           if (bcrypt.compareSync(req.body.password, user.password)) {
//             user.password = "";
//             let payload = { user };
//             let token = jwt.sign(payload, process.env.SECRET_KEY, {
//               expiresIn: "24h"
//             });
//             res.json({ msg: "logged in successfully", token: token });
//           } else {
//             res.send("password is not correct");
//           }
//         } else {
//           res.send("email not found");
//         }
//       })
//       .catch(err => {res.send(err)});
//   });

//   router.get("/profile/:id", (req, res) => {
//     User.findById(req.params.id)
//       .then(user => {
//         user.password = "";
//         user ? res.json(user) : res.json("user not found");
//       })
//       .catch(err => res.send(err));
//   });

router.route('/all').get((req,res) =>{
  //list of all the Project in json
  User.find()
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err))
})

// //calling id as var an object 
// //return info about that object
// //pass id by url
// router.route('/:id').get((req,res) => {
//     User.findById(req.params.id)
//     .then(user => res.json(user))
//     .catch(err => res.status(400).json('Error: ' + err))
// })
// //delete
// //pass id by url
// router.route('/:id').delete((req,res) => {
//     User.findByIdAndDelete(req.params.id)
//     .then(() => res.json('User Deleted !'))
//     .catch(err => res.status(400).json('Error: ' + err))
// })
// //update 
// //pass id by url
// router.route('/update/:id').post((req,res) => {
//     User.findById(req.params.id)
//     .then(user => {
//         user.title = req.body.title
//         user.description = req.body.description
//         user.price_from = Number(req.body.price_from)
//         user.price_to = Number(req.body.price_to)
//         user.date = Date.parse(req.body.date)

//         user.save()
//             .then(() => res.json('User Updated !'))
//             .catch(err => res.status(400).json('Error: ' + err))
//     })
//     .catch(err => res.status(400).json('Error: ' + err))
// })

// router.put("/:id/projects/newproject", async (req, res) => {

//     User.findById(req.params.id).then(user => {
//       let project = new Project(req.body);
//       user.project.push(projrct._id);
//       project.save();
//       user.save().then(check => {
//         res.send({ project, user, check });
//       });
//     });
//   })

module.exports = router
