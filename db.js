import { Low as low, JSONFileSync as FileSync } from 'lowdb';
import lodash from 'lodash'


const adapter = new FileSync('db.json');
const db = new low(adapter);
db.data = { annonce: [] }
await db.read()
db.chain = lodash.chain(db.data)









export const listAnnonce = () => {
  if (db.chain == undefined) {
    db.write()
  }
  let dbAnnonce = db.chain.get("annonce").value()

  return dbAnnonce

}
//--------------------------------------------Nouveau compte---------------------------------------------------------------

//ajoute un nouvel utilisateur si il créer son compte
export const NouveauCompte = (info) => {

  //transforme l'info en object
  let nouveauMembre = Object.values(info)


  // crééer un id qui sera +1 a l'id de la bd la plus haute en plusieur etape:


  // d'abord verifie le dernier objet dans la bd 
  let longueur = db.chain.get("annonce").value().length - 1

  let number

  if (longueur != -1) {



    //ensuite ajoute l objet dans une varible
    let toto = db.chain.get("annonce").slice(longueur).find("id").value()

    //recupere l'id dans lobjet en question 

    let plusGrandId = toto.id

    //prend l'information et dit bien que ceci est un nombre
    number = Number(plusGrandId) + 1

  } else {
    number = 1
  }

  // ajoute la donné recupéré la variable nouveau membre , sauf l'id qui sera un "+1" du dernier id dans la bd
  db.data.annonce.push({ id: number, Nom: nouveauMembre[0], Mdp: nouveauMembre[1], age: nouveauMembre[2], imc: [{ taille: nouveauMembre[3], poids: nouveauMembre[4] }] })
  // ecrit dans le script bd.json 
  db.write()


  let PoisNombre = Number(nouveauMembre[4])
  let TailleNombre = Number(nouveauMembre[3])

  let imc = PoisNombre / ((TailleNombre * TailleNombre) / 10000)

  //console.log(imc)
  return imc

}



//______________________________________Ajout IMC ___________________________________________________________________


export const NouveauIMC = (id,body) => {


// recupere id du client et information body ( taille et poids)

// parse l id en integer
let idrecup =Number(id)  

// recherche l'id lié au client dans la BD 
let ImcBd = db.chain.get("annonce").find({id: idrecup}).value()

//  ajoute le tableaux recuperé dans la variable imcBd (.imc est le nom du tableaux )
let imctable=ImcBd.imc
//push les nouvelle info dans le tableau
imctable.push(body)

//ajoute le tableaux et ecrase l ancien dans la save du client lié a l'id recuperer 
db.chain.get("annonce").find({id: idrecup}).imc = imctable

//ecrit dans le fichié
db.write()


}