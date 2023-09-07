import { db } from "../app.js"
import dayjs from "dayjs"

export async function choiceIdVotePost(req, res){
    
    const choiceId = req.params.id

    try{

        const choice = await db.collection('choices').find({_Id: new ObjectId( choiceId )}).toArray()
        if(choice.length === 0) return res.status(404).send('choice not found')

        const poll = await db.collection('polls').find({_id: new ObjectId( choice[0].pollId )}).toArray()
        const { expireAt } = poll[0]

        if( dayjs().isAfter(dayjs(expireAt))) return res.status(403).send('this poll alredy expire')
        
        const cretedAt = day.js().format('YYYY-MM-DD HH:mm')
        await db.collection('votes').insertOne({
            cretedAt,
            choiceId: new ObjectId( choiceId )
        })

        res.status(201).send('voto computado')

    } catch(err){
        return res.status(500).send(err.message);
    }

}