const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const Inst = require('../models/Inst');

const routes = express.Router();

function generateToken(params = {}) {
     return jwt.sign({params}, authConfig.secret, {
          expiresIn: 86400,
     });
}

//listar as insts
routes.get('/listInsts', async(req, res) => {
     try {
          const insts = await Inst.find();
          res.status(200).json({ insts });
     } catch (error) {
          res.status(400).json({ error });
     }
});

//Rota de registro
routes.post('/registerInst', async(req, res) => {

     const { nameInst, emailInst, passwordInst, phoneInst, descriptionInst } = req.body;

     try {
          const instAlreadyExists = await Inst.findOne({ nameInst });

          if(instAlreadyExists){
               res.status(400).json({ error: "institution already exists" });
          }
          else{
               const inst = { nameInst, emailInst, passwordInst, phoneInst, descriptionInst };

               await Inst.create(inst);

               res.status(200).json({ nameInst, emailInst, phoneInst, descriptionInst })
          }
     } catch (error) {
          res.status(400).json({ error });
     }
});


//Rota de login
routes.post('/authenticateInst', async (req, res) => {
     const { emailInst, passwordInst } = req.body;

     const inst = await Inst.findOne({ emailInst }).select('+passwordInst');

     if (!inst){
          return res.status(400).send({ error: 'Instituição not found' });
     }

     if (!await bcrypt.compare(passwordInst, inst.passwordInst)){
          return res.status(400).send({ error: 'Invalid password' });
     }

     inst.passwordInst = undefined;

     const token = jwt.sign({ id: inst.id }, authConfig.secret, {
          expiresIn: 86400,
     });

     res.send({ 
          inst,
          token: generateToken( { id: inst.id }),
      });

});

module.exports = app => app.use('/auth', routes);
module.exports = app => app.use('/authInst', routes);