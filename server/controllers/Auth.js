const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken"); 
require("dotenv").config();

// SEND OTP  to send otp we need  email , otp
//check if user exists yes then return else generate a unique otp and send to the db (when we try to store a mail with the otp will be forwarded to the email)
exports.sendOtp = async (request, response) => {
    try {
        // fetched email 
        const { email } = request.body;
        // check if user exist or not 
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return response.status(401).json({
                success: false,
                message: "User Already Exists"
            })
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });
        console.log(otp);
        // verify that otp is unique
        let checkOtp = OTP.findOne({ otp: otp });
        // while (checkOtp) {
        //     otp = otpGenerator.generate(6, {
        //         upperCaseAlphabets: false,
        //         specialChars: false,
        //         lowerCaseAlphabets: false,
        //     });
        //     console.log("inside")
        // }
        // mail chli gyi
        const saved = OTP.create({
            email,
            otp
        })
        const otpPayload = { email, otp };
		console.log("OTP Body", otpPayload);
        return response.status(200).json({
            success: true,
            message: "Otp Sent Successfully"
        })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({
            success: false,
            message: "Failed to Send Otp"
        })
    }
}

//SignUp 
exports.signUp = async (request, response) => {
    // fetch data  
    try {
        const { firstName, lastName, email, contact, password, confirmPassword, accountType, otp } = request.body;
        // validate the data 
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
          return  response.status(403).json({
                success: false,
                message: " All Fields Are Mandatory"
            })
        }

        // 2 password match
        if (confirmPassword !== password) {
           return  response.status(400).json({
                success: false,
                message: "Both passwords are not same"
            })
        }

        // check if user exist or not 
        const checkUser = await User.findOne({ email });
        if (checkUser) {
           return  response.status(400).json({
                success: false,
                message: "User Already exists with this email"
            })
        }
        // fetch the recent otp  and match with input otp
        
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        // console.log("Recent otp", recentOtp);

        console.log(recentOtp);
        
        if (( recentOtp.length === 0)) {
            return response.status(400).json({
                success: false,
                message: "OTP Not Found"
            })
        }
        // console.log(type(recentOtp.otp))
        if(recentOtp[0].otp == otp)
        {
            const profileDetails = await Profile.create({
                gender: null,
                dateofbirth: null,
                about: null,
                contact: null
            })
            const hashedPassword = await bcrypt.hash(password, 10);
            // store it to db
            const signedUp = await User.create({
                firstName,
                lastName,
                email,
                accountType,
                password: hashedPassword,
                additionalDetails: profileDetails._id,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            });
            // return response
            return response.status(200).json({
                success: true,
                message: " User is Registered Successfully",
            })

        }
        else{
            return  response.status(400).json({
                        success: false,
                        message: "Invalid Otp"
                    })
        }
    }
    catch (err) {
        console.log("error in sing",err);
        return response.status(400).json({
            success: false,
            message: "Cant create the user ",
        })
    }
}

// Login
exports.logIn = async (request, response) => {
    // fetch
    try {
        const { email, password } = request.body;
        // validate
        if (!email || !password) {
            return response.status(403).json({
                success: false,
                message: "All fields required",
            })
        }
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return response.status(401).json({
                success: false,
                message: "User is not Registered please sign up",
            })
        }
        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user.password)) {
            require("dotenv").config();
            const payload = {
                email: user.email,
                id: user._id,
                role: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET);

            user.token = token;
            user.password = undefined;
            // create a cookie 
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
           return response.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: " login succed"
            })
        }
        else {
            response.status(400).json({
                success: false,
                message: "Password Incorrect"
            })
        }
    }
    catch (err) {
        response.status(500).json({
            success: false,
            message: "Eroor Ocurred"
        })
    }
}


//change password

exports.changePassword = async (req, res) => {
    //get data 
    // email oldPsw , newPsw confirmNewPassword    
    // update in db psw mail 
    try {
         console.log("changepsw")
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        const checkUser = await User.findById(req.user.id);
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User is not registered"
            })
        }

        if (!(bcrypt.compare(oldPassword, checkUser.password))){
            return res.status(400).json({
                success: false,
                message: "Old password is wrong"
            })
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(403).json({
                success: false,
                message: "Both password are different"
            })
        }

        // now change the password 
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);
        // have to send email response
        return res.status(200).json({
            success: true,
            message: "Password is changed"
        })
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({
            success: false,
            message: "error occur while changin password"
        })
    }
}

