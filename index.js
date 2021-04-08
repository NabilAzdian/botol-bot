// aktifkan bila sering close sendiri
//process.on('uncaughtException', console.error)
const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid
	} = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone")
const fs = require("fs")
const speed = require('performance-now')
const { Utils_1 } = require('./node_modules/@adiwajshing/baileys/lib/WAConnection/Utils')
const tiktod = require('tiktok-scraper')
const axios = require("axios")
const ffmpeg = require('fluent-ffmpeg')
const imageToBase64 = require('image-to-base64');
const { removeBackgroundFromImageFile } = require('remove.bg')
const { spawn, exec, execSync } = require("child_process")
const fetchs = require("node-superfetch");
const ms = require('parse-ms')
const toMs = require('ms')
const figlet = require('figlet')
const lolcatjs = require('lolcatjs')
const phoneNum = require('awesome-phonenumber')

/* CALLBACK */
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { color, bgcolor } = require('./lib/color')
const { fetchJson, uploadImages } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { error } = require("qrcode-terminal")
const { processTime, sleep, hilih } = require('./lib/index')
const { custom, random } = require('./lib/meme')
const Exif = require('./lib/exif');
const exif = new Exif();

/* DATABASE */
const left = JSON.parse(fs.readFileSync('./src/left.json'))
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const setiker = JSON.parse(fs.readFileSync('./src/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./src/video.json'))
const audionye = JSON.parse(fs.readFileSync('./src/audio.json'))
const imagenye = JSON.parse(fs.readFileSync('./src/image.json'))
const truth = JSON.parse(fs.readFileSync('./src/truth.json'))
const dare = JSON.parse(fs.readFileSync('./src/dare.json'))
const config = JSON.parse(fs.readFileSync('./config.json'))
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const timet = moment().tz('Asia/Jakarta').format("HH:mm")
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:Owner\n' 
            + 'ORG: Creator Botol BOT;\n' 
            + `TEL;type=CELL;type=VOICE;waid=${config.ownerNumber}:${config.ownerNumberr}\n`
            + 'END:VCARD'

prefix = '.'
fake = '*BOTOL BOT*'
numbernya = '0'

function kyun(seconds){
    function pad(s){
      return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);
  
    //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
    return `Runtime\n${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S`
}

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

