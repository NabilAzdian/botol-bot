const fetch = require('node-fetch')
const axios = require('axios')

exports.getBuffer = async(url) => {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'okhttp/4.5.0'
            },
            method: 'GET'
        })
        return res.buffer()
    } catch (e) {
        throw e
    }
}

exports.postBuffer = async(url, formdata) => {
    try {
        const res = await axios.post(url, formdata, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
            },
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (e) {
        throw e
    }
}

exports.getJson = async(url) => {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'okhttp/4.5.0'
            },
            method: 'GET'
        })
        return res.json()
    } catch (e) {
        throw e
    }
}

exports.postJson = async(url, formdata) => {
    try {
        const res = await axios.post(url, formdata, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
            }
        })
        return res.data
    } catch (e) {
        throw e
    }
}

exports.getRandomExt = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.sleep = async(ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.generateBoard = async(board) => {
    var text = ""
    var count = 0
    for (var x of board) {
        if (count % 3 == 0) {
            text += "\n         "
        }
        text += x
        count += 1
    }
    return text
}

exports.getWin = async(board) => {
    var x = ["❌"]
    var o = ["⭕️"]

    // Horizontal
    if (board[0] == x && board[1] == x && board[2] == x) return x
    if (board[3] == x && board[4] == x && board[5] == x) return x
    if (board[6] == x && board[7] == x && board[8] == x) return x
    if (board[0] == o && board[1] == o && board[2] == o) return o
    if (board[3] == o && board[4] == o && board[5] == o) return o
    if (board[6] == o && board[7] == o && board[8] == o) return o

    // Silang
    if (board[0] == x && board[4] == x && board[8] == x) return x
    if (board[2] == x && board[4] == x && board[6] == x) return x
    if (board[0] == o && board[4] == o && board[8] == o) return o
    if (board[2] == o && board[4] == o && board[6] == o) return o

    // Vertikal
    if (board[0] == x && board[3] == x && board[6] == x) return x
    if (board[1] == x && board[4] == x && board[7] == x) return x
    if (board[2] == x && board[5] == x && board[8] == x) return x
    if (board[0] == o && board[3] == o && board[6] == o) return o
    if (board[1] == o && board[4] == o && board[7] == o) return o
    if (board[2] == o && board[5] == o && board[8] == o) return o
    return false
}