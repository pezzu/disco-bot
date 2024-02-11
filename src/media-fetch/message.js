const yt_dlp = require("./yt-dlp.js");

async function replyWithMedia(message, mediaDownloader = yt_dlp) {
    if (message.author.bot) return;

    const url = extractURL(message.content);

    if (!mediaDownloader.isSupportedURL(url)) return;

    const files = await mediaDownloader.download(message.content);
    try {
        if (files.length > 0) {
            await message.reply({ files });
        }
    } finally {
        await mediaDownloader.cleanUp(files);
    }
}

function extractURL(content) {
    return content;
}

module.exports = { replyWithMedia };
