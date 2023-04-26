const userAgent = window.navigator.userAgent.toLowerCase()

export const isWx = /micromessenger/i.test(userAgent)
export const isAndroid = /android/gi.test(userAgent.toLowerCase())
export const isIOS = /iphone|ios|ipad|ipod/gi.test(userAgent.toLowerCase())
export const isPhone = (tel: string): boolean => /^1[3-9]{1}\d{9}$/.test(tel)
