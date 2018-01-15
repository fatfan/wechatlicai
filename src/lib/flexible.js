var documentElement = document.documentElement
var dpr = 0
var scale = 0
var timer

var isIPhone = navigator.appVersion.match(/iphone/gi)
if (isIPhone) {
    // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
    if (window.devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3
    } else if (window.devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2
    } else {
        dpr = 1
    }
} else {
    // 其他设备下，仍旧使用1倍的方案
    dpr = 1
}
scale = 1 / dpr

documentElement.setAttribute('data-dpr', dpr)

var meta = document.createElement('meta')
meta.setAttribute('name', 'viewport')
meta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
if (documentElement.firstElementChild) {
    documentElement.firstElementChild.appendChild(meta)
} else {
    var wrap = document.createElement('div')
    wrap.appendChild(meta)
    document.write(wrap.innerHTML)
}

export let rem

export function refresh() {
    // getBoundingClientRect().width获取整个页面的物理像素宽度
    var width = documentElement.getBoundingClientRect().width
    // 这个判断针对平板等大屏幕，限制了最大宽度
    if (width / dpr > 540) {
        width = 540 * dpr
    }
    rem = width / 7.5
    documentElement.style.fontSize = rem + 'px'
}

window.addEventListener('resize', function() {
    clearTimeout(timer)
    timer = setTimeout(refresh, 300)
}, false)
window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        clearTimeout(timer)
        timer = setTimeout(refresh, 300)
    }
}, false)

if (document.readyState === 'complete') {
    document.body.style.fontSize = 12 * dpr + 'px'
} else {
    document.addEventListener('DOMContentLoaded', function(e) {
        document.body.style.fontSize = 12 * dpr + 'px'
    }, false)
}

refresh()

// 下面两个函数是px/rem自动换算用的。当用sass或是less的时候会用到。
export function rem2px(d) {
    var val = parseFloat(d) * rem
    if (typeof d === 'string' && d.match(/rem$/)) {
        val += 'px'
    }
    return val
}

export function px2rem(d) {
    var val = parseFloat(d) / rem
    if (typeof d === 'string' && d.match(/px$/)) {
        val += 'rem'
    }
    return val
}
