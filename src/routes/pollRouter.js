import {Router} from 'express'
import { pollGet } from '../controllers/poll.get.js'
import { pollIdChoiceGet } from '../controllers/poll.id.choice.get.js'
import { pollIdResultGet } from '../controllers/poll.id.result.get.js'
import { pollPost } from '../controllers/poll.post.js'

const pollRouter = Router()
pollRouter.get('/poll', pollGet)
pollRouter.get('/poll/:id/choice', pollIdChoiceGet)
pollRouter.get('/poll/:id/result', pollIdResultGet)
pollRouter.post('/poll', pollPost)
export default pollRouter