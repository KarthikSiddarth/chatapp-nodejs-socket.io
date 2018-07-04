let body = document.body

function newElement (tag, attr, text) {
  let ele = document.createElement(tag)
  if (attr) {
    for (let i in attr) {
      ele.setAttribute(i, attr[i])
    }
  }
  if (text) {
    ele.textContent = text
  }
  return ele
}

function appChildren (eleObj) {
  if (eleObj) {
    for (let i in eleObj) {
      let parentEle = eleObj[i].shift()
      for (let j of eleObj[i]) {
        parentEle.appendChild(j)
      }
    }
  }
}

function removeChild (ele) {
  if (ele) {
    let parentEle = ele.shift()
    let child = document.getElementById(ele[0])
    parentEle.removeChild(child)
  }
}

function addListener (evntObj) {
  if (evntObj) {
    for (let i in evntObj) {
      let tag = evntObj[i].shift()
      tag.addEventListener(evntObj[i][0], evntObj[i][1])
    }
  }
}

function removeChildren (element) {
  if (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
  }
}
