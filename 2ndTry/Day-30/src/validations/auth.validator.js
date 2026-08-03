import {body,validationResult} from "express-validator"

const validate = (req,res,next)=>{

    const error  = validationResult(req)

    if(error.isEmpty()){

        return next()
    }

    res.status(400).json({
        errors : error.array()
    })
}

export const registerValidation = [
    body('username').isString().withMessage("username must be string"),
    body("email").isEmail().withMessage("email must be a valid email address "),
    body("password").custom((value)=>{

        if(value.length<8){
            throw new Error("password should be atleast 8 characters")
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

            if(!passwordRegex.test(value)){
                throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
            }
        }
        
    }),
    validate
]
