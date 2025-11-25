import express from 'express';
import {
    getComponents,
    getComponentById,
    createComponent,
    updateComponent,
    deleteComponent
} from '../controllers/componentController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getComponents)
    .post(protect, createComponent);

router.route('/:id')
    .get(getComponentById)
    .put(protect, updateComponent)
    .delete(protect, deleteComponent);

export default router;
