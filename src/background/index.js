// OnInstall handler
import cReload from "crx-hotreload"

import commandFunc from './commandFunc'

cReload.run([/^(http:\/\/tmp_show\.idxstudio\.win)(.*)/, /^(http:\/\/cdrfd\.com)(.*)/])

// receive request from content script, rewrite to its function
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (commandFunc[request.cmd]) {
    commandFunc[request.cmd](request.data).then(ret => {
      sendResponse(ret)
    })
  } else {
    sendResponse({err: 'no this cmd'})
  }
  return true
})



