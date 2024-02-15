const fs = require("node:fs");
const path = require("node:path");
const util = require("node:util");
const execFile = util.promisify(require("node:child_process").execFile);

const DOWNLOAD_DIR = "/tmp";
const SUPPORTED_URLS = ["https://twitter.com/", "https://x.com/"];

const yt_dlp = path.join(process.cwd(), "bin", "yt-dlp");

async function download(url) {
    const { code, stdout, stderr } = await execFile(yt_dlp, [
        "--print",
        "after_move:filepath",
        "--path",
        DOWNLOAD_DIR,
        "-o",
        "%(id)s.%(ext)s",
        url,
        "--restrict-filenames",
        "--no-simulate",
    ]).catch((error) => error);
    if (stderr) {
        console.error(stderr);
    }
    const files = code ? [] : stdout.split("\n").slice(0, -1);
    return files;
}

function isSupportedURL(url) {
    return SUPPORTED_URLS.some((supportedURL) => url.startsWith(supportedURL));
}

function cleanUp(files) {
    return Promise.all(files.map((file) => fs.promises.unlink(file)));
}

module.exports = { download, isSupportedURL, cleanUp };
