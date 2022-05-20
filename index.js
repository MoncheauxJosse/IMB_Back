import express from "express"
import cors from "cors"
import {listAnnonce,NouveauCompte,NouveauIMC,Connect} from "./db.js"


//Notre objet express
const api = express()



//Utilisation d'un middleware json
api.use(express.json())

api.use(cors({origin:"*"}))

api.get('/annonce', (req, res) => {
    res.json(listAnnonce())
})



//_________________________________________________________INSCRIPTION_______________________________________
//recupere les donné du front 
api.post('/inscription', (req, res) => {

    NouveauCompte(req.body)

    res.json("ok")
    
})



//_______________________________________________________NOUVEAU_IMC_____________________________________________________


//recupere l 'id du client via le params.id ( inscrit dans le lien ) et les donné dans le body . Ceci ce fait dans nouveauxImc/ {id du client}
api.post('/NouveauImc/:id', (req, res) => {

    
//envoie le information recupere dans db.js 
    NouveauIMC(req.params.id,req.body)

    //renvoie ok au client
    res.json("ok")
    
})

//_______________________________________________________CONNECTION________________________________________

api.get('/Connection/:mdp/:nom', (req, res) => {

     let conection =Connect(req.params.nom,req.params.mdp)

     
     //si la reponse est diffent de false 

     console.log(conection)
     if(conection!== false){


        // renvoie le tableau ainsi [id,TableIMC[imc,...]]
        res.json({messaage:"c bon",conection, erreur:true})

        //sinon renvoie un message erreur
     }else{

        res.json("erreur dans les informations données")

     }

})



//_____________________________________________________Lancement API_______________________________________________________
api.listen(80, () => {
   
   
})