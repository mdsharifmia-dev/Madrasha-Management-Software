import { Router } from 'express';
import { libraryController } from './library.controller.js';
import { authenticateJWT } from '../../middleware/authenticateJWT.js';

export const libraryRoutes = Router();

libraryRoutes.use(authenticateJWT);

libraryRoutes.get('/books', (req, res) => libraryController.getBooks(req, res));
libraryRoutes.post('/books', (req, res) => libraryController.createBook(req, res));
libraryRoutes.post('/issue', (req, res) => libraryController.issueBook(req, res));
libraryRoutes.post('/return', (req, res) => libraryController.returnBook(req, res));
libraryRoutes.get('/overdue', (req, res) => libraryController.getOverdueIssues(req, res));
libraryRoutes.get('/issues', (req, res) => libraryController.getAllIssues(req, res));
