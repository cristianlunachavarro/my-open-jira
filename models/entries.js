import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "finished"],
        default: 'pending',
        required: true
    },
    tasks: {
        type: [
            {
                taskName: {
                    type: String
                },
                completed: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Entry = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

module.exports = Entry;