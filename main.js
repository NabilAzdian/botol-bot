const {
  WAConnection,
  MessageType,
  Presence,
  Mimetype,
  GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { banner, start, success } = require('./lib/functions')
const { color } = require('./lib/color')

require('./index.js')
nocache('./index.js', module => console.log(`${module} is now updated!`))

const starts = async (botol = new WAConnection()) => {
  botol.logger.level = 'warn'
  console.log(banner.string)
  console.log(banner2.string)
  botol.on('qr', () => {
    console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color(' Scan qr Now!'))
  })

  fs.existsSync('./session.json') && botol.loadAuthInfo('./session.json')
  botol.on('connecting', () => {
    start('2', 'Not Internet')
  })
  botol.on('open', () => {
    success('2', 'Connected')
  })
  await botol.connect({ timeoutMs: 30 * 1000 })
  fs.writeFileSync('./session.json', JSON.stringify(botol.base64EncodedAuthInfo(), null, '\t'))

  botol.on('chat-update', async (message) => {
    require('./index.js')(botol, message)
  })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => {}) {
  console.log('Module', `'${module}'`, 'is now being watched for changes')
  fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module))
    cb(module)
  })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(module)]
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

starts()
