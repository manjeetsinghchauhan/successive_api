const {
    User
  } = require(__basedir+'/api/models');
  
  const config = require(__basedir+'/config');
  
  module.exports = {

    // create a user
    async create(req, res) {
      try {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var phone = req.body.phone;

        User.create({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
          }).then(function (_data) {
            const user = {
                userid: _data.uuid,
                firstName: _data.firstName,
                lastName: _data.lastName,
                phone: _data.phone
            }
            res.status(201).json({
                message: 'User created',
                data: user
            });
          }).error((err)=>{
            console.log(err);
            res.status(500).json({
              error: err
            })
          })
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err
        })
      }
    },

    // Find all users
    async find(req, res) {
      User.findAll().then(function(_data){
          if(_data.length > 0){
            res.status(200).json({
              message: 'Users data',
              data: _data
            });
          }
      }).error((err)=>{
        console.log(err);
        res.status(500).json({
          error: err
        })
      })
    },

    // Find users by id
    async findById(req, res) {
      var uuid = req.params.uuid;
      User.findOne({
        where:{
          uuid: uuid
        }
      }).then(function(_data){
        res.status(200).json({
          message: 'Users data',
          data: _data
        });
      }).error((err)=>{
        console.log(err);
        res.status(500).json({
          error: err
        })
      })
    },

    // update a user
    async edit(req, res) {
      try {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var phone = req.body.phone;
        var uuid = req.body.uuid;
        User.update({
          firstName: firstName,
          lastName: lastName,
          phone: phone,
        },{
          where:{uuid:uuid}
        })
        .then(function (_data) {
          res.status(200).json({
              message: 'User updated',
              data: null,
              request:{
                type: "GET",
                url: "http://localhost:3000/users/" + uuid
              }
          });
        }).error((err)=>{
          console.log(err);
        res.status(500).json({
          error: err
        })
        })
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err
        })
      }
    },

    // delete a user
  async delete(req, res) {
    try {
      var uuid = req.params.uuid;
      User.destroy({
        where:{uuid:uuid}
      }).then(function(){
        res.status(200).json({
          message: 'User deleted'
        });
      }).error((err)=>{
        console.log(err);
        res.status(500).send({
          error: 'An error occured'
        })
      }) 
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'An error occured'
      })
    }
  },
 }