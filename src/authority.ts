export interface AuthorityProps<T> {
  localKey: string;
  localType?: Storage;
  maxAge?: number;
  defaultData?: T;
}

export class Authority<T extends Record<string, any>> {
  constructor(private props: Required<AuthorityProps<T>>) {
    if (props.defaultData) {
      let localD = this.get() as T;
      Object.keys(props.defaultData).forEach((key: keyof T) => {
        if (!(key in localD)) this.set({ [key]: props.defaultData[key] } as T);
      });
    }
  }

  /**
   * 判断数据是否过期
   */
  private isExpired(): boolean {
    return Date.now() >= this.props.maxAge;
  }

  /**
   * 获取旧数据
   */
  private getOldData(): T {
    const { localKey, localType } = this.props;
    return JSON.parse(localType.getItem(localKey!) ?? "{}");
  }

  /**
   * 设置新数据
   */
  private setData(value: T, oldData: T): void {
    const { maxAge, localKey, localType } = this.props;
    const data = {
      ...oldData,
      ...value,
      maxAge: oldData.maxAge || Date.now() + maxAge!,
    };
    localType.setItem(localKey!, JSON.stringify(data));
  }

  /**
   * 获取数据
   */
  get(): T {
    const data = this.getOldData();
    if (this.isExpired()) {
      this.clear();
      return this.props.defaultData ?? ({} as T);
    }
    return data;
  }

  /**
   * 设置数据
   */
  set(value: T) {
    const oldData = this.getOldData();
    this.setData(value, oldData);
  }

  /**
   * 清除数据
   */
  clear() {
    const { localKey, localType } = this.props;
    localType.removeItem(localKey);
  }
}

/**
 * 创建本地缓存实例
 * @param {AuthorityProps} props 缓存记录
 * @param {storage} props.localType 缓存类型，默认为 localStorage
 * @param {number} props.maxAge 缓存过期时间，默认为 30 天
 * @param {T} props.defaultData 默认数据
 */
export function createAuthority<T extends Record<string, any>>(
  props: AuthorityProps<T>
) {
  const localType = props.localType ?? localStorage;
  const defaultData = props.defaultData ?? ({} as T);
  const maxAge = props.maxAge
    ? Date.now() + props.maxAge
    : Date.now() + 30 * 1000 * 60 * 60 * 24;
  return new Authority<T>({ ...props, localType, maxAge, defaultData });
}
