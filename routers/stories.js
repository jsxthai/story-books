import express from 'express';
import { ensureAuth } from '../middleware/auth.js';
import Story from '../models/Story.js';
const router = express.Router();

// @desc    show all story
// @Route   GET /stories/add
router.get('/', ensureAuth, async (req, res) => {
    try {
        // https://viblo.asia/p/tim-hieu-ve-populate-trong-mongoogse-GrLZDvpE5k0
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createAt: 'desc' })
            .lean();
        // console.log(stories);
        res.render('stories', {
            stories,
        })
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
});

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

// @desc    show edit page
// @route   GET / stories/edit:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOne({ _id: req.params.id }).lean();
        if(!story) {
            return res.render('error/404'); 
        }
        // console.log(story)
    
        // console.log(typeof story.user, typeof req.user.id)
        if (story.user.toString() !== req.user.id.toString()) {
            res.redirect('/stories');
        } else {
            res.render('stories/edit', {
                story,
            })
        }
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
})

// @desc    show story
// @Route   GET /stories/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById({ _id: req.params.id })
            .populate('user')
            .lean();

        if (!story) {
            return res.render('error/404');
        } else {
            res.render('stories/show', {
                story,
            })
        }
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
});


// @desc    update story
// @route   PUT / stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean();

        if (!story) {
            return res.render('error/404');
        } else {
            // option: new and run validators
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            });
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
});

// @desc    delete story
// @Route   DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Story.remove({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
});

// @desc    user stories
// @route   GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, async(req, res) => {
    try {
        const stories = await Story.find({ user: req.params.userId })
            .populate('user')
            .lean();
    res.render('stories', {
        stories,
    })
        
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
})

export default router;