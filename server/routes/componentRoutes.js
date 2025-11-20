import express from 'express';
import {
    getComponents,
    getComponentById,
    createComponent,
    updateComponent,
    deleteComponent
} from '../controllers/componentController.js';

const router = express.Router();

router.route('/')
    .get(getComponents)
    .post(createComponent);

router.route('/:id')
    .get(getComponentById)
    .put(updateComponent)
    .delete(deleteComponent);

export default router;
