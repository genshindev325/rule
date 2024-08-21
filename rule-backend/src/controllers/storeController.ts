import { Request, Response } from "express";
import { signInStore } from "../services/storeService";
import Store from "../models/storeModel";


export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await signInStore(email, password);
    
    res.status(200).json({ token });
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new store
export const createStore = async( req: Request, res: Response ): Promise<void> => {
  try {
    const store = new Store(req.body);
    await store.save();

    res.status(201).json(store);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
}

// Get all stores
export const getAllStores = async( req: Request, res: Response ): Promise<void> => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Get a single store by ID
export const getStoreById = async (req: Request, res: Response): Promise<void> => {
  try {
    const store = await Store.findById(req.params.id);
    if (store) {
      res.status(200).json(store);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching store', error });
  }
};

// Update a store by ID
export const updateStoreById = async (req: Request, res: Response): Promise<void> => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (store) {
      res.status(200).json(store);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating store', error });
  }
};

// Delete a store by ID
export const deleteStoreById = async (req: Request, res: Response): Promise<void> => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (store) {
      res.status(200).json({ message: 'Store deleted' });
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting store', error });
  }
};



