const assert = require("node:assert");
const { describe, it } = require("node:test");
const { replyWithMedia } = require("./message.js");

describe("replyWithMedia", () => {
    it("should do nothing if message sent by a bot", async () => {
        const message = { author: { bot: true }, reply: () => assert.fail() };
        const mediaDownloader = {
            isSupportedURL: () => assert.fail(),
            download: () => assert.fail(),
            cleanUp: () => assert.fail(),
        };
        await replyWithMedia(message, mediaDownloader);
    });

    it("should do nothing if URL is not supported", async () => {
        const message = {
            author: { bot: false },
            content: "https://unsupported.com",
            reply: () => assert.fail(),
        };
        const mediaDownloader = {
            isSupportedURL: () => false,
            download: () => assert.fail(),
            cleanUp: () => assert.fail(),
        };
        await replyWithMedia(message, mediaDownloader);
    });

    it("should reply with media returned by downloader", async () => {
        const message = {
            author: { bot: false },
            content: "https://supported.com",
            reply: ({ files }) => assert.deepEqual(files, ["file1", "file2"]),
        };
        const mediaDownloader = {
            isSupportedURL: () => true,
            download: () => ["file1", "file2"],
            cleanUp: () => {},
        };
        await replyWithMedia(message, mediaDownloader);
    });

    it("should clean up files returned by the downloadeer", async () => {
        const message = {
            author: { bot: false },
            content: "https://supported.com",
            reply: () => {},
        };
        const mediaDownloader = {
            isSupportedURL: () => true,
            download: () => ["file1", "file2"],
            cleanUp: (files) => assert.deepEqual(files, ["file1", "file2"]),
        };
        await replyWithMedia(message, mediaDownloader);
    });

    it("should not reply to a message if no files are returned by the downloader", async () => {
        const message = {
            author: { bot: false },
            content: "https://supported.com",
            reply: () => assert.fail(),
        };
        const mediaDownloader = {
            isSupportedURL: () => true,
            download: () => [],
            cleanUp: () => {},
        };
        await replyWithMedia(message, mediaDownloader);
    });

    it("should clean up even if reply throwed", async () => {
        const message = {
            author: { bot: false },
            content: "https://supported.com",
            reply: async () => Promise.reject(),
        };
        let called = false;
        const mediaDownloader = {
            isSupportedURL: () => true,
            download: () => [],
            cleanUp: () => {
                called = true;
            },
        };
        await replyWithMedia(message, mediaDownloader);
        assert.equal(called, true);
    });
});
