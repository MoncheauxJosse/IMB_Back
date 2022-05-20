import { Low as low, JSONFileSync as FileSync } from 'lowdb';
import lodash from 'lodash'
//import { Hashcode } from './service/cryptage';


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

  //créer une date
  let dateImc= new Date

  //passe par le Hashcode
 //let password= Hashcode(nouveauMembre[1])


  console.log(dateImc)
  // ajoute la donné recupéré la variable nouveau membre , sauf l'id qui sera un "+1" du dernier id , dans la bd
  db.data.annonce.push({ id: number, Nom: nouveauMembre[0], Mdp:nouveauMembre[1], age: nouveauMembre[2], imc: [{date: dateImc, taille: nouveauMembre[3], poids: nouveauMembre[4] }] })
  // ecrit dans le script bd.json 
  db.write()

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
let dateImc= new Date
//push les nouvelle info dans le tableau
imctable.push({"date": dateImc,"taille":body.taille,"poids":body.poids})

//ajoute le tableaux et ecrase l ancien dans la save du client lié a l'id recuperer 
db.chain.get("annonce").find({id: idrecup}).imc = imctable

//ecrit dans le fichié
db.write()


}

//___________________________________________connection_______________________________________

export const Connect = (mdp,nom) => {

//transforme l'info en object


//SI il n'y a pas le nom et le mot de passe dans la bd
if(!db.chain.get("annonce").find({Nom: nom,Mdp: mdp}).value()){


// retourne faux
return false

}else{
  
//sinon recupere les donné de la personne qui veut ce connecté
  let idco =db.chain.get("annonce").find({Nom: nom,Mdp: mdp}).value()

   
// recupere le tableaux dans la donnée
let TableInfofIMC= idco.imc

 //créer un nouveaux tableaux vide qui va prendre la date ( id) et les donné du IMC calculé
let TalbeIMC=[]

//lance un for pour trier le tableaux a l'aide de ca longeur (lenght) pour recupérer le poids et la taille
 for(let i=0 ; i< TableInfofIMC.length;i++){

//recupere dans le tableaux le poid et la taille et stipule que cela sont des nombres , [i] represente dans qu'elle objet nous somme 
// a chaque iteration i augmente de +1
  let Pois = Number(TableInfofIMC[i].poids)
  let Taille =Number(TableInfofIMC[i].taille)

 

// fait le calcul du imc
  let imc = Pois / ((Taille * Taille) / 10000)

  //ajoute via push les donné de la date de l objet ( qui sera l identifiant) et l'imc calculer dans le tableaux vide
  TalbeIMC.push({dateID:TableInfofIMC[i].date,imc:imc})

  // enfin remonte en haut du fort si la longeur du tableaux n'est pas fini 
 }

  //renvoie un Objet avec l'idClient et le tableauImc
  return [{idClient:idco.id,TalbeIMC}]

}
}

