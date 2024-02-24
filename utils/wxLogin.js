const axios = require('axios');
//获取openid 用户唯一标识和session_key 秘钥
function wxGetIDKEY(code) {
    console.log('获取openid...........');
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            params: {
                grant_type: 'authorization_code',
                appid: process.env.APPID,
                secret: process.env.SECRET,
                js_code: code
            }
        }).then(res => { resolve(res); }).catch(err => { reject(-1) })
    });
}
//获取access_token
function wxGetTOKEN() {
    console.log('获取access_token...........');
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://api.weixin.qq.com/cgi-bin/token',
            params: {
                grant_type: 'client_credential',
                appid: process.env.APPID,
                secret: process.env.SECRET
            }
        }).then(res => { resolve(res); }).catch(err => { reject(-1) })
    });
}
//获取手机号接口
function wxGetPhoneNumber(code, token) {
    console.log('获取手机号..........');
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${token}`,
            data: {
                code: code,
                openid:process.env.APPID
            }
        }).then(res => { resolve(res); }).catch(err => { reject(-1) })
    });
}
//获取手机号
function wxLoginNumber(code) {
    console.log('Login...........');
    return new Promise((resolve, reject) => {
        //获取access_token
        wxGetTOKEN().then(resp => {
            wxGetPhoneNumber(code, resp.data.access_token).then(resData => {
                let objData = { ...resp.data, ...resData.data }
                resolve(objData)
            }).catch(err => {
                reject(-1)
            })
        }).catch(err => {
            reject(-1)
        })
    });
}
//获取小程序基本信息接口
function wxGetAppInfo(token) {
    console.log('获取手机号..........');
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://api.weixin.qq.com/cgi-bin/account/getaccountbasicinfo',
            params: {
                access_token: token
            }
        }).then(res => { resolve(res); }).catch(err => { reject(-1) })
    });
}
//获取小程序基本信息
function wxGetAppAvator(){
    return new Promise((resolve, reject) => {
        //获取access_token
        wxGetTOKEN().then(resp => {
            wxGetAppInfo(resp.data.access_token).then(res => {
                resolve({name:res.data.nickname,auth:res.data.principal_name,url:res.data.head_image_info.head_image_url})
                // resolve(res.data)
            }).catch(err => {
                reject(-1)
            })
        }).catch(err => {
            reject(-1)
        })
    });
}
module.exports = { wxGetIDKEY, wxLoginNumber,wxGetAppAvator };