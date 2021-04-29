// Jangan hilangin nama authornya

process.on('uncaughtException', console.error)
const {
    WAConnection,
    MessageType,
    Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    WA_DEFAULT_EPHEMERAL,
    ReconnectMode,
    ProxyAgent,
    GroupSettingChange,
    waChatKey,
    mentionedJid,
} = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone")
const speed = require('performance-now')
const request = require('request');
const { spawn, exec, execSync } = require("child_process")
const fs = require("fs")
const help = require("./src/help")
const postBuffer = help.postBuffer
const getBuffer2 = help.getBuffer
const postJson = help.postJson
const getJson = help.getJson
const axios = require("axios")
const fetch = require('node-fetch');
const ffmpeg = require('fluent-ffmpeg')
const ig = require('insta-fetcher')
const { EmojiAPI } = require("emoji-api");
const zrapi = require('zrapi')
const tik = require('tiktok-scraper-without-watermark')
const emoji2 = new EmojiAPI()
const Fb = require('fb-video-downloader');
const twitterGetUrl = require("twitter-url-direct")
const phoneNum = require('awesome-phonenumber')
const gis = require('g-i-s');
const got = require("got");
const { Grid } = require('minesweeperjs')
const ID3Writer = require('browser-id3-writer');
const imageToBase64 = require('image-to-base64');
const brainly = require('brainly-scraper')
const yts = require('yt-search')
const { error } = require("qrcode-terminal")
const { processTime, sleep, hilih } = require('./lib/index')
const { getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { color, bgcolor } = require('./lib/color')
const { fetchJson, getBase64, kyun, createExif } = require('./lib/fetcher')
const { cmdadd } = require('./lib/hit.js')
const { yta, ytv, igdll } = require('./lib/ytdl')
const IpLookup = require('./lib/iplookup')
const Corona = require('./lib/corona')
const Faker = require('./lib/faker')
const Proxy = require('./lib/proxy')
const { webp2mp4File } = require('./lib/webp2mp4')
const searchKata = require('./lib/KBBI')
const { ind } = require('./angga')
const { custom, random } = require('./lib/meme')
const { uploadimg } = require('./lib/uploadimg')
const { stalkIg, scrapIgMedia } = require('./lib/igdl2')
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const config = JSON.parse(fs.readFileSync('./config.json'))
const vcard = 'BEGIN:VCARD\n' +
    'VERSION:3.0\n' +
    'FN:Angga Surya\n' +
    'ORG: Creator Botol BOT;\n' +
    `TEL;type=CELL;type=VOICE;waid=${config.ownerNumber}:${config.ownerNumberr}\n` +
    'END:VCARD'


const emoji = require('node-emoji')
const tictactoe = JSON.parse(fs.readFileSync("./src/database/tictactoe.json"))


prefix = '.'
fake = '*BOTOL BOT*'
numbernye = '0'
banChats = false
targetpc = '62895631271444'


module.exports = botol = async(botol, mek) => {
        try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
            if (!mek.message) return
            if (mek.key && mek.key.remoteJid == 'status@broadcast') return
            global.blocked
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            const content = JSON.stringify(mek.message)
            const from = mek.key.remoteJid
            const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
            const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
            const type = Object.keys(mek.message)[0]
            body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
            budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
            const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
            const args = body.trim().split(/ +/).slice(1)
            const arg = body.substring(body.indexOf(' ') + 1)
            const isCmd = body.startsWith(prefix)
            const q = args.join(' ')
            const botNumber = botol.user.jid
            const botNumberss = botol.user.jid + '@c.us'
            const isGroup = from.endsWith('@g.us')
            const isGroupBotol = from.endsWith('62895631271444-1608133293@g.us')
                //const isLevelingOn = isGroup ? _leveling.includes(from) : false
            let sender = isGroup ? mek.participant : mek.key.remoteJid
                // const isBotolNumber = config.NomorBotol
                // const isOwner = sender.id === isBotolNumber
            const totalchat = await botol.chats.all()
            const groupMetadata = isGroup ? await botol.groupMetadata(from) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const groupId = isGroup ? groupMetadata.jid : ''
            const groupMembers = isGroup ? groupMetadata.participants : ''
            const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupOwner = isGroup ? groupMetadata.owner : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isGroupAdmins = groupAdmins.includes(sender) || false
                //const isGrupMines = groupMines.includes(from)
            const conts = mek.key.fromMe ? botol.user.jid : botol.contacts[sender] || { notify: jid.replace(/@.+/, '') }
            const pushname2 = mek.key.fromMe ? botol.user.name : conts.notify || conts.vname || conts.name || '-'
            const ownerNumber = [`${config.ownerNumber}@s.whatsapp.net`] // Replace with your number
            const sender1 = sender === undefined ? botNumber : sender
                // const sender = isGroup ? mek.participant : mek.key.remoteJid
            pushname = botol.contacts[sender1] != undefined ? botol.contacts[sender1].vname || botol.contacts[sender1].notify : undefined
            const isOwner = ownerNumber.includes(sender)
            const senderNumber = sender.split("@")[0]
            const mentionByTag = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.mentionedJid : []
            const mentionByReply = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.participant || "" : ""
            const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
            mention != undefined ? mention.push(mentionByReply) : []
            const mentionUser = mention != undefined ? mention.filter(n => n) : []
                //MESS

            mess = {
                wait: 'Tunggu ya...',
                success: 'Berhasil!',
                wrongFormat: 'Format salah, coba liat lagi di menu',
                error: {
                    stick: 'bukan sticker itu:v',
                    Iv: 'Linknya error:v'
                },
                only: {
                    group: 'https://chat.whatsapp.com/CZwRj7oCIzn59Fxa9GNTFA\n\nMain bot di group baru bot kami aja kak',
                    groupn: 'Maaf kak, karena fitur ini gratis owner membatasi pemakaian publik, supaya tidak terjadi pemakaian yang tidak wajar, sekarang hanya dapat digunakan untuk di dalam group botol saja\n\nSilahkan ketik .groupbotol untuk mengetahui info link group.',
                    ownerG: 'Khusus owner',
                    ownerB: 'Khusus owner botol',
                    admin: 'Khusus admin group',
                    Badmin: 'Jadiin saya admin gc dulu'
                }
            }
            const isUrl = (url) => {
                return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
            }

            const reply = (teks) => {
                botol.sendMessage(from, teks, text, { quoted: mek })
            }

            const sendMess = (hehe, teks) => {
                botol.sendMessage(hehe, teks, text)
            }

            const mentions = (teks, memberr, id) => {
                (id == null || id == undefined || id == false) ? botol.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }): botol.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
            }


            const fakestatus = (teks) => {
                botol.sendMessage(from, teks, text, {
                    quoted: {
                        key: {
                            fromMe: false,
                            participant: `0@s.whatsapp.net`,
                            ...(from ? { remoteJid: "status@broadcast" } : {})
                        },
                        message: {
                            "imageMessage": {
                                "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                                "mimetype": "image/jpeg",
                                "caption": fake,
                                "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                                "fileLength": "28777",
                                "height": 1080,
                                "width": 1079,
                                "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                                "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                                "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                                "mediaKeyTimestamp": "1610993486",
                                "jpegThumbnail": fs.readFileSync('./stik/thumb.jpeg'),
                                "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                            }
                        }
                    }
                })
            }
            const fakethumb = (teks, yes) => {
                botol.sendMessage(from, teks, image, { thumbnail: fs.readFileSync('./stik/fake.jpeg'), quoted: mek, caption: yes })
            }
            const fakegroup = (teks) => {
                botol.sendMessage(from, teks, text, {
                    quoted: {
                        key: {
                            fromMe: false,
                            participant: `0@s.whatsapp.net`,
                            ...(from ? { remoteJid: "6289523258649-1604595598@g.us" } : {})
                        },
                        message: {
                            "imageMessage": {
                                "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                                "mimetype": "image/jpeg",
                                "caption": fake,
                                "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                                "fileLength": "28777",
                                "height": 1080,
                                "width": 1079,
                                "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                                "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                                "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                                "mediaKeyTimestamp": "1610993486",
                                "jpegThumbnail": fs.readFileSync('./stik/thumb.jpeg'),
                                "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                            }
                        }
                    }
                })
            }
            const sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function(uri, filename, callback) {
                    request.head(uri, function(err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './stik' + names + '.png', async function() {
                    console.log('selesai');
                    let filess = './stik' + names + '.png'
                    let asw = './stik' + names + '.webp'
                    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                        let media = fs.readFileSync(asw)
                        botol.sendMessage(to, media, MessageType.sticker, { quoted: mek })
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
                    });
                });
            }
            const sendMediaURL = async(to, url, text = "", mids = []) => {
                if (mids.length > 0) {
                    text = normalizeMention(to, text, mids)
                }
                const fn = Date.now() / 10000;
                const filename = fn.toString()
                let mime = ""
                var download = function(uri, filename, callback) {
                    request.head(uri, function(err, res, body) {
                        mime = res.headers['content-type']
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, filename, async function() {
                    console.log('done');
                    let media = fs.readFileSync(filename)
                    let type = mime.split("/")[0] + "Message"
                    if (mime === "image/gif") {
                        type = MessageType.video
                        mime = Mimetype.gif
                    }
                    if (mime.split("/")[0] === "audio") {
                        mime = Mimetype.mp4Audio
                    }
                    botol.sendMessage(to, media, type, { quoted: mek, mimetype: mime, caption: text, contextInfo: { "mentionedJid": mids } })

                    fs.unlinkSync(filename)
                });
            }

            //////////////////======
            function addMetadata(packname, author) {
                if (!packname) packname = `${config.packname}`;
                if (!author) author = ` ${config.author}`;
                author = author.replace(/[^a-zA-Z0-9]/g, '');
                let name = `${author}_${packname}`

                if (fs.existsSync(`./src/sticker/${name}.exif`)) {
                    return `./src/sticker/${name}.exif`
                }
                const json = {
                    "sticker-pack-name": packname,
                    "sticker-pack-publisher": author,
                }

                const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
                const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]

                let len = JSON.stringify(json).length
                let last

                if (len > 256) {
                    len = len - 256
                    bytes.unshift(0x01)
                } else {
                    bytes.unshift(0x00)
                }

                if (len < 16) {
                    last = len.toString(16)
                    last = "0" + len
                } else {
                    last = len.toString(16)
                }

                const buf2 = Buffer.from(last, "hex")
                const buf3 = Buffer.from(bytes)
                const buf4 = Buffer.from(JSON.stringify(json))

                const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])

                fs.writeFile(`./src/sticker/${name}.exif`, buffer, (err) => {
                    return `./src/sticker/${name}.exif`
                })
            }

            // Tic Tac Toe
            //PREMIUM User
            
            //========================================================================================================================//
            colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
            const isMedia = (type === 'imageMessage' || type === 'videoMessage')
            const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
            const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
            const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
            const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
            if (isCmd) cmdadd()
                // Log
            if (isCmd && !isGroup) console.log(color('[Botol-Bot]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(`${pushname}`))
            if (isCmd && isGroup) console.log(color('[Botol-Bot]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(`${pushname}`))
            if (!mek.key.fromMe && banChats === true) return
            
            /*var chats = await botol.chats.all()
            chats.map(async({ jid }) => {
                await botol.chatRead(jid)*/ //aktifkan jika ingin auto read
            })
            switch (command) {

                case 'menu':
                case 'help':
                    const hitbotol = JSON.parse(fs.readFileSync('./src/hit.json'))[0].totalcmd
                    reply(`*𝔹𝕠𝕥𝕠𝕝 𝔹𝕠𝕥*
Hai ${pushname} 👋🏻 Bahagiamu bahagiaku juga.

Total hit penggunaan bot : ${hitbotol}
Baca notes dibawah ya 😉
           	
❏ *DOWNLOADER MENU*
 ├ ${prefix}play _send your query_
 ├ ${prefix}ytmp3 _send your link_
 ├ ${prefix}ytmp4 _send your link_
 ├ ${prefix}ig _send tour link_
 ├ ${prefix}igvid _send your link_
 ├ ${prefix}igpict _send your link_
 ├ ${prefix}fb _send your link_
 ├ ${prefix}twitter _send your link_
 ├ ${prefix}tiktokaudio _send your link_
 ╰ ${prefix}tiktok _send your link_

❏ *CONVERTER MENU*
 ├ ${prefix}tomp3 _reply video_
 ├ ${prefix}toimg _reply sticker_
 ├ ${prefix}reverse _reply mp4_
 ├ ${prefix}slow _reply mp4_
 ├ ${prefix}fast _reply mp4_
 ├ ${prefix}tomp4 _reply sticker_
 ╰ ${prefix}togif _reply sticker gif_

❏ *MEDIA MENU*
 ├ ${prefix}ytsearch _send your query_
 ├ ${prefix}pinterest _send your query_
 ├ ${prefix}igstalk _send your query_
 ├ ${prefix}puisiimg _send puisi img_
 ├ ${prefix}resepmakanan _send your query_
 ├ ${prefix}playstore _send your query_
 ├ ${prefix}meme _send meme_
 ├ ${prefix}ibb _ink img_
 ╰ ${prefix}tourl _reply/caption your img_

❏ *FUN MENU*
 ├ ${prefix}fitnah @tag|msg|msg
 ├ ${prefix}fdeface _improvement_
 ├ ${prefix}qrcode _send text_
 ╰ ${prefix}forward _teksnya_

❏ *ADMIN MENU*
 ├ ${prefix}hidetag _send your teks_
 ├ ${prefix}totag _reply img/sticker/audio_
 ├ ${prefix}sticktag _sticker hidetag_
 ├ ${prefix}open _open group_
 ├ ${prefix}close _close group_
 ├ ${prefix}add _send number 62xx_
 ├ ${prefix}kick _tag people_
 ├ ${prefix}promote _tag people_
 ╰ ${prefix}demote _tag people_

❏ *STICKER MENU*
 ├ ${prefix}sticker _reply/capton_
 ├ ${prefix}emoji _send emoji_
 ├ ${prefix}sgif _reply/caption_
 ├ ${prefix}swm <name|author>
 ├ ${prefix}take <name|author>
 ├ ${prefix}wasted _reply_
 ├ ${prefix}tobecontinue _reply_
 ├ ${prefix}comunism _reply_
 ├ ${prefix}thuglife _reply_
 ╰ ${prefix}trigger _reply_

❏ *INFO MENU*
 ├ ${prefix}iplookup _send your query_
 ├ ${prefix}runtime _check runtime bot_
 ├ ${prefix}speed _check network bot_
 ├ ${prefix}ping _check informaion bot_
 ├ ${prefix}proxy _check proxy bot_
 ├ ${prefix}info _check informaion bot_
 ├ ${prefix}owner _send contact owner_
 ╰ ${prefix}donasi _send menu donate_

❏ *OWNER MENU*
 ├ ${prefix}join _link group_
 ├ ${prefix}clearall _clear all chat_
 ├ ${prefix}eval _run kode js_
 ├ ${prefix}exec _run perintah bash_
 ├ ${prefix}setreply _setting reply_
 ├ ${prefix}setimg _setting prefix_
 ├ ${prefix}bc _broadcast_
 ├ ${prefix}block _block user_
 ├ ${prefix}unblock _unblock user_
 ├ ${prefix}setthumb _setting reply_
 ├ ${prefix}setnick _setting nama bot_
 ╰ ${prefix}setpict _setting profile bot_
 
 *Notes:*
 Gratis untuk semuanya, pemakaian jangan ngelunjak ya,
 Jika tidak bisa digunakan coba masuk group botol,
 Gunakan di group tersebut nanti akan bisa dengan
 sendirinya.
 
 Ramaikan group terbaru botol bot
 https://chat.whatsapp.com/CZwRj7oCIzn59Fxa9GNTFA
 Github : https://github.com/progsysdriver/botol-bot`)
                    break
                case 'groupbotol':
                    reply('https://chat.whatsapp.com/CZwRj7oCIzn59Fxa9GNTFA')
                    break
                case 'fast':
                    if (!isGroupBotol) return reply(mess.only.groupb)
                    if (!isQuotedVideo) return fakegroup('Reply videonya!')
                    fakegroup(mess.wait)
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await botol.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp4')
                    exec(`ffmpeg -i ${media} -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2[a]" -map "[v]" -map "[a]" ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return fakegroup(`Err: ${err}`)
                        buffer453 = fs.readFileSync(ran)
                        botol.sendMessage(from, buffer453, video, { mimetype: 'video/mp4', quoted: mek })
                        fs.unlinkSync(ran)
                    })
                    break
                case 'slow':
                    if (!isGroupBotol) return reply(mess.only.groupb)
                    if (!isQuotedVideo) return fakegroup('Reply videonya!')
                    fakegroup(mess.wait)
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await botol.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp4')
                    exec(`ffmpeg -i ${media} -filter_complex "[0:v]setpts=2*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return fakegroup(`Err: ${err}`)
                        buffer453 = fs.readFileSync(ran)
                        botol.sendMessage(from, buffer453, video, { mimetype: 'video/mp4', quoted: mek })
                        fs.unlinkSync(ran)
                    })
                    break
                case 'reverse':
                    if (!isGroupBotol) return reply(mess.only.groupb)
                    if (!isQuotedVideo) return fakegroup('Reply videonya!')
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await botol.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp4')
                    exec(`ffmpeg -i ${media} -vf reverse -af areverse ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return fakegroup(`Err: ${err}`)
                        buffer453 = fs.readFileSync(ran)
                        botol.sendMessage(from, buffer453, video, { mimetype: 'video/mp4', quoted: mek })
                        fs.unlinkSync(ran)
                    })
                    break
                case 'qrcode':
                    const tex = encodeURIComponent(body.slice(8))
                    if (!tex) return botol.sendMessage(from, 'MASUKAN URL/TEKS UNTUK DI JADIKAN QR', text, { quoted: mek })
                    const buff = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${tex}`)
                    botol.sendMessage(from, buff, image, { quoted: mek })
                    break
                case 'tourl':
                    if (!isGroupBotol) return reply(mess.only.groupb)
                    var imgbb = require('imgbb-uploader')
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        fakegroup(mess.wait)
                        owgi = await botol.downloadAndSaveMediaMessage(ger)
                        anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
                        teks = `${anu.display_url}`
                        fakestatus(teks)
                    } else {
                        fakegroup(mess.wrongFormat)
                    }
                    break
                case 'ibb':
                    if (!isGroupBotol) return reply(mess.only.groupb)
                    var telete = body.slice(5)
                    if (!telete) return fakegroup(mess.wrongFormat)
                    var imgbb = require('imgbb-uploader')
                    if (isMedia && !mek.message.videoMessage || isQuotedImage) {
                        ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        fakegroup(mess.wait)
                        owgi = await botol.downloadAndSaveMediaMessage(ger)
                        anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
                        cox = await fetchJson(`https://videfikri.com/api/imgbb/?urlgbr=${anu.display_url}&title=${telete}`)
                        amu = cox.result
                        fakestatus(`Title = ${telete}\nId = ${amu.id}\n\nUrl viewers = ${amu.url_viewer}\nUrl = ${amu.url}\nUrl Display = ${amu.url_display}`)
                    } else {
                        fakegroup(mess.wrongFormat)
                    }
                    break
                case 'meme':
                    reply('Bentar om, lagi nyari...')
                    var { author, title, postLink, url } = await random()
                    var buffer = await getBuffer(url)
                    var options = {
                        caption: '-[ 𝙈𝙀𝙈𝙀𝙂𝙀𝙉 ]-',
                        contextInfo: {
                            participant: `0@s.whatsapp.net`,
                            quotedMessage: {
                                extendedTextMessage: {
                                    text: `*Author: ${author}*\n*Title: ${title}*\n*Link: ${postLink}*`
                                }
                            }
                        }
                    }
                    botol.sendMessage(from, buffer, image, options)
                    break
                case 'memeimg':
                case 'memeimage':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length > 0) {
                        const top = arg.split('|')[0]
                        const bottom = arg.split('|')[1]
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo : mek
                        const media = await botol.downloadMediaMessage(encmedia, 'buffer')
                        const getUrl = await uploadimg(media, false)
                        const memeRes = await custom(getUrl, top, bottom)
                        botol.sendMessage(from, memeRes, image, { quoted: mek, caption: 'dah jadi nih bang.' })
                    }
                    break

                case 'iplookup':
                    IpLookup(q)
                        .then(data => {
                            botol.sendMessage(from, JSON.stringify(data, null, '\t'), MessageType.text, { quoted: mek })
                        })
                        .catch(err => {
                            reply(err)
                        })
                    break
                case 'proxy':
                    Proxy()
                        .then(data => {
                            botol.sendMessage(from, JSON.stringify(data, null, '\t'), MessageType.text, { quoted: mek })
                        })
                        .catch(err => {
                            reply(err)
                        })
                    break
                case 'togif':
                    if (!isGroupBotol) return reply(mess.only.groupb)
                    if (!isQuotedSticker) return reply('Reply stiker nya')
                    fakestatus(mess.wait)
                    if (mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated === true) {
                        const encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                        const media = await botol.downloadAndSaveMediaMessage(encmedia)
                        const upload = await uploadimg(media, Date.now() + '.webp')
                        const rume = await axios.get(`http://nzcha-apii.herokuapp.com/webp-to-mp4?url=${upload.result.image}`)
                        const buff = await getBuffer(rume.data.result)
                        botol.sendMessage(from, buff, video, { mimetype: Mimetype.gif, caption: 'Nih', quoted: mek })
                    }
                    break
                case 'resepmasakan':
                    anu = await fetchJson(`https://api.vhtear.com/resepmasakan?query=${body.slice(14)}&apikey=${config.vhtearkey}`, { method: 'get' })
                    hasilresep = `*${anu.result.title}*\n${anu.result.desc}\n\n*Untuk Bahan²nya*\n${anu.result.bahan}\n\n*Dan Untuk Tutorialnya*\n${anu.result.cara}`
                    reply(mess.wait)
                    buff = await getBuffer(anu.result.image)
                    botol.sendMessage(from, buff, image, { quoted: mek, caption: hasilresep })
                    break
                case 'cersex':
                    anu = await fetchJson(`https://api.vhtear.com/cerita_sex&apikey=${config.vhtearkey}`, { method: 'get' })
                    if (anu.error) return reply(anu.error)
                    sex = await getBuffer(anu.result.image)
                    reply(mess.wait)
                    cerita = `• *Judul:* ${anu.result.judul}\n\n${anu.result.cerita}`
                    botol.sendMessage(from, sex, image, { quoted: mek, caption: cerita })
                    break
                case 'puisiimg':
                    pus = await getBuffer(`https://api.vhtear.com/puisi_image&apikey=${config.vhtearkey}`, { method: 'get' })
                    botol.sendMessage(from, pus, image, { quoted: mek })
                    break
                case 'playstore':
                    ps = `${body.slice(11)}`
                    anu = await fetchJson(`https://api.vhtear.com/playstore?query=${ps}&apikey=${config.vhtearkey}`, { method: 'get' })
                    store = '======================\n'
                    for (let ply of anu.result) {
                        store += `• *Nama Apk:* ${ply.title}\n• *ID:* ${ply.app_id}\n• *Developer:* ${ply.developer}\n• *Deskripsi:* ${ply.description}\n• *Link Apk:* https://play.google.com/${ply.url}\n=====================\n`
                    }
                    reply(store.trim())
                    break
                case 'forward':
                    var value = args.join(" ")
                    var options = {
                        text: value,
                        contextInfo: {
                            participant: '0@s.whatsapp.net',
                            remoteJid: 'status@broadcast',
                            isForwarded: true,
                            forwardingScore: 300,
                            quotedMessage: {
                                documentMessage: {
                                    fileName: fake,
                                    jpegThumbnail: fs.readFileSync('./src/image/thumbnail.jpeg'),
                                    mimetype: 'application/pdf',
                                    pageCount: 200
                                }
                            }
                        }
                    }
                    botol.sendMessage(from, options, text)
                    break
                case '.':
                case 'eval':
                    if (!isOwner) return fakegroup(mess.only.ownerB)
                    let code = args.join(" ")
                    try {

                        if (!code) return botol.reply(from, 'No JavaScript Code', id)
                        let evaled;

                        if (code.includes("--silent") && code.includes("--async")) {
                            code = code.replace("--async", "").replace("--silent", "");

                            return await eval(`(async () => { ${code} })()`)
                        } else if (code.includes("--async")) {
                            code = code.replace("--async", "");

                            evaled = await eval(`(async () => { ${code} })()`);
                        } else if (code.includes("--silent")) {
                            code = code.replace("--silent", "");

                            return await eval(code);
                        } else evaled = await eval(code);

                        if (typeof evaled !== "string")
                            evaled = require("util").inspect(evaled, { depth: 0 });

                        let output = clean(evaled);
                        var options = {
                            contextInfo: {
                                participant: '0@s.whatsapp.net',
                                quotedMessage: {
                                    extendedTextMessage: {
                                        text: "*RUNNING EVAL CODE*"
                                    }
                                }
                            }
                        }
                        botol.sendMessage(from, `${output}`, text, options)
                    } catch (err) {
                        console.error(err)
                        reply(err)
                    }

                    function clean(text) {
                        if (typeof text === "string")
                            return text
                                .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                                .replace(/@/g, `@${String.fromCharCode(8203)}`);
                        // eslint-disable-line prefer-template
                        else return text;
                    }
                    break
                case 'kick':
                    if (!isGroup) return fakegroup(mess.only.group)
                    if (!isGroupAdmins) return fakegroup(mess.only.admin)
                    if (!isBotGroupAdmins) return fakegroup(mess.only.Badmin)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag Member yang ingin ditendang')
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length > 1) {
                        teks = 'Perintag diterima mengeluarkan:'
                        for (let _ of mentioned) {
                            teks += `@_.split('@')[0]`
                        }
                        await mentions(teks, mentioned, true)
                        botol.groupRemove(from, mentioned)
                    } else {
                        await mentions(`Perintah diterima mengeluarkan: @${mentioned[0].split('@')[0]}`, mentioned, true)
                        botol.groupRemove(from, mentioned)
                    }
                    break
                case 'add':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return fakegroup(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (args.length < 1) return reply('Yang mau di add jin ya?')
                    if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
                    try {
                        num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
                        botol.groupAdd(from, [num])
                    } catch (e) {
                        return fakegroup(`Diprivate ama ${num} njir`)
                    }
                    break
                case 'promote':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return fakegroup(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length > 1) {
                        teks = 'Perintah di terima, Promote :\n'
                        for (let _ of mentioned) {
                            teks += `@${_.split('@')[0]}\n`
                        }
                        mentions(teks, mentioned, true)
                        botol.groupMakeAdmin(from, mentioned)
                    } else {
                        mentions(`Perintah di terima, Promote : @${mentioned[0].split('@')[0]}`, mentioned, true)
                        botol.groupMakeAdmin(from, mentioned)
                    }
                    break
                case 'demote':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return fakegroup(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length > 1) {
                        teks = 'Perintah di terima, Demote :\n'
                        for (let _ of mentioned) {
                            teks += `@${_.split('@')[0]}\n`
                        }
                        mentions(teks, mentioned, true)
                        botol.groupDemoteAdmin(from, mentioned)
                    } else {
                        mentions(`Perintah di terima, Demote : @${mentioned[0].split('@')[0]}`, mentioned, true)
                        botol.groupDemoteAdmin(from, mentioned)
                    }
                    break
                case 'setnick':
                    if (!isOwner) return fakegroup(mess.only.ownerB)
                    entah = args.join(" ")
                    botol.updateProfileName(entah).then(() => {
                        reply(`Sukses mengubah ke ${entah}`)
                    }).catch((err) => { reply(`Error: ${err}`) })
                    break
                case 'setpict':
                    if (!isOwner) return fakegroup(mess.only.ownerB)
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await botol.downloadMediaMessage(encmedia, 'buffer')
                        botol.updateProfilePicture(botNumber, media).then(() => {
                            reply('Sukses update profile picture')
                        }).catch((err) => {
                            reply(`Error: ${err}`)
                        })
                    } else {
                        reply('bukan gambar')
                    }
                    break
                case 'comunism':
                    var imgbb = require('imgbb-uploader')
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        owgi = await botol.downloadAndSaveMediaMessage(ger)
                        anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
                        teks = `${anu.display_url}`
                        ranp = getRandom('.gif')
                        rano = getRandom('.webp')
                        anu2 = `http://zekais-api.herokuapp.com/comunism?url=${teks}`
                        exec(`wget ${anu2} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                                    fs.unlinkSync(ranp)
                                    if (err) return fakegroup(`Error: ${err}`)
                                    exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${rano} -o ${rano}`, async (error) => {
              								if (error) return fakegroup(`Error: ${error}`)
              								botol.sendMessage(from, fs.readFileSync(rano), sticker, { quoted: mek })
              								fs.unlinkSync(rano)
              							})
              						})
              					} else {
              						fakegroup('Gunakan foto!')
              					}
              					break
              				case 'thuglife':
              					var imgbb = require('imgbb-uploader')
              					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
              						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
              						owgi = await botol.downloadAndSaveMediaMessage(ger)
              						anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
              						teks = `${anu.display_url}`
              						ranp = getRandom('.gif')
              						rano = getRandom('.webp')
              						anu2 = `http://zekais-api.herokuapp.com/thuglife?url=${teks}`
              						exec(`wget ${anu2} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
              							fs.unlinkSync(ranp)
              							if (err) return fakegroup(`Error: ${err}`)
              							exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${rano} -o ${rano}`, async (error) => {
              								if (error) return fakegroup(`Error: ${error}`)
              								botol.sendMessage(from, fs.readFileSync(rano), sticker, { quoted: mek })
              								fs.unlinkSync(rano)
              							})
              						})
              					} else {
              						fakegroup('Gunakan foto!')
              					}
              					break
              				case 'tobecontinue':
              					var imgbb = require('imgbb-uploader')
              					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
              						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
              						owgi = await botol.downloadAndSaveMediaMessage(ger)
              						anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
              						teks = `${anu.display_url}`
              						ranp = getRandom('.gif')
              						rano = getRandom('.webp')
              						anu2 = `http://zekais-api.herokuapp.com/tobecontinue?url=${teks}`
              						exec(`wget ${anu2} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
              							fs.unlinkSync(ranp)
              							if (err) return fakegroup(`Error: ${err}`)
              							exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${rano} -o ${rano}`, async (error) => {
              								if (error) return fakegroup(`Error: ${error}`)
              								botol.sendMessage(from, fs.readFileSync(rano), sticker, { quoted: mek })
              								fs.unlinkSync(rano)
              							})
              						})
              					} else {
              						fakegroup('Gunakan foto!')
              					}
              					break
              					case 'trigger':
              					var imgbb = require('imgbb-uploader')
              					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
              						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
              						fakegroup(mess.wait)
              						owgi = await botol.downloadAndSaveMediaMessage(ger)
              						anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
              						ranp = getRandom('.gif')
              						rano = getRandom('.webp')
              						anu1 = await fetchJson(`https://naufalhoster.xyz/textmaker/trigerred?apikey=${config.NaufalKey}&url=${anu.display_url}`)
              						exec(`wget ${anu1.result.image} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=12 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
              							fs.unlinkSync(ranp)
              							exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${rano} -o ${rano}`, async (error) => {
              								if (error) return fakegroup(`Error: ${error}`)
              								botol.sendMessage(from, fs.readFileSync(rano), sticker, { quoted: mek })
              								fs.unlinkSync(rano)
              							})
              						})
              					} else {
              						fakegroup(mess.wrongFormat)
              					}
              					break
              					case 'sfire':
              					var imgbb = require('imgbb-uploader')
              					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
              						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
              						owgi = await botol.downloadAndSaveMediaMessage(ger)
              						anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
              						teks = anu.display_url
              						ranp = getRandom('.gif')
              						rano = getRandom('.webp')
              						anu2 = await fetchJson(`https://docs-jojo.herokuapp.com/api/burning_fire?image_url=${teks}`)
              						sfire = anu2.result
              						exec(`wget ${sfire} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
              							fs.unlinkSync(ranp)
              							if (err) return fakegroup(`Error: ${err}`)
              							exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${rano} -o ${rano}`, async (error) => {
              								if (error) return fakegroup(`Error: ${error}`)
              								botol.sendMessage(from, fs.readFileSync(rano), sticker, { quoted: mek })
              								fs.unlinkSync(rano)
              							})
              						})
              					} else {
              						fakegroup('Gunakan foto!')
              					}
              					break
              					case 'wasted':
              					var imgbb = require('imgbb-uploader')
              					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
              						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
              						owgi = await botol.downloadAndSaveMediaMessage(ger)
              						anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
              						teks = `${anu.display_url}`
              						ranp = getRandom('.gif')
              						rano = getRandom('.webp')
              						anu2 = `https://some-random-api.ml/canvas/wasted?avatar=${teks}`
              						exec(`wget ${anu2} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
              							fs.unlinkSync(ranp)
              							if (err) return fakegroup(`Error: ${err}`)
              							exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${rano} -o ${rano}`, async (error) => {
              								if (error) return fakegroup(`Error: ${error}`)
              								botol.sendMessage(from, fs.readFileSync(rano), sticker, { quoted: mek })
              								fs.unlinkSync(rano)
              							})
              						})
              					} else {
              						fakegroup('Gunakan foto!')
              					}
              					break
           	case 'donasi':
           	fakestatus('Halo kak mau donasi?\nBoleh banget kak, list untuk pembayaran donasi ada dibawah in.\n\n• Dana : +62 878-9151-8799\n• Gopay : +62 878-9151-8799\n• Pulsa : +62 878-9151-8799\n\nTerimakasih sudah berdonasi, uangnya untuk memperpanjang server bot.')
           	break
           	case 'info':
           	fakestatus(`Halo kak 👋🏻 perkenalkan saya botol, saya adalah bot whatsapp yang terbuat dari bahasa node js dan beberapa api, saya juga memakai lib dari *Baileys* yang dibuat oleh *Adiwajshing*\n\nBot ini juga merupakan open source yang dapat anda lihat di https://github.com/progsysdriver/botol-bot\nDiperbolehkan bagi siapapun menggunakan bot kami tetapi ingat, jangan menghilangkan hak cipta dari bot kami\n\nOwner Botol bot adalah Angga surya x ProgsysDriver\n\nIni dibuat untuk bahan belajar dan senang senang saja, jadi kalau ada kurangnya mohon maaf yang sebesar besarnya, Untuk informasi lebih lanjut silahkan join gup botol https://chat.whatsapp.com/CZwRj7oCIzn59Fxa9GNTFA\n\nTerimakasih yang sudah berkonstribusi`)
           	break
    case 'kontag':
            if (!mek.key.fromMe) return reply('Botol-BOT')
            pe = args.join('')
            entah = pe.split('|')[0]
            nah = pe.split('|')[1]
            if (isNaN(entah)) return reply('Invalid phone number');
            members_ids = []
            for (let mem of groupMembers) {
            members_ids.push(mem.jid)
            }
            vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + `FN:${nah}\n`
            + `TEL;type=CELL;type=VOICE;waid=${entah}:${phoneNum('+' + entah).getNumber('internasional')}\n`
            + 'END:VCARD'.trim()
            botol.sendMessage(from, {displayName: `${nah}`, vcard: vcard}, contact, {contextInfo: {"mentionedJid": members_ids}})
            break
    case 'sticktag':
      if (!isGroup) return fakegroup(mess.only.group)
      if (!isGroupAdmins) return fakegroup(mess.only.admin)
            if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
            encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            file = await botol.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
            value = args.join(" ")
            var group = await botol.groupMetadata(from)
            var member = group['participants']
            var mem = []
            member.map(async adm => {
            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
            })
            var options = {
                contextInfo: { mentionedJid: mem },
                quoted: mek
            }
            ini_buffer = fs.readFileSync(file)
            botol.sendMessage(from, ini_buffer, sticker, options)
            fs.unlinkSync(file)
            } else {
            reply(`*Reply sticker yang sudah dikirim*`)
            }
            break
    case 'fitnah':
            if (args.length < 1) return reply(`Usage :\n${prefix}fitnah [@tag|pesan|balasanbot]]\n\nEx : \n${prefix}fitnah @tagmember|hai|hai juga`)
            var gh = args.join('')
            mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
            var replace = gh.split("|")[0];
            var target = gh.split("|")[1];
            var bot = gh.split("|")[2];
            botol.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` }}})
            break
    case 'settarget':
      if (!isOwner) return
            if(!q) return reply(`${prefix}settarget 628xxxxx`)
            targetpc = args[0]
            fakegroup(`Succes Mengganti target fitnahpc : ${targetpc}`)
            break
    case 'fitnahpc':
      if (!isOwner) return
            if(!q) return reply(`${prefix}fitnahpc teks target|teks lu`)
            jids = `${targetpc}@s.whatsapp.net` // nomer target
            var split = args.join(' ').replace(/@|\d/gi, '').split('|')
            var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
            var options = {contextInfo: {quotedMessage: {extendedTextMessage: {text: split[0]}}}}
            const responye = await botol.sendMessage(jids, `${split[1]}`, MessageType.text, options)
            await botol.deleteMessage(jids, { id: responye.messageID, remoteJid: jids, fromMe: true })
            break
    case 'tomp3':
       if (!isGroupBotol) return reply(mess.only.groupb)
            if (!isQuotedVideo) return fakegroup('Reply videonya!')
            fakegroup(mess.wait)
            encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
            media = await botol.downloadAndSaveMediaMessage(encmedia)
            ran = getRandom('.mp4')
            exec(`ffmpeg -i ${media} ${ran}`, (err) => {
            fs.unlinkSync(media)
            if (err) return fakegroup(`Err: ${err}`)
            buffer453 = fs.readFileSync(ran)
            botol.sendMessage(from, buffer453, audio, { mimetype: 'audio/mp4', quoted: mek })
            fs.unlinkSync(ran)
            })
            break
    case 'kontak':
      if (!isGroup) return fakegroup(mess.only.group)
            pe = args.join(' ') 
            entah = pe.split('|')[0]
            nah = pe.split('|')[1]
            if (isNaN(entah)) return reply('Invalid phone number');
            vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + `FN:${nah}\n`
            + `TEL;type=CELL;type=VOICE;waid=${entah}:${phoneNum('+' + entah).getNumber('internasional')}\n`
            + 'END:VCARD'.trim()
            botol.sendMessage(from, {displayName: `${nah}`, vcard: vcard}, contact)
            break    
    case 'take':
    case 'colong':
       if (!isGroupBotol) return reply(mess.only.groupb)
      reply(mess.wait)
    		if (!isQuotedSticker) return reply('Stiker aja om')
            encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
		    media = await botol.downloadAndSaveMediaMessage(encmedia)
            anu = args.join(' ').split('|')
            satu = anu[0] !== '' ? anu[0] : `Botol`
            dua = typeof anu[1] !== 'undefined' ? anu[1] : `BOT`
            require('./lib/fetcher.js').createExif(satu, dua)
			require('./lib/fetcher.js').modStick(media, botol, mek, from)
			break
	case 'stikerwm':
	case 'stickerwm':
    case 'swm':
       if (!isGroupBotol) return reply(mess.only.groupb)
      reply(mess.wait)
            pe = args.join('')
            var a = pe.split("|")[0];
            var b = pe.split("|")[1];
            if (isMedia && !mek.message.videoMessage || isQuotedImage ) {
            const encmedia = isQuotedImage   ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
             media = await botol.downloadAndSaveMediaMessage(encmedia)
            await createExif(a,b)
            out = getRandom('.webp')
            ffmpeg(media)
            .on('error', (e) => {
            console.log(e)
            botol.sendMessage(from, 'Terjadi kesalahan', 'conversation', { quoted: mek })
            fs.unlinkSync(media)
            })
            .on('end', () => {
            _out = getRandom('.webp')
            spawn('webpmux', ['-set','exif','./stik/data.exif', out, '-o', _out])
            .on('exit', () => {
            botol.sendMessage(from, fs.readFileSync(_out),'stickerMessage', { quoted: mek })
            fs.unlinkSync(out)
            fs.unlinkSync(_out)
            fs.unlinkSync(media)
            })
            })
            .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(out) 
            } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
            const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
            const media = await botol.downloadAndSaveMediaMessage(encmedia)
            pe = args.join('')
            var a = pe.split("|")[0];
            var b = pe.split("|")[1];
            await createExif(a,b)
            out = getRandom('.webp')
            ffmpeg(media)
            .on('error', (e) => {
            console.log(e)
            botol.sendMessage(from, 'Terjadi kesalahan', 'conversation', { quoted: mek })
            fs.unlinkSync(media)
            })
            .on('end', () => {
            _out = getRandom('.webp')
            spawn('webpmux', ['-set','exif','./stik/data.exif', out, '-o', _out])
            .on('exit', () => {
            botol.sendMessage(from, fs.readFileSync(_out),'stickerMessage', { quoted: mek })
            fs.unlinkSync(out)
            fs.unlinkSync(_out)
            fs.unlinkSync(media)
            })
            })
            .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(out)       
            } else {
            reply(`Kirim gambar dengan caption ${prefix}swm teks|teks atau tag gambar yang sudah dikirim`)
            }
            break
    case 'upswteks':
      if (!isOwner) return
            if (!q) return fakestatus('Isi teksnya!')
            botol.sendMessage('status@broadcast', `${q}`, extendedText)
            fakegroup(`Sukses Up story wea teks ${q}`)
            break
    case 'upswimage':
      if (!isOwner) return
            if (isQuotedImage) {
            const swsw = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            cihcih = await botol.downloadMediaMessage(swsw)
            botol.sendMessage('status@broadcast', cihcih, image, { caption: `${q}` })
            bur = `Sukses Upload Story Image dengan Caption: ${q}`
            botol.sendMessage(from, bur, text, { quoted: mek })
            } else {
            fakestatus('Reply gambarnya!')
            }
            break
    case 'upswvideo':
      if (!isOwner) return
            if (isQuotedVideo) {
            const swsw = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            cihcih = await botol.downloadMediaMessage(swsw)
            botol.sendMessage('status@broadcast', cihcih, video, { caption: `${q}` }) 
            bur = `Sukses Upload Story Video dengan Caption: ${q}`
            botol.sendMessage(from, bur, text, { quoted: mek })
            } else {
            fakestatus('reply videonya!')
            }
            break
    case 'fdeface':
            var nn = body.slice(12)
            var urlnye = nn.split("|")[0];
            var titlenye = nn.split("|")[1];
            var descnye = nn.split("|")[2];
            imgbbb = require('imgbb-uploader')
            run = getRandom('.jpeg')
            encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            media = await botol.downloadAndSaveMediaMessage(encmedia)
            ddatae = await imageToBase64(JSON.stringify(media).replace(/\"/gi, ''))
            botol.sendMessage(from, {
              text: `${urlnye}`,
              matchedText: `${urlnye}`,
              canonicalUrl: `${urlnye}`,
              description: `${descnye}`,
              title: `${titlenye}`,
              jpegThumbnail: ddatae
            }, 'extendedTextMessage', { detectLinks: false })
            break
    case 'public':
      if (!isOwner) return
          	if (!mek.key.fromMe) return fakestatus('Botol-BOT')
          	if (banChats === false) return
          	// var taged = ben.message.extendedTextMessage.contextInfo.mentionedJid[0]
          	banChats = false
          	fakestatus(`*PUBLIC-MODE*`)
          	break
	case 'self':
	  if (!isOwner) return
          	if (!mek.key.fromMe) return fakestatus('Botol-BOT')
          	if (banChats === true) return
          	uptime = process.uptime()
         	 // var taged = ben.message.extendedTextMessage.contextInfo.mentionedJid[0]
         	banChats = true
          	fakestatus(`*self-MODE*`)
          	break
 	case 'hidetag':
 	  if (!isGroup) return fakegroup(mess.only.group)
    if (!isGroupAdmins) return fakegroup(mess.only.admin)
			if (!isGroup) return reply(mess.only.group)
			var value = args.join(' ')
			var group = await botol.groupMetadata(from)
			var member = group['participants']
			var mem = []
			member.map(async adm => {
			mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			})
			var optionshidetag = {
			text: value,
			contextInfo: { mentionedJid: mem },
			quoted: mek
			}
			botol.sendMessage(from, optionshidetag, text)
			break
	case 'play':
	   if (!isGroupBotol) return reply(mess.only.groupb)
	  reply(mess.wait)
	  if (!isGroup) return fakegroup(mess.only.group)
			if (args.length === 0) return reply(`Kirim perintah *${prefix}play* _Judul lagu yang akan dicari_`)
            var srch = args.join('')
    		aramas = await yts(srch);
    		aramat = aramas.all 
   			var mulaikah = aramat[0].url							
                  try {
                    yta(mulaikah)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then(async (a) => {
                        if (Number(filesize) >= 100000) return sendMediaURL(from, thumb, `*SCRAPE MUSIC DOWNLOADER*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
                        const captions = `*SCRAPE MUSIC DOWNLOADER*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        sendMediaURL(from, thumb, captions)
                        await sendMediaURL(from, dl_link).catch(() => reply('error'))
                        })                
                        })
                        } catch (err) {
                        reply(mess.error.api)
                        }
                   break  
        case 'video': 
          if (!isGroupBotol) return reply(mess.only.groupb)
          reply(mess.wait)
          if (!isGroup) return fakegroup(mess.only.group)
            if (args.length === 0) return reply(`Kirim perintah *${prefix}video* _Judul lagu yang akan dicari_`)
            var srch = args.join('')
            aramas = await yts(srch);
            aramat = aramas.all 
            var mulaikah = aramat[0].url                            
                  try {
                    ytv(mulaikah)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then(async (a) => {
                        if (Number(filesize) >= 100000) return sendMediaURL(from, thumb, `*SCRAPE VIDEO DOWNLOADEE*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
                        const captions = `*SCRAPE VIDEO DOWNLOADER*\n\n*Title* : ${title}\n*Ext* : MP4\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        sendMediaURL(from, thumb, captions)
                        await sendMediaURL(from, dl_link).catch(() => reply('error'))
                        })                
                        })
                        } catch (err) {
                        reply(mess.error.api)
                        }
                   break      
    case 'sticker': 
    case 'stiker':
    case 'sg':
    case 's':
       if (!isGroupBotol) return reply(mess.only.groupb)
      reply(mess.wait)
          if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
            const media = await botol.downloadAndSaveMediaMessage(encmedia)
            ran = getRandom('.webp')
            await ffmpeg(`./${media}`)
              .input(media)
              .on('start', function (cmd) {
                console.log(`Started : ${cmd}`)
              })
              .on('error', function (err) {
                console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                reply(mess.error.stick)
              })
              .on('end', function () {
                console.log('Finish')
                botol.sendMessage(from, fs.readFileSync(ran), sticker, { quoted:mek}) 
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
              })
              .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
              .toFormat('webp')
              .save(ran)
          } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
            const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
            const media = await botol.downloadAndSaveMediaMessage(encmedia)
            ran = getRandom('.webp')
            reply(mess.wait)
            await ffmpeg(`./${media}`)
              .inputFormat(media.split('.')[1])
              .on('start', function (cmd) {
                console.log(`Started : ${cmd}`)
              })
              .on('error', function (err) {
                console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
              })
              .on('end', function () {
                console.log('Finish')
                botol.sendMessage(from, fs.readFileSync(ran), sticker, {quoted:mek})
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
              })
              .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
              .toFormat('webp')
              .save(ran)
          } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
            const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
            const media = await botol.downloadAndSaveMediaMessage(encmedia)
            ran = getRandom('.webp')
            await ffmpeg(`./${media}`)
              .inputFormat(media.split('.')[1])
              .on('start', function (cmd) {
                console.log(`Started : ${cmd}`)
              })
              .on('error', function (err) {
                console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                reply(`Yah gagal, coba ulangi ^_^`)
              })
              .on('end', function () {
                console.log('Finish')
                buff = fs.readFileSync(ran)
                botol.sendMessage(from, buff, sticker,{quoted:mek})
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
            })
            .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(ran)
            } else {
            reply(`Kirim gambaar dengan caption ${prefix}sticker atau reply/tag gambar`)
          	}
          	break              
    case 'toimg':
      if (!isGroupBotol) return reply(mess.only.groupb)
			if (!isQuotedSticker) return reply('𝗥𝗲𝗽𝗹𝘆/𝘁𝗮𝗴 𝘀𝘁𝗶𝗰𝗸𝗲𝗿 !')
			reply(mess.wait)
			encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
			media = await botol.downloadAndSaveMediaMessage(encmedia)
			ran = getRandom('.png')
			exec(`ffmpeg -i ${media} ${ran}`, (err) => {
			fs.unlinkSync(media)
			if (err) return reply('Yah gagal, coba ulangi ^_^')
			buffer = fs.readFileSync(ran)
			fakethumb(buffer,'DWONLOAD DULU INI BER THUMBNAIL')
			fs.unlinkSync(ran)
			})
			break
	case 'ytsearch':
	if (!isGroupBotol) return reply(mess.only.groupb)
	  if (!isGroup) return fakegroup(mess.only.group)
			if (args.length < 1) return reply('Tolong masukan query!')
			reply(mess.wait)
			var srch = args.join('');
			try {
        	var aramas = await yts(srch);
   			} catch {
        	return await botol.sendMessage(from, 'Error!', MessageType.text, dload)
    		}
    		aramat = aramas.all 
    		var tbuff = await getBuffer(aramat[0].image)
    		var ytresult = '';
    		ytresult += '「 *YOUTUBE SEARCH SCRAPE* 」'
    		ytresult += '\n________________________\n\n'
   			aramas.all.map((video) => {
        	ytresult += '❏ Title: ' + video.title + '\n'
            ytresult += '❏ Link: ' + video.url + '\n'
            ytresult += '❏ Durasi: ' + video.timestamp + '\n'
            ytresult += '❏ Upload: ' + video.ago + '\n________________________\n\n'
    		});
    		ytresult += '◩ *BOTOL BOT*'
    		await fakethumb(tbuff,ytresult)
			break
	case 'setreply':
	case 'setfake':
	  if (!isOwner) return
			if (!q) return fakegroup(mess.wrongFormat)
			fake = q
			fakegroup(`Succes Mengganti Conversation Fake : ${q}`)
			break
	case 'setprefix':
	  if (!isOwner) return
			prefix = q
			fakegroup(`Succes Mengganti Prefix : ${q}`)
			break
	case 'setfakeimg':
	  if (!isOwner) return
        	if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedSticker) && args.length == 0) {
          	boij = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
			delb = await botol.downloadMediaMessage(boij)
			fs.writeFileSync(`./stik/fake.jpeg`, delb)
			fakestatus('Sukses')
        	} else {
            reply(`Kirim gambar dengan caption ${prefix}sethumb`)
          	}
			break	
	case 'setthumb':
	  if (!isOwner) return
	        if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedSticker) && args.length == 0) {
          	boij = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
			delb = await botol.downloadMediaMessage(boij)
			fs.writeFileSync(`./stik/thumb.jpeg`, delb)
			fakestatus('Sukses')
        	} else {
            reply(`Kirim gambar dengan caption ${prefix}sethumb`)
          	}
			break	
	case 'ytmp4':
	   if (!isGroupBotol) return reply(mess.only.groupb)
	  if (!isGroup) return fakegroup(mess.only.group)
			if (args.length === 0) return reply(`Kirim perintah *${prefix}ytmp4 [linkYt]*`)
			let isLinks2 = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
			if (!isLinks2) return reply(mess.error.Iv)
				try {
				reply(mess.wait)
				ytv(args[0])
				.then((res) => {
				const { dl_link, thumb, title, filesizeF, filesize } = res
				axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
				.then((a) => {
				if (Number(filesize) >= 40000) return sendMediaURL(from, thumb, `*SCRAPE VIDEO YOUTUBE DOWNLOADER*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
				const captionsYtmp4 = `*SCRAPE VIDEO YOUTUBE DOWNLOADER*\n\n*Title* : ${title}\n*Ext* : MP4\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
				sendMediaURL(from, thumb, captionsYtmp4)
				sendMediaURL(from, dl_link).catch(() => reply(mess.error.api))
				})		
				})
				} catch (err) {
			    reply(mess.error.api)
				}
				break
	case 'emoji':
	   if (!isGroupBotol) return reply(mess.only.groupb)
	  if (!isGroup) return fakegroup(mess.only.group)
			if (!q) return fakegroup('emojinya?')
			reply(mess.wait)
			qes = args.join(' ')
			emoji2.get(`${qes}`).then(emoji2 => {
			teks = `${emoji2.images[4].url}`
    		sendStickerFromUrl(from,`${teks}`)	
    		console.log(teks)
   			})
    		break
	case 'ytmp3':
	   if (!isGroupBotol) return reply(mess.only.groupb)
	  if (!isGroup) return fakegroup(mess.only.group)
			if (args.length === 0) return reply(`Kirim perintah *${prefix}ytmp3 [linkYt]*`)
			let isLinks = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
			if (!isLinks) return reply(mess.error.Iv)
				try {
				reply(mess.wait)
				yta(args[0])
				.then((res) => {
				const { dl_link, thumb, title, filesizeF, filesize } = res
				axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
				.then((a) => {
			    if (Number(filesize) >= 30000) return sendMediaURL(from, thumb, `*SCRAPE MUSIC YOUTUBE DOWNLOADER*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
				const captions = `*SCRAPE MUSIC YOUTUBE DOWNLOADER*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
				sendMediaURL(from, thumb, captions)
				sendMediaURL(from, dl_link).catch(() => reply(mess.error.api))
				})
				})
				} catch (err) {
				reply(mess.error.api)
				}
				break
    case 'image':
    case 'pinterest':
      if (!isGroup) return fakegroup(mess.only.group)
            if (args.length < 1) return reply('Masukan teks!')
            const gimg = args[0];
            reply(mess.wait)
            gis(gimg, async (error, result) => {
            for (var i = 0; i < (result.length < 1 ? result.length : 1); i++) {
            var get = got(result[i].url);
            var stream = get.buffer();
            stream.then(async (images) => {
            await fakethumb(images);
            });
            }
            });
            break
    case 'tiktok':
       if (!isGroupBotol) return reply(mess.only.groupb)
      if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.Iv)
    if (!q) return fakegroup('Linknya?')
    reply(mess.wait)
    tik.ssstik(`${args[0]}`)
      .then(result => {
        const { videonowm, videonowm2, text } = result
        axios.get(`https://tinyurl.com/api-create.php?url=${videonowm2}`)
          .then(async (a) => {
            me = `*Title* : ${text}\n*Link* : ${a.data}`
            botol.sendMessage(from, { url: `${videonowm}` }, video, { mimetype: 'video/mp4', quoted: mek, caption: me })
          })
      })
      .catch(e => console.log(e))
    break
    case 'tiktokaudio':
       if (!isGroupBotol) return reply(mess.only.groupb)
      if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.Iv)
    if (!q) return fakegroup('Linknya?')
    reply(mess.wait)
    tik.ssstik(`${args[0]}`)
      .then(result => {
        const { music, text } = result
        botol.sendMessage(from, { url: `${music}` }, audio, { mimetype: 'audio/mp4', filename: `${text}`, quoted: mek })
      })
      .catch(e => console.log(e))
    break
    case 'tiktok2':
       if (!isGroupBotol) return reply(mess.only.groupb)
      if (!isGroup) return fakegroup(mess.only.group)
            if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.Iv)
            if (!q) return fakegroup('Linknya?')
            reply(mess.wait)
            zrapi.keeptiktok(`${args[0]}`)
            .then(data => {
            da = `${data}`
            axios.get(`https://tinyurl.com/api-create.php?url=${da}`)
            .then(async (a) => {
            sendMediaURL(from,da,`*SCRAPE TIKTOK DOWNLOADER*\n\n*Link* : ${a.data}`) 
            })
            })
            break
    case 'brainly':
      reply(mess.wait)
			if (args.length < 1) return reply('Pertanyaan apa')
          	brien = args.join(' ')
			brainly(`${brien}`).then(res => {
			teks = '❉───────────────────────❉\n'
			for (let Y of res.data) {
			teks += `\n*BRAINLY SCRAPE BY BOTOL*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n❉──────────────────❉\n`
			}
			botol.sendMessage(from, teks, text,{quoted:mek,detectLinks: false})                        
            })              
			break
		case 'igpict':
		  if (!isUrl(args[0]) && !args[0].includes('instagram.com')) return reply(mess.Iv)
		if (!q) return fakegroup('Linknya?')
		reply(mess.wait)
		igdll(args[0])
		  .then((result) => {
		    for (Y of result.url_list)
		      sendMediaURL(from, Y, 'INSTAGRAM SCRAPE DOWNLOADER BY BOTOL')
		  })
		break
		case 'ig':
		   if (!isGroupBotol) return reply(mess.only.groupb)
		  reply(mess.wait)
		entah = args[0]
		scrapIgMedia(entah).then(async (res) => {
		  if (res.result.status === 404) return reply(`Scraper Error: ${res.result.status}`)
		  const teks = `*INSTAGRAM SCRAPE DOWNLOADER*\n\n${res.result.caption}`
		  if (res.result.is_video) {
		    for (let lnk of res.result.src) {
		      const bufer = await getBuffer(lnk)
		      botol.sendMessage(from, bufer, video, { caption: teks, quoted: mek })
		    }
		  } else {
		    for (let lnk of res.result.src) {
		      const bufer = await getBuffer(lnk)
		      botol.sendMessage(from, bufer, image, { caption: teks, quoted: mek })
		    }
		  }
		})
		break
    case 'igvid':
       if (!isGroupBotol) return reply(mess.only.groupb)
      if (!isGroup) return fakegroup(mess.only.group)
            if (!isUrl(args[0]) && !args[0].includes('instagram.com')) return reply(mess.Iv)
            if (!q) return fakegroup('Linknya?')
            reply(mess.wait)
            zrapi.instagram(`${args[0]}`)
            .then(a => {
            da = `${a.link}`
            axios.get(`https://tinyurl.com/api-create.php?url=${da}`)
            .then(async (s) => {
            sendMediaURL(from,da,`*INSTAGRAM SCRAPE DOWNLOADER*\n\n*Link* : ${s.data}`) 
            })
            })
            break
    case 'igstalk':
       if (!isGroupBotol) return reply(mess.only.groupb)
      if (!isGroup) return fakegroup(mess.only.group)
      reply(mess.wait)
            if (!q) return fakegroup('Usernamenya?')
            ig.fetchUser(`${args.join(' ')}`).then(Y => {
            console.log(`${args.join(' ')}`)
            ten = `${Y.profile_pic_url_hd}`
            teks = `*SCRAPE INSTAGRAM PROFILE*\n*ID* : ${Y.profile_id}\n*Username* : ${args.join('')}\n*Full Name* : ${Y.full_name}\n*Bio* : ${Y.biography}\n*Followers* : ${Y.followers}\n*Following* : ${Y.following}\n*Private* : ${Y.is_private}\n*Verified* : ${Y.is_verified}\n\n*Link* : https://instagram.com/${args.join('')}`
            sendMediaURL(from,ten,teks) 
            })      
            break    
    case 'fb':
       if (!isGroupBotol) return reply(mess.only.groupb)
            if (!q) return reply('Linknya?')
            if (!isUrl(args[0]) && !args[0].includes('facebook.com')) return reply(mess.Iv)
            reply(mess.wait)
            te = args.join(' ')
            Fb.getInfo(`${te}`)
            .then(G => {
            ten = `${G.download.sd}`
            tek = `${G.title}`
            sendMediaURL(from,ten,`*FACEBOOK SCRAPE DOWNLOADER*\n*Title* : ${tek}\n\n*Link* : ${ten}`)
            })
            break    
	case 'term':
	case 'exec':
	  if (!isOwner) return
			if (!q) return fakegroup(mess.wrongFormat)
			exec(q, (err, stdout) => {
			if (err) return fakegroup(`botol-BOT:~ ${err}`)
			if (stdout) {
			fakegroup(stdout)
			}
			})
		    break 
		  case 'open':
		    if (!isGroup) return reply(ind.groupo())
		    if (!isGroupAdmins) return reply(ind.admin())
		    if (!isBotGroupAdmins) return reply(ind.badmin())
		    botol.groupSettingChange(from, GroupSettingChange.messageSend, false)
		    break
		  case 'close':
		    if (!isGroup) return reply(ind.groupo())
		    if (!isGroupAdmins) return reply(ind.admin())
		    if (!isBotGroupAdmins) return reply(ind.badmin())
		    botol.groupSettingChange(from, GroupSettingChange.messageSend, true)
		    break
		 case 'admin':
		 case 'owner':
		 case 'creator':
		 botol.sendMessage(from, { displayname: "Angga Surya", vcard: vcard }, MessageType.contact, { quoted: mek })
    case 'join':
      if (!isOwner) return
            try {
            if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply(mess.Iv)
            hen = args[0]
            if (!q) return fakestatus('Masukan link group')
            var codeInvite = hen.split('https://chat.whatsapp.com/')[1]
            if (!codeInvite) return fakegroup ('pastikan link sudah benar!')
            var response = await botol.acceptInvite(codeInvite)
            fakestatus('SUKSES')
            } catch {
            fakegroup('LINK ERROR!')
            }
            break
    case 'twitter':
       if (!isGroupBotol) return reply(mess.only.groupb)
      if (!isGroup) return fakegroup(mess.only.group)
            if (!isUrl(args[0]) && !args[0].includes('twitter.com')) return reply(mess.Iv)
            if (!q) return fakegroup('Linknya?')
            ten = args[0]
            var res = await twitterGetUrl(`${ten}`)
            .then(g => {
            ren = `${g.download[2].url}`
            sendMediaURL(from,ren,'SCRAPE TWITTER BY BOTOL')
            })
            break
    case 'runtime':
    case 'test':
            run = process.uptime() 
            teks = `${kyun(run)}`
            fakegroup(teks)
            break  
	case 'ping':
			const timestamp = speed();
			const latensi = speed() - timestamp
			exec(`neofetch --stdout`, (error, stdout, stderr) => {
			  const child = stdout.toString('utf-8')
			  const teks = child.replace(/Memory:/, "Ram:")
			  const teks2 = `\nDevice Botol BOT\n----------\n😈 : ${botol.user.name}\n🌐 : ${botol.browserDescription[1]} browser\n🛰 : ${botol.browserDescription[0]} baileys version\n🔁 : ${botol.browserDescription[2]} browser version\n🚀 : ${process.uptime()} speed\n🛖 : ${botol.user.phone.wa_version} wa version`
			  const pingnya = `${teks}${teks2}`
			  fakestatus(pingnya)
			})
			break
			case 'speed':
			fakegroup(`speed, *${processTime(mek.messageTimestamp, moment())} _Seconds_*`)
			break    
			case 'clearall':
			if (!isOwner) return reply(ind.ownerb())
			anu = await botol.chats.all()
			botol.setMaxListeners(25)
			for (let _ of anu) {
			  botol.deleteChat(_.jid)
			}
			reply(ind.clears())
			break
			case 'block':
			botol.updatePresence(from, Presence.composing)
			botol.chatRead(from)
			if (!isGroup) return reply(ind.groupo())
			if (!isOwner) return reply(ind.ownerb())
			botol.blockUser(`${body.slice(7)}@c.us`, "add")
			botol.sendMessage(from, `perintah Diterima, memblokir ${body.slice(7)}@c.us`, text)
			break
			case 'unblock':
			if (!isGroup) return reply(ind.groupo())
			if (!isOwner) return reply(ind.ownerb())
			botol.blockUser(`${body.slice(9)}@c.us`, "remove")
			botol.sendMessage(from, `Perintah diterima, Membuka ${body.slice(9)}@c.us`, text)
			break
			case 'leave':
			if (!isGroup) return reply(ind.groupo())
			if (!isOwner) return reply(ind.ownerb())
			await reply(from, 'bye').then(() => botol.groupLeave(from))
			break
			case 'delete':
			case 'del':
			case 'd':
			botol.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
			break
			case 'bc':
			if (!isOwner) return reply(ind.ownerb())
			if (args.length < 1) return reply('.......')
			anu = await botol.chats.all()
			if (isMedia && !mek.message.videoMessage || isQuotedImage) {
			  const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
			  buff = await botol.downloadMediaMessage(encmedia)
			  for (let _ of anu) {
			    botol.sendMessage(_.jid, buff, image, { caption: `${body.slice(4)}\n\n• Broadcast Bot` })
			  }
			  reply('*_succes broadcast_* ')
			} else {
			  for (let _ of anu) {
			    sendMess(_.jid, `${body.slice(4)}\n\n• Broadcast Bot`)
			  }
			  reply('*_succes broadcast_* ')
			}
			break
			case 'totag':
			  if (!isGroupAdmins) return
			  if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
			    encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
			    file = await botol.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
			    value = args.join(" ")
			    var group = await botol.groupMetadata(from)
			    var member = group['participants']
			    var mem = []
			    member.map(async adm => {
			      mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			    })
			    var options = {
			      contextInfo: { mentionedJid: mem },
			      quoted: mek
			    }
			    ini_buffer = fs.readFileSync(file)
			    botol.sendMessage(from, ini_buffer, sticker, options)
			    fs.unlinkSync(file)
			  } else if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
			  encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
			  file = await botol.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
			  value = args.join(" ")
			  var group = await botol.groupMetadata(from)
			  var member = group['participants']
			  var mem = []
			  member.map(async adm => {
			    mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			  })
			  var options = {
			    contextInfo: { mentionedJid: mem },
			    quoted: mek
			  }
			  ini_buffer = fs.readFileSync(file)
			  botol.sendMessage(from, ini_buffer, image, options)
			  fs.unlinkSync(file)
			} else if ((isMedia && !mek.message.videoMessage || isQuotedAudio) && args.length == 0) {
			  encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
			  file = await botol.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
			  value = args.join(" ")
			  var group = await botol.groupMetadata(from)
			  var member = group['participants']
			  var mem = []
			  member.map(async adm => {
			    mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			  })
			  var options = {
			    mimetype: 'audio/mp4',
			    ptt: true,
			    contextInfo: { mentionedJid: mem },
			    quoted: mek
			  }
			  ini_buffer = fs.readFileSync(file)
			  botol.sendMessage(from, ini_buffer, audio, options)
			  fs.unlinkSync(file)
			} else if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
			  encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
			  file = await botol.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
			  value = args.join(" ")
			  var group = await botol.groupMetadata(from)
			  var member = group['participants']
			  var mem = []
			  member.map(async adm => {
			    mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			  })
			  var options = {
			    mimetype: 'video/mp4',
			    contextInfo: { mentionedJid: mem },
			    quoted: mek
			  }
			  ini_buffer = fs.readFileSync(file)
			  botol.sendMessage(from, ini_buffer, video, options)
			  fs.unlinkSync(file)
			} else {
			  reply(`reply gambar/sticker/audio/video dengan caption ${prefix}totag`)
			}
			break
			case 'tomp4':
			   if (!isGroupBotol) return reply(mess.only.groupb)
			  if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
			    ger = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
			    owgi = await botol.downloadAndSaveMediaMessage(ger)
			    webp2mp4File(owgi).then(res => {
			      sendMediaURL(from, res.result, 'Done')
			    })
			  } else {
			    reply('reply stiker')
			  }
			fs.unlinkSync(owgi)
			break
default:
if (budy.startsWith('z')){
return botol.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: mek})
}  

	}
if (isGroup && budy != undefined) {
	} else {
	console.log(color('[TEXT]', 'red'), 'Botol', color(sender.split('@')[0]))
	}		
	} catch (e) {
	console.log('Message : %s', color(e, 'green'))
	// console.log(e)
	}
}
