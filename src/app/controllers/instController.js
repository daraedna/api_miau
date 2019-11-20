const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const Inst = require('../models/Inst');

module.exports = {
     
      // login
      async index(req, res){

          const { emailInst, passwordInst} = req.body;
          
          const inst = await Inst.findOne({ emailInst }).select('+passwordInst');

          if (!inst){
               return res.status(200).json({ error: 'inst not found' });
          }

          if (!await bcrypt.compare(passwordInst, inst.passwordInst)){
               return res.status(200).send({ error: 'Invalid password' });
          }

          const tokenInst = jwt.sign({ id: inst.id }, authConfig.secret, {
               expiresIn: 86400,
          });

          inst.passwordInst = undefined;

          res.json({ inst, tokenInst });
          
     },


     //register
     async store(req, res){
          const { nameInst, emailInst, passwordInst, phoneInst, descritionInst, cityInst, stateInst } = req.body;
          try {
               const instAlreadyExists = await Inst.findOne({ emailInst });

               if(instAlreadyExists){
                    res.status(200).json({ error: 'Inst already exists' });
               }
               else{
                    await Inst.create({ emailInst, passwordInst, nameInst, phoneInst, descritionInst, cityInst, stateInst });
                    
                    res.status(200).json({
                         sucess: 'Inst created',
                         inst: { emailInst, nameInst, phoneInst, descritionInst, cityInst, stateInst  }
                    });
               }
          } catch (error) {
              res.status(200).json({ error }); 
          }
     }
}