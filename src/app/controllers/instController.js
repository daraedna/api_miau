const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const Inst = require('../models/Inst');

module.exports = {
     
      // login
     async index(req, res){

          const { email, password } = req.body;
          
          const inst = await Inst.findOne({ email }).select('+passwordInst');

          const { id, nameInst, phoneInst } = inst;

          const response = { id, emailInst, nameInst, phoneInst,descritionInst, cityInst, stateInst }

          if (!inst){
               return res.status(404).json({ error: 'Inst not found' });
          }

          if (!await bcrypt.compare(password, inst.password)){
               return res.status(400).send({ error: 'Invalid password' });
          }

          const token = jwt.sign({ id: inst.id }, authConfig.secret, {
               expiresIn: 86400,
          });

          res.json({ inst: response, token });
     },

     //register
     async store(req, res){
          const { emailInst, passwordInst, nameInst, phoneInst, descritionInst, cityInst, stateInst } = req.body;
          try {
               const instAlreadyExists = await Inst.findOne({ emailInst });

               if(instAlreadyExists){
                    res.status(409).json({ error: 'Inst already exists' });
               }
               else{
                    await Inst.create({ emailInst, passwordInst, nameInst, phoneInst, descritionInst, cityInst, stateInst });
                    
                    res.status(200).json({
                         sucess: 'Inst created',
                         inst: { emailInst, nameInst, phoneInst, descritionInst, cityInst, stateInst  }
                    });
               }
          } catch (error) {
              res.status(400).json({ error }); 
          }
     }
}