

export const register= async (req,res,next)=>{
   
    try{

        throw new Error('User Already exist')
    }catch(err){

        err.status = 409
        next(err)
    }


}