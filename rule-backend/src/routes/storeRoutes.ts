import { Router } from 'express';
import {
  signIn,

  createStore,
  getAllStores,
  getStoreById,
  updateStoreById,
  deleteStoreById,
} from '../controllers/storeController';

import upload from '../middlewares/uploadMiddleware';

const router: Router = Router();

router.post("/signin", signIn);

router.post("/", createStore);
router.get('/', getAllStores);
router.get('/:id', getStoreById);
router.put('/:id', updateStoreById);
router.delete('/:id', deleteStoreById);

export default router;