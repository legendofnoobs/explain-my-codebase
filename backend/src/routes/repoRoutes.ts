import express from 'express';
import * as repoController from '../controllers/repoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/import', protect, repoController.importRepository);
router.get('/', protect, repoController.getAllRepositories);
router.get('/:id', protect, repoController.getRepository);
router.get('/:id/explanations', protect, repoController.getAllExplanationsForRepo);
router.get('/:id/explanation', protect, repoController.getFolderExplanation);
router.get('/:id/file', protect, repoController.getFileContent);
router.get('/:id/file-explanation', protect, repoController.getFileExplanation);
router.delete('/:id', protect, repoController.deleteRepository);

export default router;
