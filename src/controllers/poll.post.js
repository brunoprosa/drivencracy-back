import { db } from "../app.js"
import dayjs from "dayjs"
import { pollSchema } from "../schemas/poll.schema.js"

export async function pollPost(req, res){
    
    const { title, expireAt } = req.body

    if(expireAt === undefined) expireAt = dayjs().add(30, 'day')
        .format('YYYY-MM-DD HH:mm')

    const validation = pollSchema.validate(req.body, { abortEarly: false })
    if (validation.error) { 
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try{

        const poll = { title, expireAt }
        await db.collection('polls').insertOne( poll )
        res.status(201).send( poll )

    } catch(err){
        return res.status(500).send(err.message);
    }
}