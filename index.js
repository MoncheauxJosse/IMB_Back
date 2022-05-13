import express from "express"
import cors from "cors"
import {listAnnonce} from "./db.js"

//Notre objet express
const api = express()



//Utilisation d'un middleware json
api.use(express.json())

api.use(cors({origin:"*"}))

api.get('/annonce', (req, res) => {
    res.json(listAnnonce())
})




api.listen(80, () => {
    console.log(listAnnonce())
   
})