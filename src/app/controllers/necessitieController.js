const Necessitie = require('../models/Necessitie');
const Inst = require('../models/Inst');

module.exports = {  

    async index(req, res){
        const  necessities = await Necessitie.find();

        return res.json({ necessities });
    },

    async store(req, res){
        const { name, qtd, obs} = req.body;
        const { inst_id } = req.headers;

        const inst = await Inst.findById(inst_id);

        if(!inst){
            return res.status(400).json({ error: 'Inst does not exists' });
        }

        const necessitie = await Necessitie.create({
            name,
            qtd,
            obs,
            inst_id,
            inst: inst.nameInst
        });
        
        return res.json({ necessitie });
    }
}