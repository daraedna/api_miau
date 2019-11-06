const Animal = require('../models/Animal');
const User = require('../models/User');


module.exports = {
    async store(req, res){
        const { filename } = req.file;
        const { species, breed, age, observation, sex } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({ error: 'User does not exists' });
        }

        const animal = await Animal.create({
            user: user_id,
            img: filename,
            species, 
            breed,
            age,
            observation,
            sex, 
        });
        
        return res.json({ animal });
    }
}