import fetch from 'isomorphic-fetch'

function unionErrorCode(json) {
    if (!json) {
        console.log('network or system error: no response')
    }
    switch (json.code) {
        case 401:
            window.location.href = '/wechatlicai/#login'
            break
        case 500:
            console.log('系统异常')
            break
        default:
            break
    }
}
export default async function request(url, data, option, callback) {
    var _option = Object.assign({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    }, option)
    const response = await fetch(`/wechatlicai/src/datapi/${url}.cgi`, _option)

    if (response.status >= 400) {
        throw new Error('Bad response from server')
    }

    const json = await response.json()
    // 如果存在回调函数且回调返回false则不执行unionErrorCode检查，否则请求后会执行unionErrorCode检查
    if (!!callback && typeof callback === 'function') {
        if (!callback(json)) {
            return json
        }
    }
    unionErrorCode(json)
    return json
}
