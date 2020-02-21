## PogU.js BetterTTV Emotes for the browser console
-------
It adds a new function `console.logU` wich transforms the input string to contain Twitch emotes.

![BG](/images/bg.png)

The code is currently isn't worth looking at, as it have 10 levels of indentation in some places, but hey, it works!

![It works](/images/works.png)

It currently doesn't overwrite `console.log` but in the future that will probably be a option

![Pepega Clap](/images/clapper.png)

It supports full size emotes and even GIFs! (_not shown here_)

![Comps](/images/comps.png)

You can install emotes from any channel, for example, here is some emotes from [`@xQcOW`](https://www.twitch.tv/xqcow).

![xQcL](/images/xqcl.png)

Some examples of the proper usage of the module.

![xQcL](/images/usage.png)

## How it works?

You can put CSS in the console so...
```js
console.log('test hehe')

console.log('test %chehe', 'color: red')

console.log('test %chehe', 'background-image: url(https://cdn.betterttv.net/emote/55a16413bcf69555414360f2/3x); padding: 30px;')
```

The rest of the code is for:

* Getting the list of emotes from url of  channels/users
* Downloading them at init time for caching and getting image dimensions
* Changing the argument list of calls to `console.logU` so calls like `console.logU('a', 1, 'b')` still prints `a 1 b`.

## Is this even legal???

Acording to the developers of BetterTTV:

![xQcL](/images/tos.png)
