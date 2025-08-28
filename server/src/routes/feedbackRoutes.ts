import { Router } from 'express';
import { FeedbackController } from '../controllers/feedbackController';

const router = Router();

// Feedback CRUD routes
router.post('/', FeedbackController.create);
router.get('/', FeedbackController.getAll);
router.get('/analytics', FeedbackController.getAnalytics);
router.get('/:id', FeedbackController.getById);
router.put('/:id', FeedbackController.update);
router.delete('/:id', FeedbackController.delete);

export default router;