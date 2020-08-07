export default function string2function(args, body) {
  if (arguments.length === 1) {
    body = args
    args = undefined
  }
  if (!body) {
    return () => { }
  }
  // 判断表达式最后一行是否包含return
  const last = body.trim().split('\n').reduce(line => line)
  if (last && /^return\s+/.test(last.trim()) === false) {
    body = 'return ' + body.trim()
  }
  try {
    // eslint-disable-next-line
    return args ? new Function(...args, body) : new Function(body)
  } catch (e) {
    // 这里需要把异常抛出来吗
    console.warn('函数解析失败', `\n'${body}'`)
    return new Error(e)
  }
}
