# requestShowMedia.js
### A [Presentation API](http://webscreens.github.io/presentation-api/) [prollyfill](http://prollyfill.org/) for the `HTMLMediaElement`.

### Demo

A [second screen &lt;video&gt; sharing demo](http://webscreens.github.io/requestshowmedia/demo/) displays a `<video>` contained on a web page on a second screen and allows its playback to be controlled using the standard `HTMLMediaElement` methods `play()`, `pause()`, and `fastSeek(time)`. The demo works in modern browsers (tested with latest Chrome, Firefox, and Safari) by emulating a second screen using a new window. If an [experimental Chromium build](http://webscreens.github.io/demo/#binaries) is used, the video is displayed on a real second screen.

### How It Works

1. Include the `requestshowmedia.js` script to your page, copy `requestshowmedia.js` and `player.html` to the same directory (or see `demo/index.html` for advanced configuration).
1. Invoke `requestShow()` on the video element to show the video on the second screen.
1. Use the standard `HTMLMediaElement` methods to control the playback on the second screen.
1. Enjoy.

```html
<script src="requestshowmedia.js" data-player="player.html"></script>
<video src="myvideo.mp4"></video>
<script>
var v = document.querySelector('video');
v.requestShow();
v.play();
v.pause();
v.fastSeek(time);
</script>
```
### Next Steps

* Track and help evolve the Presentation API
* Implement the missing `HTMLMediaElement` methods
* Make `requestShow()` return a promise when [the browser support improves](http://caniuse.com/promises) (or use a polyfill)
* Implement `close()`
* Use native `fastSeek(time)` when browsers implement it

### Credits

Video trailer from http://www.bigbuckbunny.org/, an open source http://www.blender.org/ project.
Transcoded versions from https://github.com/georgepaterson/jquery-videobackground.