import express from "express"
import cors from "cors"
import {listAnnonce,NouveauCompte,NouveauIMC,RetourDonné,Connect, RetourImc} from "./db.js"



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



    let Mdp =req.body.Mdp
    let Nom =req.body.Nom
    let age =req.body.age
    let taille =req.body.taille
    let poids =req.body.poids


    Nom=Nom.split(/ +/g,"")
    Mdp=Mdp.split(/ +/g,"")
    age =age.split(/ +/g,"")
    taille=taille.split(/ +/g,"")
    poids=poids.split(/ +/g,"")
 

    if(Nom== ''||Mdp== ''||age== '' ||taille== '' ||poids== ''){
        

        res.json("certains champs sont vides ")
    }else{
    NouveauCompte(req.body)

    res.json("ok")
}
})



//_______________________________________________________NOUVEAU_IMC_____________________________________________________


//recupere l 'id du client via le params.id ( inscrit dans le lien ) et les donné dans le body . Ceci ce fait dans nouveauxImc/ {id du client}
api.post('/NouveauImc/:id', (req, res) => {

    
    let taille =req.body.taille
    let poids =req.body.poids

    taille=taille.split(/ +/g,"")
    poids=poids.split(/ +/g,"")

    if(taille== '' ||poids== ''){
        

        res.json("certains champs sont vides ")
    }else{

    
//envoie le information recupere dans db.js 
    NouveauIMC(req.params.id,req.body)

    //renvoie ok au client
    res.json("ok")
    }
    
})

//_______________________________________________________CONNECTION________________________________________

api.get('/Connection/:nom/:mdp',async (req, res) => {

    Connect(req.params.mdp,req.params.nom)

     

     
     //si la reponse est diffent de false 

   
     let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1500)
      });


      let result = await promise;

      let conection = RetourDonné(req.params.mdp,req.params.nom)

     console.log("retour de la connection "+ conection)

     if (conection != undefined && conection != false){

        console.log("ligne 74"+ conection)


         // renvoie le tableau ainsi [id,TableIMC[imc,...]]
         res.json({connection:conection, erreur:false})

        //sinon renvoie un message erreur
     }else{

        res.json("erreur dans les informations données")

     }
  
})

api.get('/Accueil/:id',async (req, res) => {


    let retourDonné = RetourImc(req.params.id)

    res.json({retourimc:retourDonné})

})

//_____________________________________________________Lancement API_______________________________________________________
api.listen(80, () => {
   
   
})