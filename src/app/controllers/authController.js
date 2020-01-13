const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const IncomingForm = require('formidable').IncomingForm;

const authConfig = require('../../config/auth');

const User = require('../models/User');

module.exports = { 

     //login
     async index(req, res){

          const { email, password } = req.body;
          
          const user = await User.findOne({ email }).select('+password');


          if (!user){
               return res.status(200).json({ error: 'User not found' });
          }

          if (!await bcrypt.compare(password, user.password)){
               return res.status(200).send({ error: 'Invalid password' });
          }

          const token =  await jwt.sign({ id: user.id }, authConfig.secret, {
               expiresIn: 86400,
          });

          user.password = undefined;

          res.json({ user, token });   
     },


     //register
     async store({body}, res){
          
          const { email } = body;

          try {
               const userAlreadyExists = await User.findOne({ email });

               if(userAlreadyExists){
                    res.status(200).json({ error: 'User already exists' });
               }
               else{
                    const user = await User.create(body);
                    
                      res.status(200).json({
                         sucess: 'User created',
                         user
                    });
               }
          } catch (error) {
              res.status(200).json({ error: 'TA ERRADO'}); 
          }
     }
}