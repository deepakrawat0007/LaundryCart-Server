const router = require('express').Router();
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const secret = "HelloUser"

router.post('/login'
    , async (req, res) => {
        try {
            const { username, password } = req.body; //username is phone or email

            //check user exists or not?
            const isUser = isNaN(Number(username))
              ? await User.findOne({ email: username })
              : await User.findOne({ phone: username });
            if (!isUser) {
                return res.status(400).json({
                    "Message": "No User Exists With given Mail-id / Phone Number"
                })
            } else {
                bcrypt.compare(req.body.password, isUser.password, function (err, result) { // comparing password
                    if (err) {
                        return res.status(400).json({
                            "Message": err.message
                        })
                    }
                    if (result) {
                        const token = jwt.sign({             //pwd crrct creating jwt
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: isUser._id
                        }, secret);

                        return res.status(200).json({
                            "Message": `Logged In SuccessFully Welcome ${isUser.name}`,
                            "Name": isUser.name,
                            "Address":isUser.address,
                            "Token": token
                        })
                    } else {
                        return res.status(400).json({
                            "Message": "Invalid Credentials"
                        })
                    }

                })

            }



        } catch (e) {
            return res.status(400).json({
                "Message": e.message
            })
        }
    })

module.exports = router;