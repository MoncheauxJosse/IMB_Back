import bcrypt from 'bcrypt'

export const Hashcode = async(password) =>{


    try{
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash (password,salt)

        console.log(hashPassword);

        return hashPassword

    }catch{


        return "erreur dans le haschcode"
    }



}


export const Compare = async (mdp,mdpDb)=>{

    
    try{
        

        if (await bcrypt.compare(mdp,mdpDb)){
          return true
        }else{

            return false
        }
    
    
      }catch{


        return "erreur"


      }

}