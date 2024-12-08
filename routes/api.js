require('../controllers/settings');
require('../controllers/message');
require('dotenv').config()

__path = process.cwd();

const { default: axios, isAxiosError } = require("axios");
const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const schedule = require('node-schedule');
// Lib
const {
    fetchJson,
    getBuffer
} = require('../lib/function');

// Database
const { limitMin, isLimit, checkKey } = require('../database/function');

// Scrape data
const scrape = require('../module/index.js');
const { randomUUID } = require("crypto");
const { SlowBuffer } = require('buffer');
const { checkPremium } = require('../database/function.js');
const { anime, search } = require('scraper-jsc')
const Frieren = require("@xct007/frieren-scraper");

const creator = global.author

// Features
// Ai
router.get('/simi', async (req, res, next) => {
    try {
        const query = req.query.q
        if (!query) return res.json(msg.paramquery)
        const apikey = req.query.apikey;
        if (!apikey) return res.json(msg.paramkey);
        const limit = await isLimit(apikey);
        if (limit) {
            return res.json({ status: "Gagal", message: 'ApiKey Mu sudah habis.' });
        }
        const result = await scrape.ai.simi(query);
        if (!result) {
            return res.json(msg.nodata);
        }
        res.json({
            status: "Success",
            code: 200,
            creator: creator,
            result: result
        });
        limitMin(apikey);
    } catch (error) {
        console.error('Error in /simi endpoint:', error);
        res.json(msg.error);
    }
});

/* Alter Example result Image 
router.get('/seaart', async (req, res, next) => {
    try {
        const query = req.query.prompt;
        if (!query) return res.json(msg.paramprompt);
        const apikey = req.query.apikey;
        if (!apikey) return res.json(msg.paramkey);
        const limit = await isLimit(apikey);
        if (limit) {
            return res.json({ status: "Gagal", message: 'ApiKey Mu sudah habis.' });
        }
        scrape.ai.seaart(query).then(async image => {
            res.set({ 'Content-Type': 'image/png' })
            res.send(image)
        })
        limitMin(apikey);
    } catch (error) {
        console.error('Error in /seaart endpoint:', error);
        res.json(msg.error);
    }
});*/

router.get('/seaart', async (req, res, next) => {
    try {
        const query = req.query.prompt;
        if (!query) return res.json(msg.paramprompt);
        const apikey = req.query.apikey;
        if (!apikey) return res.json(msg.paramkey);
        const limit = await isLimit(apikey);
        if (limit) {
            return res.json({ status: "Gagal", message: 'ApiKey Mu sudah habis.' });
        }

        const image = await scrape.ai.seaart(query);
        if (!image || typeof image !== 'string') {
            throw new Error('Invalid image URL');
        }

        res.setHeader('Content-Type', 'image/png');
        const imageBuffer = await fetch(image).then(res => res.buffer());
        res.send(imageBuffer);

        limitMin(apikey);
    } catch (error) {
        console.error('Error in /seaart endpoint:', error);
        res.json(msg.error);
    }
});

router.get('/voicevox', async (req, res, next) => {
    const query = req.query.q
    if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey);
        if (limit) {
            return res.json({ status: "Gagal", message: 'ApiKey Mu sudah habis.' });
        }

    const apirandom = ['x739h-785175886']
    var apikeynya = apirandom[Math.floor(Math.random() * apirandom.length)];
    result = await fetch(`https://deprecatedapis.tts.quest/v2/voicevox/audio/?key=${apikeynya}&speaker=17&pitch=0&intonationScale=1&speed=1&text=${query}`).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/voice.mp3', result)
    res.set('Content-Type', 'audio/mpeg');
    res.sendFile(__path + '/tmp/voice.mp3')
    limitMin(apikey);
})
module.exports = router