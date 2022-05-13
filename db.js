import {Low as low, JSONFileSync as FileSync} from 'lowdb';
import lodash from 'lodash'


const adapter = new FileSync('db.json');
const db = new low(adapter);
db.data={annonce:[]}
await db.read()
db.chain = lodash.chain(db.data)









export const listAnnonce=()=>{
    if(db.chain==undefined){
    db.write() }
    

      let dbAnnonce = db.chain.get("annonce").value()
       
      
    
    return dbAnnonce

  }


