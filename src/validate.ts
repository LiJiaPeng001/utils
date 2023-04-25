
const userAgent = window.navigator.userAgent.toLowerCase()

export const isWx = /micromessenger/i.test(userAgent)
export const isAndroid = /android/gi.test(userAgent.toLowerCase())
export const isIOS = /iphone|ios|ipad|ipod/gi.test(userAgent.toLowerCase())