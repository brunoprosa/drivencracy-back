import {Router} from 'express'
import { choiceIdVotePost } from '../controllers/choice.id.vote.post'
import { choicePost } from '../controllers/choice.post'

const choiceRouter = Router()
choiceRouter.post('/choice/:id/vote', choiceIdVotePost)
choiceRouter.post('/choice', choicePost)
export default choiceRouter