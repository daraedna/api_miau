const Animal = require('../models/Animal');
const User = require('../models/User');

module.exports = {  
    async index(req, res){
        const  animals = await Animal.find();

        return res.json({ animals });
    },

    async delete(req, res){
        const { user_id } = req.headers;
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(200).json({ error: 'user does not exists' }); 
        }

        await Animal.deleteOne({_id: req.body._id});

        const  animals = await Animal.find({user_id});
    
        return res.json(animals);
    },

    async store(req, res){
        const { filename } = req.file;
        const { species, breed, age, observation, sex, size} = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({ error: 'User does not exists' });
        }

        const animal = await Animal.create({
            user_id,
            user: user.name,
            img: filename,
            species, 
            breed,
            age,
            observation,
            sex, 
            size
        });
        
        return res.json({ animal });
    }
}