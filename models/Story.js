import mongoose from 'mongoose';

const StoryShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model('Story', StoryShema);