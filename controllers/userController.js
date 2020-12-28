const User = require('../models/user');

const idRegEx  = /^[0-9a-fA-F]{24}$/;

// <GET> get all users
exports.index = ('/', async(req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(error) {
        res.send('Error : ' + error);
    }
});

// <POST> add user
exports.create = ('/', async(req,res) => {
    const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const user = await newUser.save();
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

// <GET> get one user
exports.userDetail = ('/:id', async(req,res) => {
    if(req.params.id.match(idRegEx)){
        try {
            const user = await User.findById(req.params.id).select("-password");
            if(user) {
                res.json(user);
            }
            else {
                res.status(400).json ({ msg: `No user with the id of ${req.params.id}` })
            }   
        } catch (error) {
            res.send('Error : ' + error);
        }
    }
    else{
        res.status(400).json ({ msg: "id is invalid" })
    }
});

// <PUT> update user
exports.update = ('/:id', async(req,res) => {
    if(req.params.id.match(idRegEx)){
        try {
            const user = await User.findById(req.params.id);
        
            if(user) {
                const updateuser = req.body;
    
                user.first_name = updateuser.first_name ? updateuser.first_name : user.first_name;
                user.last_name = updateuser.last_name ? updateuser.last_name : user.last_name;
                user.email = updateuser.email ? updateuser.email : user.email;
                user.status = updateuser.status ? updateuser.status : user.status;
                
                const t1 = await user.save();
                res.json(t1);
            }
            else {
                res.status(400).json ({ msg: `No user with the id of ${req.params.id}` });
            }
        } catch (error) {
            res.send('Error : ' + error);
        }
    }
    else{
        res.status(400).json ({ msg: "id is invalid" })
    }
});

// <DELETE> delete user
exports.delete = ('/:id', async(req,res) => {
    if(req.params.id.match(idRegEx)){
        try {
            const user = await User.findById(req.params.id);
        
            if(user) {
                await user.delete();
                res.json({msg: "user deleted"});
            }
            else {
                res.status(400).json ({ msg: `No user with the id of ${req.params.id}` })
            }
        } catch (error) {
            res.send('Error : ' + error);
        }
    }
    else{
        res.status(400).json ({ msg: "id is invalid" })
    }
});