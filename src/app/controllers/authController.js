const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const User = require('../models/User');

function generateToken(params = {}) {
     return jwt.sign({params}, authConfig.secret, {
          expiresIn: 86400,
     });
}

module.exports = {
     async index(req, res){

          const { email, password } = req.body;
          
          const user = await User.findOne({ email }).select('+password');

          const { id, name, phone } = user;

          const response = { id, email, name, phone }

          if (!user){
               return res.status(404).json({ error: 'User not found' });
          }

          if (!await bcrypt.compare(password, user.password)){
               return res.status(400).send({ error: 'Invalid password' });
          }

          const token = jwt.sign({ id: user.id }, authConfig.secret, {
               expiresIn: 86400,
          });

          res.json({ user: response, token });
     },

     async store(req, res){
          const { email, password, name, phone } = req.body;

          try {
               const userAlreadyExists = await User.findOne({ email });

               if(userAlreadyExists){
                    res.status(409).json({ error: 'User already exists' });
               }
               else{
                    await User.create({ email, password, name, phone });
                    
                    res.status(200).json({
                         sucess: 'User created',
                         user: { email, password, name, phone }
                    });
               }
          } catch (error) {
              res.status(400).json({ error }); 
          }
     }
}