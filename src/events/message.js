const fs = require("fs");
const util = require("node:util");

const execFile = util.promisify(require("node:child_process").execFile);

const DOWNLOAD_DIR = "/tmp";
const SUPPORTED_URLS = ["https://twitter.com/", "https://x.com/"];

async function processMessage(message) {
    console.log(`messagge received! ${message.content}`);

    if (message.author.bot) return;

    if (!isSupportedURL(extractURL(message.content))) return;

    const files = await downloadMedia(message.content);

    if (files.length > 0) {
        await message.reply({ files });
    }

    await cleanUp(files);
}

async function downloadMedia(url) {
    const { stdout } = await execFile("yt-dlp", [
        "--print",
        "after_move:filepath",
        "--path",
        DOWNLOAD_DIR,
        url,
        "--restrict-filenames",
        "--no-simulate",
    ]);
    const files = stdout.split("\n").slice(0, -1);
    return files;
}

function extractURL(content) {
    return content;
}

function isSupportedURL(url) {
    return SUPPORTED_URLS.some((supportedURL) => url.startsWith(supportedURL));
}

function cleanUp(files) {
    return Promise.all(files.map((file) => fs.promises.unlink(file)));
}

module.exports = { processMessage };
