

const Inst = require('../models/Inst');


module.exports = {  
 //listar intituições
    async index(req, res){
        const  insts = await Inst.find()

        return res.json({ insts });
    }

  
}