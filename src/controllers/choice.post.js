import { db } from "../app.js"
import dayjs from "dayjs"

export async function choicePost(req, res){
    
    const { title, pollId } = req.body

    const validation = pollSchema.validate(req.body, { abortEarly: false })
    if (validation.error) { 
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {

        const existPoll = await db.collection('polls').find({ _id: new ObjectId( pollId ) }).toArray()
        if(existPoll.length === 0) return res.status(404).send('poll not found')
    
        const existChoice = await db.collection('choices').find({ pollId: new ObjectId( pollId ), title }).toArray()
        if(existChoice.length === 1) return res.status(409).send('this title alredy exist')

        if( dayjs().isAfter(dayjs(existPoll[0].expireAt))) return res.status(403).send('this poll alredy expire')

        await db.collection('choices').insertOne({
            title,
            pollId: new ObjectId( pollId )
        })
        res.status(201).send('choice created')

    } catch(err){
        return res.status(500).send(err.message);
    }

}