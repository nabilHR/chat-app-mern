const mongoose = require('mongoose');

const chatModel = mongoose.Schema({
    ChatName: {
        type: String,
        trim: true,
    },
    isGroupChat: {},
    users: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
        groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },

    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatModel);

export default Chat;