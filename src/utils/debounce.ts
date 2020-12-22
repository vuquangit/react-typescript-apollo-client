export type Procedure = (...args: any[]) => void

export type Options = {
  isImmediate: boolean
}

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: Options = {
    isImmediate: false,
  }
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeOutId: /* NodeJS.Timeout */ number | undefined

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this

    const doLater = function () {
      timeOutId = undefined
      if (!options.isImmediate) func.apply(context, args)
    }

    const shouldCallNow = options.isImmediate && timeOutId === undefined

    if (timeOutId !== undefined) clearTimeout(timeOutId)

    timeOutId = setTimeout(doLater, waitMilliseconds)

    if (shouldCallNow) func.apply(context, args)
  }
}
