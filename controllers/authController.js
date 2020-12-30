const jwt = require('jsonwebtoken');
const User = require('../models/user');

// <POST> login
exports.login = async (req, res) => {
    const loginDetail = {
        email: req.body.email,
        password: req.body.password
    }
    try{
        if(!loginDetail.email || !loginDetail.password){
            return res.status(400).json({ msg: "Please include both email and password." });
        }
        else {
            const user = await User.findOne({email: loginDetail.email});
            
            if(user) {
                if(user.password == loginDetail.password) {
                    jwt.sign({user}, process.env.APP_SECRET, (err, token) => {
                        if(err) {
                            res.send({ error: err });
                        }
                        else{
                            res.status(200).json({ msg: " Login successful", token: token })
                        }
                    })
                }
                else{
                    res.status(400).json({ msg: "Incorrect credentials." });
                }
            }
        }
    } catch (error) {
        res.send('Error : ' + error);
    }
};