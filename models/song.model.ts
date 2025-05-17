import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const songSchema = new mongoose.Schema(
    {
        title: String,
        avatar: String,
        description: String,
        singerId: String,
        topicId: String,
        position: Number,
        like: Array,
        lyrics: String, // lời bài hát
        audio: String,
        listen: {
            type: Number,
            default: 0
        },
        status: String,
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
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

