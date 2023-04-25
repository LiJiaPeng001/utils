export interface ConfigRecord {
  localKey: string
  localType: Storage
  maxAge: number
}

/**
 * @author li.jiapeng
 * @desc 本地缓存
 * @param {string} prefix 缓存前缀
 * @param {string} key 缓存前缀
 * @param {array} local localStorage || sessionStorage
 * @param {number} maxAge 到期时间
 */
export class Authority {
  constructor(private props: ConfigRecord) { }
  get() {
    const { maxAge, localKey, localType } = this.props
    const data = JSON.parse(localType.getItem(localKey) || '{}')
    if (data.maxAge && Date.now() - data.maxAge >= maxAge) {
      this.clear()
      return {}
    }
    return data
  }

  set(value = {}) {
    const { maxAge, localKey, localType } = this.props
    const oldData = this.get()
    const data = {
      ...oldData,
      ...value,
      maxAge: oldData.maxAge || Date.now() + maxAge,
    }
    localType.setItem(localKey, JSON.stringify(data))
  }

  clear() {
    const { localKey, localType } = this.props
    if (!localKey)
      localType.clear()

    else
      localType.removeItem(localKey)
  }
}

export function createAuthority(record: ConfigRecord) {
  return new Authority(record)
}
