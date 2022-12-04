export const fetch = <T>(url: string) => new Promise<T>((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader("Content-Type","application/json");
  xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
  //supported in new browsers...do JSONP based stuff in older browsers...figure out how
  xhr.setRequestHeader("Accept","application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      return;
    }

    if (xhr.status !== 200) {
      reject({status: xhr.status, response: JSON.parse(xhr.responseText)});
      return;
    }

    resolve(JSON.parse(xhr.responseText));
  };
  xhr.ontimeout = function (...args) {
    reject(args);
  };
  xhr.onloadend = function (...args) {
    reject(args);
  };
  xhr.onload = function (...args) {
    reject(args);
  };
  xhr.onerror = function (...args) {
    reject(args);
  };
  xhr.send();
})
