import express from 'express';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, geminiApiKey } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      geminiApiKey,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // @ts-ignore
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user._id).select('-password');
    if (user) {
      // Mask the API key: show only first 4 and last 4 chars
      const maskedKey = user.geminiApiKey 
        ? `${user.geminiApiKey.substring(0, 4)}...${user.geminiApiKey.substring(user.geminiApiKey.length - 4)}`
        : '';
      
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        geminiApiKey: maskedKey
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching profile' });
  }
};

export const updateApiKey = async (req: Request, res: Response) => {
  try {
    const { geminiApiKey } = req.body;
    if (!geminiApiKey) {
      return res.status(400).json({ error: 'Gemini API Key is required' });
    }

    const user = await User.findById((req as any).user._id);
    if (user) {
      user.geminiApiKey = geminiApiKey;
      await user.save();
      res.json({ message: 'API Key updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error updating API key' });
  }
};
