import express from 'express';

const router = express.Router();

// @desc    Login/Langding page
// @Route   GET /
router.get('/', (req, res) => {
    res.render("login", {
        layout: 'login'
    });
});

// @desc    Login/Langding page
// @Route   GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render("dashboard");
});


export default router;