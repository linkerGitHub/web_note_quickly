class Msg {
  constructor(msg) {
    this.msg = msg
  }
}

class UrlTreeNode {
  constructor() {
    this.count = 0
    this.children = {}
    this.url = ''
    this.urlSegment = ''
    this.notes = {}
  }
}

function trimUrlHttpPart(url) {
  let retUrl = url
  if (/^http(s?):\/\/.+$/.test(url)) {
    retUrl = retUrl.replace(/http(s?):\/\//, '')
  }
  return retUrl
}

function deleteNodeByUrlKeyFormTree(url, key, tree) {
  const urlSeg = trimUrlHttpPart(url).split("/")
  let tempTree = tree
  tempTree[urlSeg[0]].count-=1
  tempTree = tempTree[urlSeg[0]]

  for (let i = 1; i < urlSeg.length; i+=1) {
    const value = urlSeg[i]
    tempTree.children[value].count -= 1
    if (tempTree.children[value].count === 0) {
      delete tempTree.children[value]
      return tree
    }
    tempTree = tempTree.children[value]
  }
  delete tempTree.notes[key]
  return tempTree
}

function mergeLinkToUrlTree(url, note, tree) {
  const urlSeg = trimUrlHttpPart(url).split("/")
  let tempTree = tree
  if (tempTree[urlSeg[0]]) {
    tempTree[urlSeg[0]].count+=1
    tempTree = tempTree[urlSeg[0]]
  } else {
    const seg = urlSeg[0]
    const tNode = new UrlTreeNode()
    tNode.url = seg
    tNode.urlSegment = seg
    tNode.count = 1
    tempTree[seg] = tNode
    tempTree = tempTree[seg]
  }

  for (let i = 1; i < urlSeg.length; i+=1) {
    const value = urlSeg[i]
    if (tempTree.children[value] === undefined) {
      const tNode = new UrlTreeNode()
      tNode.url = `${tempTree.url}/${value}`
      tNode.urlSegment = value
      tNode.count = 1
      tempTree.children[value] = tNode
    } else {
      tempTree.children[value].count += 1
    }
    tempTree = tempTree.children[value]
  }
  const utc = new Date()
  const key = `${note.axisY  }_${ utc.getTime()}`
  tempTree.notes[key] = note
  const ret = {}
  ret[key] = note
  return ret
}

function getSiteStorageByUrl(url) {
  const site = trimUrlHttpPart(url).split('/')[0]
  const getTarget = {}
  getTarget[site] = false
  return new Promise((resolve) => {
    chrome.storage.local.get(getTarget, (item) => {
      if (item[site] === false) {
        resolve(null)
      } else {
        resolve(item)
      }
    })
  })
}

function getUrlNodeFromSiteStorage(url, siteStorage) {
  const urlSeg = url.split("/")
  let siteS = siteStorage
  for (let i = 0; i < urlSeg.length - 1; i+=1) {
    const seg = urlSeg[i]
    if (siteS[seg]) {
      siteS = siteS[seg].children
    } else {
      return false
    }
  }
  siteS = siteS[urlSeg.pop()]
  return siteS
}

export default {
  saveNote(data) {
    return new Promise((resolve) => {
      getSiteStorageByUrl(data.pageUrl).then(item => {
        let tmpItem = item
        if (tmpItem === null) {
          tmpItem = {}
        }
        const readyNote = mergeLinkToUrlTree(data.pageUrl, data, tmpItem)
        chrome.storage.local.set(tmpItem, () => {
          resolve(readyNote)
        })
      })
    })
  },
  getNotes(url) {
    return new Promise((resolve) => {
      getSiteStorageByUrl(url).then((item) => {
        if(item === null) {
          resolve({})
        } else {
          const node = getUrlNodeFromSiteStorage(trimUrlHttpPart(url), item)
          resolve(node ? node.notes : {})
        }
      })
    })
  },
  deleteNote(note) {
    return new Promise((resolve) => {
      getSiteStorageByUrl(note.url).then((item) => {
        deleteNodeByUrlKeyFormTree(note.url, note.key, item)
        chrome.storage.local.set(item, () => {
          resolve({code: 1, msg: 'ok'})
        })
      })
    })
  }
}
