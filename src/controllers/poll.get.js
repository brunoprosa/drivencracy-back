import { db } from "../app.js";

export async function pollGet(req, res){
    
    try{

        const polls = await db.collection('polls').find().toArray()
        res.send( polls )

    } catch(err){
        return res.status(500).send(err.message);
    }

}