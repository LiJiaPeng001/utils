interface ThrottleOptions {
  delay?: number;
  type?: 1 | 2;
}

/**
 * @desc 函数节流
 * @param fn 回调
 * @param delay 等待时间
 * @param type 1=直接触发 2=结束触发
 */
export function throttle(
  callback: (...args: any[]) => void,
  options?: ThrottleOptions
) {
  let { delay = 300, type = 1 } = options || {};
  let time = 0;
  let timer: NodeJS.Timeout | null = null;

  return function (...args: any[]) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - time;

    if (elapsedTime < delay) {
      if (type === 2 && timer) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          callback(...args);
        }, delay);
      }
    } else {
      time = currentTime;
      callback(...args);
    }
  };
}

/**
 * @desc 函数防抖
 * @param callback 函数回调
 * @param delay 等待时间
 * @returns
 */

export function debounce(callback: Function, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: any[]) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}
