import path from 'path'

var queue = [] // 下载队列 避免重复下载

/**
 * 下载文件
 * @param {string} url 要下载文件资源地址
 * @param {string} [dir] 下载文件保存的路径
 * @returns {Promise<string|null>} 下载后的本地路径
 */
function download(url, dir) {
  return new Promise(resolve => {
    if (queue.includes(url)) return
    queue.push(url)
    const task = plus.downloader.createDownload(
      url,
      dir ? { filename: filename(url, dir) } : {},
      (download, status) => {
        queue.splice(queue.indexOf(url), 1)
        resolve(status === 200 ? download.filename : null)
      }
    )
    task.start()
  })
}

/**
 * 生成随机文件名后的路径
 * @param {string} url 网络地址
 * @param {string} dir 保存的路径
 * @returns {string} 随机文件名后的路径
 */
function filename(url, dir) {
  const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let random = ''
  for (let i = 0; i < 4; i++) {
    const index = parseInt(Math.random() * CHARS.length)
    random += CHARS[index]
  }

  dir = dir.replace(/(^\/)|(\/$)/g, '')
  const name = Date.now() + random + path.extname(url)

  return `_doc/${dir}/${name}`
}

export default download
