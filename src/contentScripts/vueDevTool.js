if (process.env.NODE_ENV === 'development') {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:8098/')
  xhr.onload = function (x, e) {
    eval(x.currentTarget.responseText)
  };
  xhr.send();
}

