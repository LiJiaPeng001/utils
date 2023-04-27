export interface AuthorityProps {
  localKey: string
  localType?: Storage
  maxAge?: number
}

export class Authority {
  constructor(private props: Required<AuthorityProps>) {}

  /**
   * 判断数据是否过期
   */
  private isExpired(data: any): boolean {
    const { maxAge } = this.props
    return data.maxAge && Date.now() - data.maxAge >= maxAge!
  }

  /**
   * 获取旧数据
   */
  private getOldData(): any {
    const { localKey, localType } = this.props
    return JSON.parse(localType.getItem(localKey!) ?? '{}')
  }

  /**
   * 设置新数据
   */
  private setData(value: any, oldData: any): void {
    const { maxAge, localKey, localType } = this.props
    const data = {
      ...oldData,
      ...value,
      maxAge: oldData.maxAge || Date.now() + maxAge!,
    }
    localType.setItem(localKey!, JSON.stringify(data))
  }

  /**
   * 获取数据
   */
  get() {
    const data = this.getOldData()
    if (this.isExpired(data)) {
      this.clear()
      return {}
    }
    return data
  }

  /**
   * 设置数据
   */
  set(value = {}) {
    const oldData = this.getOldData()
    this.setData(value, oldData)
  }

  /**
   * 清除数据
   */
  clear() {
    const { localKey, localType } = this.props
    localType.removeItem(localKey)
  }
}

/**
 * 创建本地缓存实例
 * @param {AuthorityProps} props 缓存记录
 * @param {storage} props.localType 缓存类型，默认为 localStorage
 * @param {number} props.maxAge 缓存过期时间，默认为 30 天
 */
export function createAuthority(props: AuthorityProps) {
  const localType = props.localType ?? localStorage
  const maxAge = props.maxAge ?? 30 * 1000 * 60 * 60 * 24
  return new Authority({ ...props, localType, maxAge })
}