async function starts() {
    const client = new WAConnection()

    client.logger.level = 'warn'

    client.on('qr', () => {
        console.log('[', color('!', 'red') ,']', 'Please, scan the QR code!')
    })

    fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
    client.on('connecting', () => {
        console.log(color('Connecting to WhatsApp...', 'green'))
    })
    client.on('open', () => {
        console.log(color('Connected', 'green'))
        lolcatjs.fromString(figlet.textSync('Botol-Bot', 'Larry 3D'))
    })
    await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

    client.on('chat-update', async (mek) => {
        try {
            if (!mek.hasNewMessage) return
            mek = JSON.parse(JSON.stringify(mek)).messages[0]
            if (!mek.message) return
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (mek.key.fromMe) return
            const content = JSON.stringify(mek.message)
            const from = mek.key.remoteJid
            const type = Object.keys(mek.message)[0]
            const { text, extendedText, liveLocation, contact, contactsArray, location, image, video, sticker, document, audio, product } = MessageType
            const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
            const body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
            const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
            const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
            const arg = body.substring(body.indexOf(' ') + 1)
            const args = body.trim().split(/ +/).slice(1)
            const isCmd = body.startsWith(prefix)
            const q = args.join(' ')
            const botNumber = client.user.jid
            const ownerNumber = [`${config.ownerNumber}@s.whatsapp.net`] // Replace with your number
            const isGroup = from.endsWith('@g.us')
            const sender = isGroup ? mek.participant : mek.key.remoteJid
            const sender1 = sender === undefined ? botNumber : sender
            const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const groupId = isGroup ? groupMetadata.jid : ''
      	    const groupMembers = isGroup ? groupMetadata.participants : ''
      	    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
      	    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isGroupAdmins = groupAdmins.includes(sender) || false
            pushname = client.contacts[sender1] != undefined ? client.contacts[sender1].vname || client.contacts[sender1].notify : undefined
            const isOwner = ownerNumber.includes(sender)
            pushname2 = client.contacts[sender1] != undefined ? client.contacts[sender1].vname || client.contacts[sender1].notify : undefined
      			const isUrl = (url) => {
      			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
      			}
      			const reply = (teks) => {
      				client.sendMessage(from, teks, text, {quoted:mek})
      			}
      			const sendMess = (hehe, teks) => {
      				client.sendMessage(hehe, teks, text)
      			}
      			const mentions = (teks, memberr, id) => {
      				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
                  }
            const sendPtt = (audio) => {
      			client.sendMessage(from, audio, mp3, { quoted: mek })
      		}
      		  
        		const fakestatus = (teks) => {
        			client.sendMessage(from, teks, text, {
        				quoted: {
        					key: {
        						fromMe: false,
        						participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
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
        							"jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg'),
        							"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
        						}
        					}
        				}
        			})
        		}
        		const fakegroup = (teks) => {
        			client.sendMessage(from, teks, text, {
        				quoted: {
        					key: {
        						fromMe: false,
        						participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289523258649-1604595598@g.us" } : {})
        					},
        					message: {
        						conversation: fake
        					}
        				}
        			})
        		}
              mess = {
                wait: 'Sedang di proses...',
                success: 'Berhasil!',
                wrongFormat: 'Format salah, coba liat lagi di menu',
                error: {
                  stick: 'bukan sticker itu',
                  Iv: 'Linknya mokad',
                  bug: 'Error, mungkin disebabkan oleh'
                },
                only: {
                  group: 'Khusus grup ngab',
                  ownerG: 'Khusus owner grup ngab',
                  ownerB: 'Lahh?',
                  admin: 'Mimin grup only bruh...',
                  Badmin: 'Jadiin gw admin dlu:v'
                }
              }

            const isMedia = (type === 'imageMessage' || type === 'videoMessage')
      	    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
      	    const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
            const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
            
                    // Log
              if (isCmd && !isGroup) console.log(color('[Botol-Bot]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(`${pushname}`))
              if (isCmd && isGroup) console.log(color('[Botol-Bot]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(`${pushname}`))

                switch(command) {
                      case 'resepmasakan':
                        anu = await fetchJson(`https://api.vhtear.com/resepmasakan?query=${body.slice(14)}&apikey=${config.vhtearkey}`, { method: 'get' })
                        hasilresep = `*${anu.result.title}*\n${anu.result.desc}\n\n*Untuk Bahan²nya*\n${anu.result.bahan}\n\n*Dan Untuk Tutorialnya*\n${anu.result.cara}`
                        reply(mess.wait)
                        buff = await getBuffer(anu.result.image)
                        client.sendMessage(from, buff, image, { quoted: mek, caption: hasilresep })
                      break
                      case 'cersex':
                        anu = await fetchJson(`https://api.vhtear.com/cerita_sex&apikey=${config.vhtearkey}`, { method: 'get' })
                        if (anu.error) return reply(anu.error)
                        sex = await getBuffer(anu.result.image)
                        reply(mess.wait)
                        cerita = `• *Judul:* ${anu.result.judul}\n\n${anu.result.cerita}`
                        client.sendMessage(from, sex, image, { quoted: mek, caption: cerita })
                      break
                      case 'puisiimg':
                        pus = await getBuffer(`https://api.vhtear.com/puisi_image&apikey=${config.vhtearkey}`, { method: 'get' })
                        client.sendMessage(from, pus, image, { quoted: mek })
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
                    case 'join':
                           if (!isOwner) return fakegroup(mess.only.ownerB)
                           if (!q) return fakestatus('Masukan link group')
                           var codeInvite = body.slice(6).split('https://chat.whatsapp.com/')[1]
                           if (!codeInvite) return fakegroup ('pastikan link sudah benar!')
                           var response = await client.acceptInvite(codeInvite);
                           console.log(response);
                           break
                    case 'take':
              					if (!isQuotedSticker) return fakegroup(`Reply sticker dengan caption *${prefix}take nama|author*`)
              					var pembawm = body.slice(6)
              					var encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
              					var media = await client.downloadAndSaveMediaMessage(encmedia, `./src/sticker/${sender}`)
              					var packname = pembawm.split('|')[0]
                                                      if (!packname) return fakegroup(`Reply sticker dengan caption *${prefix}take nama|author*`)
              					var author = pembawm.split('|')[1]
                                                      if (!author) return fakegroup(`Reply sticker dengan caption *${prefix}take nama|author*`)
              					exif.create(packname, author, `takestick_${sender}`)
              					exec(`webpmux -set exif ./src/sticker/takestick_${sender}.exif ./src/sticker/${sender}.webp -o ./src/sticker/${sender}.webp`, async (error) => {
              					client.sendMessage(from, fs.readFileSync(`./src/sticker/${sender}.webp`), MessageType.sticker, {quoted: mek})
              					fs.unlinkSync(media)
              					fs.unlinkSync(`./src/sticker/takestick_${sender}.exif`)
              				})
              				break
                    case 'term':
                    case 'exec':
                    if (!isOwner) return fakegroup(mess.only.ownerB)
                    if (!q) return fakegroup(mess.wrongFormat)
                    exec(q, (err, stdout) => {
                      if (err) return fakegroup(`root@Botol-Bot:~ ${err}`)
                      if (stdout) {
                        fakestatus(stdout)
                      }
                    })
                    break
                    case 'play':
                    if (!q) return fakegroup(mess.wrongFormat)
                    data = await fetchJson(`https://api.vhtear.com/ytmp3?query=${q}&apikey=${config.config.vhtearkey}`, { method: 'get' })
                    playmp3 = data.result
                    var teks = `• Judul : ${playmp3.title}
• Duration : ${playmp3.duration}
• Size : ${playmp3.size}
• Ext : ${playmp3.ext}
• Id : ${playmp3.id}
• Link : ${playmp3.mp3}
• Source : ${playmp3.url}`
                    
                    const playing = { key: { participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": `*Duration* : ${playmp3.duration}\n*Size* : ${playmp3.size}\n*Ext* : ${playmp3.ext}`, "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg') } } }
                    
                    thumb = await getBuffer(playmp3.image)
                    fakestatus(mess.wait)
                    client.sendMessage(from, thumb, image, { caption: `${teks}`, quoted: playing })
                    bufferss = await getBuffer(playmp3.mp3)
                    client.sendMessage(from, bufferss, MessageType.audio, { mimetype: 'audio/mp4', filename: `${playmp3.title}.mp3`, quoted: playing })
                    break
                    case 'ytmp4':
                    if (!q) return fakegroup(mess.wrongFormat)
                    fetchytmp4 = await fetchJson(`https://api.zeks.xyz/api/ytmp4/2?url=${q}&apikey=apivinz`, { method: 'get' })
                    ytmp4 = fetchytmp4.result
                    var resultytmp4 = `
「 Youtube MP4 」

• Title : ${ytmp4.title}
• Size : ${ytmp4.size}
• Quality : ${ytmp4.quality}
• Ext : ${ytmp4.ext}
• Link : ${ytmp4.link}`
                    thumbytmp4 = await getBuffer(ytmp4.thumb)
                    fakestatus(mess.wait)
                    const replymp4 = { key: { participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": `*Title* : ${ytmp4.title}\n*Size* : ${ytmp4.size}\n*Quality* : ${ytmp4.quality}`, "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg') } } }
                    client.sendMessage(from, thumbytmp4, image, { caption: resultytmp4, quoted: replymp4 })
                    buffermp4 = await getBuffer(ytmp4.link)
                    client.sendMessage(from, buffermp4, video, { mimetype: 'video/mp4', caption: resultytmp4, quoted: replymp4 })
                    break
                    case 'ytmp3':
                                        if (!q) return fakegroup(mess.wrongFormat)
                                        fetchytmp3 = await fetchJson(`https://api.vhtear.com/ytmp3?query=${q}&apikey=$=${config.config.vhtearkey}`, { method: 'get' })
                                        ytmp3 = fetchytmp3.result
                                        var resultytmp3 = `
「 Youtube MP3 」

• Title : ${ytmp3.title}
• Size : ${ytmp3.size}
• Duration : ${ytmp3.duration}
• Ext : ${ytmp3.ext}
• Id : ${ytmp3.id}
• Link : ${ytmp3.mp3}`
                                        thumbytmp3 = await getBuffer(ytmp3.image)
                                        fakestatus(mess.wait)
                                        const replymp3 = { key: { participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": `*Duration* : ${ytmp3.duration}\n*Size* : ${ytmp3.size}\n*Ext* : ${ytmp3.ext}`, "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg') } } }
                                        client.sendMessage(from, thumbytmp3, image, { caption: resultytmp3, quoted: mek })
                                        const buffermp3 = await getBuffer(ytmp3.mp3)
                                        client.sendMessage(from, buffermp3, audio, { mimetype: 'audio/mp4', "filename": `${ytmp3.title}.mp3`, quoted: replymp3 })
                                        break
                    case 'igstalk':
                                        if (!q) return fakegroup(mess.wrongFormat)
                                        try {
                                          fakegroup(mess.wait)
                             anu = await fetchJson(`https://api.vhtear.com/igprofile?query=${q}&apikey=${config.config.vhtearkey}`)
                              bufferigstalk = await getBuffer(anu.result.picture)
                                                hasil = `「 *INSTAGRAM STALKER* 」

• Fullname: ${anu.result.full_name}
• Post: ${anu.result.post_count}
• Followers: ${convertBalanceToString(anu.result.follower)}
• Following: ${convertBalanceToString(anu.result.follow)}
• Jumlah Postingan: ${convertBalanceToString(anu.result.post_count)}
• Private: ${anu.result.is_private}
• Bio: ${anu.result.biography}
• Link: https://www.instagram.com/${anu.result.username}`
                                                bufferigstalk = await getBuffer(anu.result.picture)
                                                client.sendMessage(from, bufferigstalk, image, { caption: hasil, quoted: mek})
                                        } catch (err) {
                                                fakegroup(`Error! Mungkin nama tidak valid`)
                                        }
                                        break
                    case 'tiktok':
                                        if (!q) return fakegroup('Link?')
                                        ttnwm = await fetchJson(`https://api.vhtear.com/tiktokdl?link=${q}&apikey=${config.config.vhtearkey}`)
                                        buffer = await getBuffer(ttnwm.video)
                                        client.sendMessage(from, buffer, video, { caption: 'TIKTOK DOWNLOADER', mimetype: 'video/mp4', quoted: mek })
                                        break
                    case 'tiktoknowm':
                                        if (!q) return fakegroup('Link?')
                                        ttnwm = await fetchJson(`https://api.vhtear.com/tiktok_no_wm?link=${q}&apikey=${config.config.vhtearkey}`)
                                        buffer = await getBuffer(ttnwm.video)
                                        client.sendMessage(from, buffer, video, { caption: 'TIKTOK NO WATERMARK', mimetype: 'video/mp4', quoted: mek })
                                        break
                    case 'pinterest':
                                        if (!q) return fakegroup('yang Mau dicari apaan')
                                                        data = await fetchJson(`https://api.vhtear.com/pinterest?query=${q}&apikey=${config.config.vhtearkey}`)
                                                        fakestatus(mess.wait)
                                                        if (data.error) return reply(data.error)
                                                        for (let i of data.result) {
                                                                const amsulah = data.result
                                                                pimterest = amsulah[Math.floor(Math.random() * amsulah.length)]
                                                                thumb = await getBuffer(pimterest)
                                                        }
                                                        client.sendMessage(from, thumb, image, { caption: `*PINTEREST*\n\n\n• Hasil dari: ${q}\n\n• Link pinterest:\n` + pimterest, quoted: mek })
                                                        break
                     case 'ig':
                    if (!q) return fakegroup(mess.wrongFormat)
                    igg = await fetchJson(`https://api.vhtear.com/instadl?link=${q}&apikey=${config.config.vhtearkey}`)
                    for(let ig of igg.post){
                    if (ig.type === "image") {
                    buffig = await getBuffer(ig.urlDownload)
                    captigi = `${igg.caption}\n\nby ${igg.owner_username}`
                    client.sendMessage(from, buffig, MessageType.image, { caption: captigi, quoted: mek })
                    } else {
                    bufvig = await getBuffer(ig.urlDownload)
                    captigv = `${igg.caption}\n\nby ${igg.owner_username}`
                    client.sendMessage(from, bufvig, MessageType.video, { caption: captigv, mimetype: 'video/mp4', quoted: mek })
                    }
                    }
                    break
                            case 'ping':
                              const timestamp = speed();
                              const latensi = speed() - timestamp
                              exec(`neofetch --stdout`, (error, stdout, stderr) => {
                                const child = stdout.toString('utf-8')
                                const teks = child.replace(/Memory:/, "Ram:")
                                const teks2 = `\nDevice Botol BOT\n━━━━━━━━━━━━━━━━ \n😈 : ${client.user.name}\n🌐 : ${client.browserDescription[1]} browser\n🛰 : ${client.browserDescription[0]} baileys version\n🔁 : ${client.browserDescription[2]} browser version\n🚀 : ${process.uptime()} speed\n🛖 : ${client.user.phone.wa_version} wa version`
                                const pingnya = `${teks}${teks2}`
                                fakestatus(pingnya)
                              })
                           break
                    case 'speed':
                          reply(`Pong, *${processTime(mek.messageTimestamp, moment())} _Seconds_*`)
                          break
                    case 'h':
                        if (!isGroup) return fakegroup(mess.only.group)
                        if (!isGroupAdmins) return fakegroup(mess.only.admin)
                        var value = args.join(" ")
                        var grup = await client.groupMetadata(from)
                        var member = grup['participants']
                        var mem = []
                        member.map( async adm => {
                            mem.push(adm.jid)
                        })
                        var options = {
                            text: value,
                            contextInfo: {
                                mentionedJid: mem
                            }
                        }
                        client.sendMessage(from, options, text)
                        break
                        case 'owner':
                        case 'creator':
                              client.sendMessage(from, {displayname: "Owner botol bot", vcard: vcard}, MessageType.contact, { quoted: mek})
                              client.sendMessage(from, 'Itu Nomor Owner Botol bot',MessageType.text, { quoted: mek} )
            	          break
                        case 'f':
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
                            client.sendMessage(from, options, text)
                            break
                        case '.':
                        case 'eval':
                        if (!isOwner) return fakegroup(mess.only.ownerB)
                        let code = args.join(" ")
                    try {
    
                    if (!code) return client.reply(from, 'No JavaScript Code', id)
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
                                text: "𝐄𝐗𝐄𝐂𝐔𝐓𝐎𝐑"
                            }
                        }
                    }
                }
                client.sendMessage(from, `${output}`, text, options)
                } catch(err) {
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
                case 'setprefix':
                    if (!isOwner) return fakegroup(mess.only.ownerB)
                    if (args.length < 1) return
                    prefix = args[0]
                    reply(`*Prefix berhasil diubah ke ${prefix}*`)
                    break
                case 'setnomor':
                    if (!isOwner) return fakegroup(mess.only.ownerB)
                    if (args.length < 1) return
                    numbernya = args[0]
                    reply(`*Berhasil ubah nomor ke ${numbernya}*`)
                    break
                case 'setpesan':
                    if (!isOwner) return fakegroup(mess.only.ownerB)
                    if (args.length < 1) return
                    fake = args.join(" ")
                    reply(`*Berhasil mengubah pesan reply ke: ${fake}*`)
                    break
                case 'runtime':
                    runtime = process.uptime()
                    teks = `${kyun(runtime)}`
                    const rtime = {
                        contextInfo: {
                            participant: `${numbernya}@s.whatsapp.net`,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                extendedTextMessage: {
                                    text: "-[ 𝙎𝙏𝘼𝙏𝙐𝙎 ]-"
                                }
                            }
                        }
                    }
                    client.sendMessage(from, `${teks}`, text, rtime)
                    break
                case 'toimg':
                    if ((isQuotedSticker && mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated === false)) {
                        encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo
                        media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.png')
                        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                            fs.unlinkSync(media)
                            if (err) return reply('ada yang error')
                            buffer = fs.readFileSync(ran)
                            client.sendMessage(from, buffer, image, {quoted:mek, caption: "nih dah jadi"})
                            fs.unlinkSync(ran)
                        })
                    } else if ((isQuotedSticker && mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated)) {
                        encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                        media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.gif')
                        ranw = getRandom('.mp4')
                        spawn('./webp2gif', [
                            media,
                            ran
                        ]).on('error', (err) => {
                            reply(`Error: ${err}`).then(() => {
                                console.log(err)
                            })
                            fs.unlinkSync(media)
                        }).on('close', () => {
                            fs.unlinkSync(media)
                            exec(`ffmpeg -i ${ran} -pix_fmt yuv420p ${ranw}`, (err) => {
                                if (err) return reply('error')
                                client.sendMessage(from, fs.readFileSync(ranw), video, {quoted:mek, mimetype: 'video/gif'})
                                fs.unlinkSync(ran)
                                fs.unlinkSync(ranw)
                            })
                        })
                    } else {
                        reply('reply stickernya bang')
                    }
                    break
                    case 'stiker':
                    case 'sticker':
                    case 's':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                      const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                      const media = await client.downloadAndSaveMediaMessage(encmedia)
                      ran = getRandom('.webp')
                      await ffmpeg(`./${media}`)
                        .input(media)
                        .on('start', function(cmd) {
                          console.log(`Started : ${cmd}`)
                        })
                        .on('error', function(err) {
                          console.log(`Error : ${err}`)
                          fs.unlinkSync(media)
                          reply(mess.error.stick)
                        })
                        .on('end', function() {
                          console.log('Finish')
                          exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${ran} -o ${ran}`, async (error) => {
                            //if (error) return reply(mess.error.stick)
                            client.sendMessage(from, fs.readFileSync(ran), MessageType.sticker, { quoted: mek })
                            fs.unlinkSync(media)
                            fs.unlinkSync(ran)
                          })
                        })
                        .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(512,iw)':min'(512,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                        .toFormat('webp')
                        .save(ran)
                    } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                      const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                      const media = await client.downloadAndSaveMediaMessage(encmedia)
                      ran = getRandom('.webp')
                      reply(mess.wait)
                      await ffmpeg(`./${media}`)
                        .inputFormat(media.split('.')[1])
                        .on('start', function(cmd) {
                          console.log(`Started : ${cmd}`)
                        })
                        .on('error', function(err) {
                          console.log(`Error : ${err}`)
                          fs.unlinkSync(media)
                          tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                          reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
                        })
                        .on('end', function() {
                          console.log('Finish')
                          exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${ran} -o ${ran}`, async (error) => {
                           // if (error) return reply(mess.error.stick)
                            client.sendMessage(from, fs.readFileSync(ran), MessageType.sticker, { quoted: mek })
                            fs.unlinkSync(media)
                            fs.unlinkSync(ran)
                          })
                        })
                        .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                        .toFormat('webp')
                        .save(ran)
                    } else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
                      const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                      const media = await client.downloadAndSaveMediaMessage(encmedia)
                      ranw = getRandom('.webp')
                      ranp = getRandom('.png')
                      reply(mess.wait)
                      keyrmbg = config.config.vhtearkey
                      await removeBackgroundFromImageFile({ path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp }).then(res => {
                        fs.unlinkSync(media)
                        let bufferir9vn5 = Buffer.from(res.base64img, 'base64')
                        fs.writeFileSync(ranp, bufferir9vn5, (err) => {
                          if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
                        })
                        exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
                          fs.unlinkSync(ranp)
                          if (err) return reply(mess.error.stick)
                          exec(`webpmux -set exif ${addMetadata(`${config.author}`, authorname)} ${ranw} -o ${ranw}`, async (error) => {
                            if (error) return reply(mess.error.stick)
                            client.sendMessage(from, fs.readFileSync(ranw), MessageType.sticker, { quoted: freply })
                            fs.unlinkSync(ranw)
                          })
                        })
                      })
                    } else {
                      reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break
                    case 'meme':
                        reply('Bentar om, lagi nyari...')
                        var { author, title, postLink, url } = await random()
                        var buffer = await getBuffer(url)
                        var options = {
                            caption: '-[ 𝙈𝙀𝙈𝙀𝙂𝙀𝙉 ]-',
                            contextInfo: {
                                participant: `${numbernya}@s.whatsapp.net`,
                                quotedMessage: {
                                    extendedTextMessage: {
                                        text: `*Author: ${author}*\n*Title: ${title}*\n*Link: ${postLink}*`
                                    }
                                }
                            }
                        }
                        client.sendMessage(from, buffer, image, options)
                        break
                    case 'memeimg':
                        case 'memeimage':
                                if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length > 0) {
                                    const top = arg.split('|')[0]
                                    const bottom = arg.split('|')[1]
                                    const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
                                    const media = await client.downloadMediaMessage(encmedia, 'buffer')
                                    const getUrl = await uploadImages(media, false)
                                    const memeRes = await custom(getUrl, top, bottom)
                                    client.sendMessage(from, memeRes, image, {quoted: mek, caption: 'dah jadi nih bang.'})
                                }
                                break
                    case 'imgtourl':
                        if ((isMedia && !mek.videoMessage || isQuotedImage) && args.length == 0) {
                            reply('*Bentar...*')
                            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
                            const media = await client.downloadMediaMessage(encmedia, 'buffer')
                            const getUrl = await uploadImages(media, false)
                            client.sendMessage(from, `${getUrl}`)
                        }
                        break
                    case 'wait':
                        case 'whatnimek':
                            if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                                const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
                                const media = await client.downloadMediaMessage(encmedia, 'buffer')
                                const img64 = `data:image/jpeg;base64,${media.toString('base64')}`
                                fetch('https://trace.moe/api/search', {
                                    method: 'POST',
                                    body: JSON.stringify({ image: img64 }),
                                    headers: { "Content-Type": "application/json" }
                                })
                                .then(respon => respon.json())
                                .then(async (resolt) => {
                                    if (resolt.docs && resolt.docs.length <= 0) {
                                        reply('Gak tau anime apaan!')
                                    }
                                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                                    var teksnime = ''
                                    if (similarity < 0.92) {
                                        teksnime += '*Saya memiliki keyakinan rendah dengan request ini*\n\n'
                                    }
                                    teksnime += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                                    teksnime += `➸ *Ecchi* : ${is_adult}\n`
                                    teksnime += `➸ *Eps* : ${episode.toString()}\n`
                                    teksnime += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                                    var imek = `https://media.trace.moe/image/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
                                    var buffer = await getBuffer(imek)
                                    
                                    client.sendMessage(from, buffer, image, { quoted: mek, caption: teksnime })
                                })
                                .catch(err => console.log('[',color('!', 'red'),']', color(err, 'red')))
                            }
                            break
                    case 'tga':
                        if (!isGroup) return fakegroup(mess.only.group)
                        if (!isGroupAdmins) return fakegroup(mess.only.admin)
                        members_id = []
                        teks = args.join(" ")
                        teks += "\n\n"
                        for (let mem of groupMembers) {
                            teks += `# @${mem.jid.split("@")[0]}\n`
                            members_id.push(mem.jid)
                        }
                        mentions(teks, members_id)
                        break
                    case 'tga2':
                        if (!isGroup) return fakegroup(mess.only.group)
                        if (!isGroupAdmins) return fakegroup(mess.only.admin)
                        members_id = []
                        teks = "*Tagall v2*"
                        teks += "\n\n"
                        for (let mem of groupMembers) {
                            teks += `~> @${mem.jid.split("@")[0]}\n`
                            members_id.push(mem.jid)
                        }
                        client.sendMessage(from, teks, text, {quoted:mek, contextInfo: { "mentionedJid": members_id}})
                        break
                    case 'tga3':
                        if (!isGroup) return fakegroup(mess.only.group)
                        if (!isGroupAdmins) return fakegroup(mess.only.admin)
                        members_id = []
                        teks = "*Tagall v3*"
                        teks += "\n\n"
                        for (let mem of groupMembers) {
                            teks += `<#> https://wa.me/${mem.jid.split("@")[0]}\n`
                            members_id.push(mem.jid)
                        }
                        client.sendMessage(from, teks, text, {contextInfo: {"mentionedJid": members_id }})
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
            						client.groupRemove(from, mentioned)
            					} else {
            						await mentions(`Perintah diterima mengeluarkan: @${mentioned[0].split('@')[0]}`, mentioned, true)
            						client.groupRemove(from, mentioned)
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
            						client.groupAdd(from, [num])
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
            						client.groupMakeAdmin(from, mentioned)
            					} else {
            						mentions(`Perintah di terima, Promote : @${mentioned[0].split('@')[0]}`, mentioned, true)
            						client.groupMakeAdmin(from, mentioned)
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
            						client.groupDemoteAdmin(from, mentioned)
            					} else {
            						mentions(`Perintah di terima, Demote : @${mentioned[0].split('@')[0]}`, mentioned, true)
            						client.groupDemoteAdmin(from, mentioned)
            					}
            					break
                    case 'setnick':
                        if (!isOwner) return fakegroup(mess.only.ownerB)
                        entah = args.join(" ")
                        client.updateProfileName(entah).then(() => {
                            reply(`Sukses mengubah ke ${entah}`)
                        }).catch((err) => { reply(`Error: ${err}`) })
                        break
                    case 'setpict':
                        if (!isOwner) return fakegroup(mess.only.ownerB)
                        if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
                            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                            const media = await client.downloadMediaMessage(encmedia, 'buffer')
                            client.updateProfilePicture(botNumber, media).then(() => {
                                reply('Sukses update profile picture')
                            }).catch((err) => {
                                reply(`Error: ${err}`)
                            })
                        } else {
                            reply('bukan gambar')
                        }
                        break
                    case 'del':
                        case 'delete':
                            if (args[0] === 'priv' || args[0] === 'private') {
                                memew = client.chats.array.filter(v => v.jid.endsWith("@s.whatsapp.net") || v.jid.endsWith("@c.us")).map(v => v.jid)
                                for (let ids of memew) client.modifyChat(ids, 'delete')
                                reply(`Sukses menghapus *${memew.length}* personal chat`)
                            } else {
                                reply("*Masukan type chat yang ingin dibersihkan*\n1. private -> Personal Chat")
                            }
                            break
                    case 'hilih':
                        entah = args.join(" ")
                        imni = hilih(entah)
                        reply(imni)
                        break
                    case 'kontak':
                        entah = args[0]
                        disname = args[1]
                        if (isNaN(entah)) return reply('Invalid phone number'.toUpperCase());
                        vcard = 'BEGIN:VCARD\n'
                                  + 'VERSION:3.0\n'
                                  + `FN:${disname}\n`
                                  + `TEL;type=CELL;type=VOICE;waid=${entah}:${phoneNum('+' + entah).getNumber('internasional')}\n`
                                  + 'END:VCARD'.trim()
                            client.sendMessage(from, {displayName: disname, vcard: vcard}, contact)
                            break
                    case 'tomp3':
                        if ((isMedia && mek.message.videoMessage.seconds <= 30 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds <= 30)) {
                            const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                            const media = await client.downloadAndSaveMediaMessage(encmedia, "video")
                            exec(`ffmpeg -y -i ${media} -b:a 192K -ar 44100 -vn -f mp3 tomp3.mp3`, function(err) {
                                fs.unlinkSync(media)
                                if (err) return reply("error om")
                                client.sendMessage(from, fs.readFileSync('./tomp3.mp3'), audio, {mimetype: 'audio/ogg', quoted: mek})
                                fs.unlinkSync('./tomp3.mp3')
                            })
                        }
                        break
                        case 'help':
                        case 'menu':
                        fakestatus(`*Botol - bot Simple Menu*

• ${prefix}info
• ${prefix}donasi
• ${prefix}h - > hidetag
• ${prefix} f - > forward
• ${prefix}eval - > eval
• ${prefix}ping - > cek device
• ${prefix}speed - > cek jaringan bot
• ${prefix}exec -> run bash
• ${prefix}join - > join group
• ${prefix}runtime - > runtime
• ${prefix}setnomor - > Set Nomor Reply
• ${prefix}setpesan - > Set Pesan Reply
• ${prefix}setprefix - > Set Prefix
• ${prefix}toimg - > Convert to Image
• ${prefix}stiker - > gambar / gif / video Sticker
• ${prefix}meme - > Random Meme
• ${prefix}imgtourl - > Upload Telegra.ph
• ${prefix}memeimg - > memegen.link API
• ${prefix}tga - > Tag All
• ${prefix}tga2 - > Tag All v2
• ${prefix}tga3 - > Tag All v3
• ${prefix}add - > Tambahkan orang ke grup
• ${prefix}kick - > Keluarkan orang dari grup
• ${prefix}promote - > jadikan member ke atmin
• ${prefix}demote - > jadikan atmin ke member
• ${prefix}wait - > What ANime is This ?
• ${prefix}setnick - > Ganti Nickname WhatsApp kamu
• ${prefix}setpict - > Ganti photo profile WhatsApp kamu < i > kirim gambar atau reply gambar dengan caption ${prefix}setpict
• ${prefix}delete - > Hapus pesan(personal / private atau grup)
• ${prefix}hilih - > ih gisiki giliy
• ${prefix}owner - > Dapatkan kontak owner
• ${prefix}kontak - > Kirim Kontak
• ${prefix}tomp3 - > Video jadi mp3
• ${prefix}take - > Colong stiker orang :v < i > Reply sticker dengan caption ${prefix}take Nama|Author
• ${prefix}play - > Download music whit yt
• ${prefix}ytmp3 - > Download music whit yt
• ${prefix}ytmp4 - > Download video whit yt
• ${prefix}ig - > Download media from Instagram
• ${prefix}igstalk - > Stalker Instagram
• ${prefix}tiktoktnowm - > Download media from tiktod no watermark
• ${prefix}tiktok - > Download media from tiktok
• ${prefix}pinterest - > Search in pinterest
• ${prefix}play - > search music with youtube
• ${prefix}ytmp3 - > download music with a link 
• ${prefix}ytmp4 - > download video with a link
• ${prefix}igstalk - > stalk username instagram
• ${prefix}ig - > download with url
• ${prefix}tiktoknowm - > download video tiktok no wm
• ${prefix}tiktok - > download video tiktok
• ${prefix}playstore - > search playstore
• ${prefix}cersex - > adult stories 
• ${prefix}puisiimg - > random puisi shaped image 
• ${prefix}resepmasakan - > search recipes `)
                   break
                          case 'donasi':
                            fakestatus('Halo kak mau donasi?\nBoleh banget kak, list untuk pembayaran donasi ada dibawah in.\n\n• Dana : +62 878-9151-8799\n• Gopay : +62 878-9151-8799\n• Pulsa : +62 878-9151-8799\n\nTerimakasih sudah berdonasi, uangnya untuk memperpanjang server bot.')
                            break
                          case 'info':
                            fakestatus(`Halo kak 👋🏻 perkenalkan saya botol, saya adalah bot whatsapp yang terbuat dari bahasa node js dan beberapa api, saya juga memakai lib dari *Baileys* yang dibuat oleh *Adiwajshing*\nSaya juga memakai base bot dari *MhankBarBar* yang saya custom (redesain) model\n\nBot ini juga merupakan open source yang dapat anda lihat di https://github.com/progsysdriver/botol-bot\nDiperbolehkan bagi siapapun menggunakan bot kami tetapi ingat, jangan menghilangkan hak cipta dari bot kami\n\nOwner Botol bot adalah Angga surya x ProgsysDriver\nIni dibuat untuk bahan belajar dan senang senang saja, jadi kalau ada kurangnya mohon maaf yang sebesar besarnya.\n\nTerimakasih yang sudah berkonstribusi`)
break
            default:
                }
        } catch(err) {
            console.log('[',color('!', 'red'),']', color(err, 'red'))
        }
    })
}

starts()