https://ogp.me/

https://tailwindcolor.com

https://webaim.org/resources/contrastchecker
https://swizec.com/blog/how-to-wait-for-dom-elements-to-show-up-in-modern-browsers/

# The PRISM.jS nonsense
OK, so the BIGGEST ISSUE by far was that html was reading the text as html, which is a huge problem for me since i want to show html and jsx code. The only HTML native solution i could find was nesting all text in script tag. The type [type attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type#any_other_value) needs to be the valid MIME type of 'text/plain'. But this is super nice because it actually solves another problem that google tries to visit links, even if they're in a template. However, my code snippets are now script tags not links, so problem solved there.

The other issue that wasn't SUPER clear is how to get prism to read JSX, that isn't one of its default langauges. You have to add it. I'm using a cdn, which has all [all scripts](https://cdnjs.com/libraries/prism/1.29.0) available here. 1.29.0 is the latest and was published in august 2022 (ignore the 9000 version, no idea what that is). so you need a few things for this to work:

```html
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" integrity="sha512-vswe+cgvic/XBoF1OcM/TeJ2FW0OofqAVdCZiEYkd6dwGXthvkSFWOoGGJgS2CW70VK5dQM5Oh+7ne47s74VTg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
    media="none"
    onload="this.media='all'"
  />
```
That's the actual style sheet, and it goes in the head, that seems to be the only style you need, and notice that you're using the tomorrow night theme appended.

Then, for the actual execution, you need to put these two scripts at the bottom of the page.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js" integrity="sha512-7Z9J3l1+EYfeaPKcGXu3MS/7T+w19WtKQY/n+xzmw4hZhJ9tyYmcUS+4QqAlzhicE5LAfMQSF3iFTK9bQdTxXg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-jsx.min.js" integrity="sha512-m3JYEI6gx5fh9jF10FjGoMzVKcV2N6nchcDcqPCdI1L3R2WQV7br2XVNR8iTLb2daOMRl3zldbcfT40xU2ntVw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```
The first one covers the basic languages, and then the second lets us use a `language-jsx` class name

i have not investigated using a type of module and putting them in the head or seeing what happens if i use JS to update the snippet after the first load. This does seem to work fine with web components as well.

the last hurdle was getting the size right

```css
code[class*="language-"],
pre[class*="language-"] {
  font-size: 0.8rem;
}
```
seems to be how you grab it, and this is where it's from [in this github discussion thread](https://github.com/orgs/PrismJS/discussions/2859)

this was the prism test page https://prismjs.com/test.html#language=jsx


# Mailchimp reverse engineering

this is the endpoint

```
https://gmail.us14.list-manage.com/subscribe/post-json?u=dc0ab9e42e4956a8c83d4579e&id=35a27f3003&f_id=0035f9e0f0&c=jQuery19009417234251593101_1720232200691&EMAIL=mn%2Btest%40gmail.com&b_dc0ab9e42e4956a8c83d4579e_35a27f3003=&subscribe=Subscribe&_=1720232200692

https://gmail.us14.list-manage.com/subscribe/post-json?u=dc0ab9e42e4956a8c83d4579e&id=35a27f3003&f_id=0035f9e0f0&c=jQuery19009417234251593101_1720232200691&EMAIL=mn%2Btest%40gmail.com&b_dc0ab9e42e4956a8c83d4579e_35a27f3003=&subscribe=Subscribe&_=1720232200693
```

```
https://gmail.us14.list-manage.com/subscribe/post-json?
  u=dc0ab9e42e4956a8c83d4579e                    // STATIC // this is the user ?
  &id=35a27f3003                                 // STATIC // user id?
  &f_id=0035f9e0f0
  &c=jQuery19009417234251593101_1720232200691    // VAR    // This is the JSONP wrapper function name
  &EMAIL=mn%2Btest%40gmail.com         // VAR    // email value url encoded
  &b_dc0ab9e42e4956a8c83d4579e_35a27f3003=       // STATIC // This is the name of the hidden input
  &subscribe=Subscribe                           // STATIC // Literally just a "subscribe"
  &_=1720232200692                               // VAR    // Date.now()
```

```
EMAIL=mn%2Btest%40gmail.com&b_dc0ab9e42e4956a8c83d4579e_35a27f3003=&id=35a27f3003&u=dc0ab9e42e4956a8c83d4579e&f_id=0035f9e0f0&subscribe=Subscribe&c=jsonpHandle&_=1720329408909
```

```
jQuery19009417234251593101_1720232200691({
    "result": "success",
    "msg": "Thank you for subscribing!",
    "type": "default",
    "webEngagementCookieValue": null
})
```

heres the error state

```
jQuery19005070817989352252_1720240207734({
    "result": "error",
    "msg": "Recipient \"mn+test@gmail.com\" has too many recent signup requests"
})
```

So essentially this is all to get around cors. JSONP lets you fetch a script that will then execute a function with the JSON data passed in. It was designed in 2006 before CORS (? or to explicitly get around it?) and the idea is you fetch a script, add it to your body, and the script then calls the function which finally gives you your data. the function call is the Padding in JSONP

```js
const url = `https://gmail.us14.list-manage.com/subscribe/post-json?u=dc0ab9e42e4956a8c83d4579e&id=35a27f3003&f_id=0035f9e0f0&c=handle&EMAIL=mostlyfocusedmike%40gmail.com&b_dc0ab9e42e4956a8c83d4579e_35a27f3003=&subscribe=Subscribe&_=${Date.now()}`

function handle(data) {
  console.log(data)
}

var script = document.createElement('script');
script.src = url;
document.body.appendChild(script);
```


```js
function createSubscribeUrl(form) {
    // Static parts
    const baseUrl = 'https://gmail.us14.list-manage.com/subscribe/post-json';
    const id = '35a27f3003';
    const u = 'dc0ab9e42e4956a8c83d4579e';
    const f_id = '0035f9e0f0';
    const hiddenInput = `b_$${u}_${f_id}`

    // Extract email from form
    const email = encodeURIComponent(form.querySelector('input[type="email"]').value);

    // Generate callback name (simulating jQuery's generated name)
    const callbackName = 'jsonpHandler' + Math.random().toString().slice(2, 17) + '_' + Date.now();

    // Construct URL
    const url = new URL(baseUrl);
    url.searchParams.append('u', u);
    url.searchParams.append('id', id);
    url.searchParams.append('f_id', f_id);
    url.searchParams.append('c', callbackName);
    url.searchParams.append('EMAIL', email);
    url.searchParams.append('b_dc0ab9e42e4956a8c83d4579e_35a27f3003', '');
    url.searchParams.append('subscribe', 'Subscribe');
    url.searchParams.append('_', Date.now().toString());

    return url.toString();
}
```



```js
function createJsonpPromise(url) {
  return new Promise((resolve, reject) => {
    const callbackParam = new URL(url).searchParams.get('c');

    const uniqueFunctionName = `jsonp_${Date.now()}_${Math.round(Math.random() * 1000000)}`;
    url = url.replace(callbackParam, uniqueFunctionName);

    const script = document.createElement('script');
    script.src = url;

    const cleanup = () => {
      document.body.removeChild(script);
      delete window[uniqueFunctionName];
    };

    window[uniqueFunctionName] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('JSONP request failed'));
    };

    document.body.appendChild(script);
  });
}

async function subscribeEmail(form) {
  const url = createSubscribeUrl(form);
  try {
    return await createJsonpPromise(url);
  } catch (error) {
    console.error('Subscription error:', error);
    throw error;
  }
}

// Usage
document.querySelector('form').addEventListener('submit', async function(e) {
  e.preventDefault();
  try {
    const result = await subscribeEmail(this);
    console.log('Subscription result:', result);
    // Handle successful subscription
  } catch (error) {
    // Handle error
  }
});
```


https://stackoverflow.com/questions/65257333/svg-inside-h1-tag

https://www.linkedin.com/post-inspector/inspect/https:%2F%2Fmostlyfocused.com

https://www.xml-sitemaps.com/validate-xml-sitemap.html