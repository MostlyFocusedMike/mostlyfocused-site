
async function fetchAndDecompress() {
    const res = await fetch(url, { credentials: 'include', mode: 'cors' });
    console.log('res:', res);
    const data = await res.json();
    console.log('text:', data);
}

fetchAndDecompress();


function reqListener() {
  console.log(this.responseText);
}


const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", url);
req.send();


const url = `https://gmail.us14.list-manage.com/subscribe/post-json?u=dc0ab9e42e4956a8c83d4579e&id=35a27f3003&f_id=0035f9e0f0&c=handle&EMAIL=mostlyfocusedmike%40gmail.com&b_dc0ab9e42e4956a8c83d4579e_35a27f3003=&subscribe=Subscribe&_=${Date.now()}`

function handle(data) {
  console.log(data)
}

var script = document.createElement('script');
script.src = url;
document.body.appendChild(script);