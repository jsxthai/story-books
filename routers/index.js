import express from 'express';
import { ensureAuth, ensureGuest } from '../middleware/auth.js';
const router = express.Router();

// @desc    Loging page
// @Route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    });
});

// @desc    Google auth callback
// @Route   GET /auth/google/callback
router.get('/dashboard', ensureAuth, (req, res) => {
    console.log(req)
    res.render('dashboard', {
        name: req.user.firstName
    });
})

export default router;