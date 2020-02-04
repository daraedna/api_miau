const Necessitie = require('../models/Necessitie');
const Inst = require('../models/Inst');

module.exports = {  

    async filter(req, res){
        const { inst_id } = req.headers;
        const  necessities = await Necessitie.find({inst_id});
    
        return res.json({ necessities });
    },

    async index (req, res) {
        const necessities = await Necessitie.find();

        return res.json({ necessities });
    },

    async delete(req, res){
        const { inst_id } = req.headers;
        const inst = await Inst.findById(inst_id);

        if (!inst) {
            return res.status(200).json({ error: 'Inst does not exists' }); 
        }

        await Necessitie.deleteOne({_id: req.params.id});

        const  necessities = await Necessitie.find({inst_id});
    
        return res.json({ necessities });
    },

    async store(req, res){
        const { filename } = req.file;
        const { name, qtd, uni_medida, obs} = req.body;
        const { inst_id } = req.headers;

        const inst = await Inst.findById(inst_id);

        if(!inst){
            return res.status(200).json({ error: 'Inst does not exists' });
        }

        const necessitie = await Necessitie.create({
            img_nec: filename,
            name,
            qtd,
            uni_medida,
            obs,
            inst_id,
            inst: inst.nameInst,
            phoneInst: inst.phoneInst 
        });
        
        return res.json({ necessitie });
    }
}
