import { Router } from 'express';
import choiceRouter from './choiceRouter';
import pollRouter from './pollRouter';

const router = Router()
router.use(choiceRouter)
router.use(pollRouter)
export default router