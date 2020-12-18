import mongoose from 'mongoose';

const UserSchena = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createAt: {
        type: Date,
        dafault: Date.now
    }
})

export default mongoose.model('User', UserSchena);