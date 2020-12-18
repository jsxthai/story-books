import express from 'express';
import { ensureAuth, ensureGuest } from '../middleware/auth.js';
import Story from '../models/Story.js';
const router = express.Router();

// @desc    loging page
// @Route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    });
});

// @desc    Google auth callback
// @Route   GET /auth/google/callback
router.get('/dashboard', ensureAuth, async (req, res) => {
    // console.log(req)
    try {
        // https://mongoosejs.com/docs/tutorials/lean.html
        // find stories with user id
        const stories = await Story.find({ user: req.user.id }).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            stories,
        });
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
})

export default router;