import express from 'express'; 
import { hostController } from './host.controller';

const router = express.Router();

router.post('/', hostController.createHost);  
router.get('/', hostController.getAllHosts);  
router.get('/:id', hostController.getHostById);  
router.patch('/:id', hostController.addRating); 

export const HostRoutes = router;
