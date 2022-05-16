import express from "express"
import cors from "cors"
import {listAnnonce,NouveauCompte,NouveauIMC} from "./db.js"

//Notre objet express
const api = express()



//Utilisation d'un middleware json
api.use(express.json())

api.use(cors({origin:"*"}))

api.get('/annonce', (req, res) => {
    res.json(listAnnonce())
})



//recupere les donné du front 
api.post('/inscription', (req, res) => {

    res.json(NouveauCompte(req.body))
    
})

//recupere l 'id du client via le params.id ( inscrit dans le lien ) et les donné dans le body . Ceci ce fait dans nouveauxImc/ {id du client}
api.post('/NouveauImc/:id', (req, res) => {

    
//envoie le information recupere dans db.js 
    NouveauIMC(req.params.id,req.body)

    //renvoie ok au client
    res.json("ok")
    
})

api.listen(80, () => {
   
   
})