import express from "express"
import cors from "cors"
import {listAnnonce,NouveauCompte} from "./db.js"

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

api.listen(80, () => {
   
   
})