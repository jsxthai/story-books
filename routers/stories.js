import express from 'express';
import { ensureAuth } from '../middleware/auth.js';
import Story from '../models/Story.js';
const router = express.Router();

// @desc    show add page
// @Route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add');
});

// @desc    process add form 
// @Route   GET /stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        console.log(req.body)
        res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
});

export default router;