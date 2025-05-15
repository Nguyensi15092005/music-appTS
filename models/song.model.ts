import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {
        title: String,
        avatar: String,
        description: String,
        singerId: String,
        topicId: String,
        like: Array,
        lyrics: String, // lời bài hát
        audio: String,
        listen: {
            type: Number,
            default: 0
        },
        status: String,
        slug: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
)
const Song = mongoose.model("Song", songSchema, "songs");

export default Song;

