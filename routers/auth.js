import express from 'express';
import passport from 'passport';

const router = express.Router();

// @desc    auth with googel
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile']}));

// @desc    google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
})

// @desc    logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

export default router; 