const response = require('../common/response').response;
const emailValidator = require('email-validator');
const { passwordValidator } = require('../common/validation');
const User = require('../db/models/user');
const bcrypt = require('bcryptjs');


module.exports = {

    async userRegister(req, res) {
        try{
            // check requirement input field

            const {username , email , password} = req.body;
            if (!username){
                return res.status(500).send(response("username is require"));
            }
            if(!email){
                return res.status(500).send(response("email is require"));
            }
            if(!password){
                return res.status(500).send(response("password is require"));
            }

            //validate email
            if (!emailValidator.validate(email)){
                return res.status(500).send(response("email is invalid"));
            }
            //validate password
            if (!passwordValidator(password)) {
                return res.status(400).send(response('Password should contains at least one numeric digit, one uppercase and one lowercase letter between 8 to 20 characters'));
            }

            // generate hash password
            const salt = await bcrypt.genSalt(15);
            const hashPassword = await bcrypt.hash(password,salt);

            // check if email already register in db
            const existEmail = await User.findOne({email:email})
            if (existEmail){
                return res.status(500).send(response("email is already exist"));
            }

            // create user 
            const saveUser = new User({
                username:username,
                email:email,
                password:hashPassword,
            });

            const create = await saveUser.save();


            return res.status(200).send(response("successfull create user",{
                username:create.username,
                email:create.email,
                password:create.password
            }))
        }
        catch(err){
            console.log(err.message)
            return res.status(400).send(response("register fail"))
        }
    },

    //user login 
    async userLogin(req, res) {

        try{
            //check up requirement field
            const {email,password} = req.body;

            if (!email){
                return res.status(400).send(response("email is require"));
            }
            if(!password){
                return res.status(400).send(response("password is require"));
            }

            // check if email is exist in db or not 
            const user = await User.findOne({email:email});
            if (!user){
                return res.status(400).send(response("invalid email or password"));
            }

            //compare passwords 
            const comparePassword = await bcrypt.compare(password,user.password);
            if(!comparePassword){
                return res.status(400).send(response("invalid email or password"));
            }


            return res.status(200).send(response("login successful"));
            
        }catch(err){
            console.log(err.message)
            return res.status(500).send(response("fail to login"))
        }
    },

    //user update password
    async userUpdatePassword(req , res) {
        try {
            // check requirement field
            const {email , currentPassword , newPassword , comfirmNewPassword} = req.body;
            if (!email){
                return res.status(500).send(response("email is require"));
            }
            if (!currentPassword){
                return res.status(500).send(response("current password is require"));
            }
            if (!newPassword){
                return res.status(500).send(response("newpassword is require"));
            }
            if (!comfirmNewPassword){
                return res.status(500).send(response("confirm new password is require"));
            }
            if (!passwordValidator(newPassword || comfirmNewPassword)){
                return res.status(400).send(response('Password should contains at least one numeric digit, one uppercase and one lowercase letter between 8 to 20 characters'));    
            }

            // check is current password is match in the db
            const user = await User.findOne({email:email});
            const comparePassword = await bcrypt.compare(currentPassword , user.password);
            if (!comparePassword){
                return res.status(500).send(response("your current password is invalid"));
            }

            // check if newpassword is match with comfirmpassword
            if (newPassword != comfirmNewPassword){
                return res.status(500).send(response("new password and comfirm password is not match"));
            }

            //generate hash for newpassword
            const salt = await bcrypt.genSalt(15);
            const hashNewPassword = await bcrypt.hash(newPassword,salt);

            //update new hash password into db
            const updatePassword = await User.updateOne({email:email},{password:hashNewPassword});
        
            return res.status(200).send(response("succeessful updated password" , {
                username: user.username,
                email:user.email,
                password:hashNewPassword,
            }));

        } catch (error) {
            console.log(error.message);
            return res.status(500).send(response("fail to update password"));
        }
    }
}