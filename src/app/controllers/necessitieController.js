const Necessitie = require('../models/Necessitie');
const Inst = require('../models/Inst');

module.exports = {  

    async filter(req, res){
        const { inst_id } = req.headers;
        const  necessities = await Necessitie.find({inst_id});
    
        return res.json({ necessities });
    },

    async delete(req, res){
        const { inst_id } = req.headers;
        const inst = await Inst.findById(inst_id);

        if (!inst) {
            return res.status(200).json({ error: 'Inst does not exists' }); 
        }

        await Necessitie.deleteOne({_id: req.body._id});

        const  necessities = await Necessitie.find({inst_id});
    
        return res.json({ necessities });
    },

    async store(req, res){
        const { name, qtd, obs} = req.body;
        const { inst_id } = req.headers;

        const inst = await Inst.findById(inst_id);

        if(!inst){
            return res.status(200).json({ error: 'Inst does not exists' });
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