import storage  from './storage'

/**
 * 处理缓存数据
 */
export { storage }

/**
 * 获取目录对象或文件对象
 * @param {string} url 要操作文件或目录的URL地址
 * @returns {Promise<object>} 若成功返回请求到的目录或文件对象，否则返回 null
 */
export function resolveFile(url) {
  return new Promise(resolve => {
    // #ifdef APP-PLUS
    plus.io.resolveLocalFileSystemURL(url, resolve, () => resolve(null))
    // #endif

    // #ifndef APP-PLUS
    resolve(null)
    // #endif
  })
}

/**
 * 获取目录大小
 * @param {string} dir 目录地址
 * @returns {Promise<number>} 返回目录大小，单位字节
 */
export function getDirSize(dir) {
  return new Promise(async resolve => {
    // #ifdef APP-PLUS
    const entry = await resolveFile(dir)
    if (!entry) return resolve(0)
    entry.getMetadata(
      res => resolve(res.size || 0),
      () => resolve(0),
      true
    )
    // #endif

    // #ifndef APP-PLUS
    resolve(0)
    // #endif
  })
}

/**
 * 删除目录
 * @param {string} dir 目录地址
 * @returns {Promise<boolean>} 删除状态
 */
export function removeDir(dir) {
  return new Promise(async resolve => {
    // #ifdef APP-PLUS
    const entry = await resolveFile(dir)
    if (!entry) return resolve(false)
    entry.removeRecursively(
      () => resolve(true),
      () => resolve(false)
    )
    // #endif

    // #ifndef APP-PLUS
    resolve(false)
    // #endif
  })
}

/**
 * 格式化字节大小
 * @param {number} size 字节大小
 * @returns {string} 格式化后的文字
 */
export function formatSize(size) {
  const s = parseInt(size)
  if (s === 0) return '0B'
  else if (s < 1024) return s + 'B'
  else if (s < 1048576) return (s / 1024).toFixed(2) + 'KB'
  else if (s < 1073741824) return (s / 1048576).toFixed(2) + 'MB'
  else return (s / 1073741824).toFixed(2) + 'GB'
}
