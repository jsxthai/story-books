import express from 'express';
import passport from 'passport';

const router = express.Router();

// @desc    Loging page
// @Route   GET /
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login',
    });
});

// @desc    Google auth callback
// @Route   GET /auth/google/callback
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

export default router;