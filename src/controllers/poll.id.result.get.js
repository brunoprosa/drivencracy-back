import { db } from "../app.js"
import { MongoClient, ObjectId } from "mongodb"

export async function pollIdResultGet(req, res){
    const pollId = req.params.id
    let moreVotes = 0
    let moreVotedindex = 0
    let votes

    try{

        const arrayPoll = await db.collection('polls').find({_id: new ObjectId( pollId )}).toArray()
        if(arrayPoll.length === 0) return res.status(404).send('poll not found')
        let poll = arrayPoll[0]

        const choices = await db.collection('choices').find({pollId: new ObjectId( pollId )}).toArray()
        
        for(let i = 0; i < choices.length; i++){
            votes = await db.collection('votes').find({choiceId: new ObjectId( choices[i]._id )}).toArray()
            
            if( votes.length > moreVotes ){
                moreVotes = votes.length
                moreVotedindex = i
            }
        }

        const result = {
            title: choices[moreVotedindex].title,
            votes: moreVotes
        }

        const pollResult = {
            _id: poll._id,
            title: poll.title,
            expireAt: poll.expireAt,
            result
        }

        res.send( pollResult )

    } catch(err){
        return res.status(500).send(err.message);
    }
}