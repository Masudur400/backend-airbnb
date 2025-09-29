/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'; 
import { hostService } from './host.service';

const createHost = async (req: Request, res: Response) => {
    try {
        const host = await hostService.createHost(req.body);
        res.status(201).json(host);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

const getAllHosts = async (_req: Request, res: Response) => {
    try {
        const hosts = await hostService.getAllHosts();
        res.status(200).json(hosts);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getHostById = async (req: Request, res: Response) => {
    try {
        const host = await hostService.getHostById(req.params.id);
        if (!host) return res.status(404).json({ message: 'Host not found' });
        res.status(200).json(host);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const addRating = async (req: Request, res: Response) => {
    try {
        const hostId = req.params.id;
        const { rating } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const updatedHost = await hostService.addRating(hostId, rating);
        res.status(200).json(updatedHost);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};



export const hostController = {
    createHost,
    getAllHosts,
    getHostById,
    addRating,
}
