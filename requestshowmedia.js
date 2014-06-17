(function () {

var playerOrigin = document.querySelector('script[src$="requestshowmedia.js"]')
                   .dataset.playerorigin || '/';

var video = null,
    play = HTMLMediaElement.prototype.play,
    pause = HTMLMediaElement.prototype.pause;
    // var fastSeek = HTMLMediaElement.prototype.fastSeek; // not implemented by browsers yet

HTMLVideoElement.prototype.requestShow = function () {
  video = this;
  // TODO: return a promise instead.
  return requestShowMedia(this);
};

HTMLMediaElement.prototype.play = function (args) {
  if (this.dataset.secondScreenEnabled === 'true') {
    video.player.postMessage({ cmd: 'play'}, playerOrigin);
  } else {
    play.apply(this, args);
  }
};

HTMLMediaElement.prototype.pause = function (args) {
  if (this.dataset.secondScreenEnabled  === 'true') {
    video.player.postMessage({ cmd: 'pause'}, playerOrigin);
  } {
    pause.apply(this, args);
  }
};

HTMLMediaElement.prototype.fastSeek = function (currentTime) {
  if (this.dataset.secondScreenEnabled  === 'true') {
    video.player.postMessage({ cmd: 'fastSeek', currentTime: currentTime }, playerOrigin);
  } else {
    //fastSeek.apply(this, args); // not implemented by browsers yet
    this.currentTime = currentTime;
  }
};

function requestShowMedia(video) {
  var playerURL = document.querySelector('script[src$="requestshowmedia.js"]').dataset.player;
  video.player = window.open(playerURL, '', 'presentation');
  video.dataset.secondScreenEnabled = true;
  
  video.player.addEventListener('load', function () {
    video.pause();
    video.style.opacity = 0.5;
    video.player.postMessage({
      cmd: 'open',
      currentSrc: video.currentSrc,
      currentTime: video.currentTime
    }, playerOrigin);
  });

  addEventListener('message', function (event) {
    switch (event.data.cmd) {
      case 'play':
        video.dataset.secondScreenEnabled = false;
        video.style.opacity = 1;
        video.currentTime = event.data.currentTime;
        video.play();
        break;
      case 'ontimeupdateonsecondscreen':
        try {
          video.ontimeupdateonsecondscreen(event.data.currentTime);
        } catch (ex) { }

        video.dispatchEvent(new CustomEvent('timeupdateonsecondscreen',
          { detail: { currentTimeOnSecondScreen: event.data.currentTime } }));
        break;
      case 'close':
        try {
          video.onclosesecondscreen();
        } catch (ex) { }

        video.dispatchEvent(new Event('closesecondscreen'));
        break;
      default:
        break;
    }
  });

  return video.player;
}

}());