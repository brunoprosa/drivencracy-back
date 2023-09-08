import { db } from "../app.js"
import { MongoClient, ObjectId } from "mongodb"

export async function pollIdChoiceGet(req, res){

    const pollId = req.params.id
    
    try{

        const choices = await db.collection('choices').find({pollId: new ObjectId( pollId )}).toArray()
        if(choices.length === 0) return res.status(404).send('poll not found')

        res.send( choices )

    } catch(err){
        return res.status(500).send(err.message);
    }

}