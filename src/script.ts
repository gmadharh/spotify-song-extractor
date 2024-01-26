console.log('executing script')
type Track = {
  songName?: string
  artist?: string
  albumName?: string
}

const track: Track = {}

const observer = new MutationObserver(function (mutations, mutationInstance) {
  const songName = document.querySelector('.encore-text-headline-large')
  const artist = document.querySelector('a[data-testid="creator-link"]')
  const albumName = document.querySelector('span.encore-text-body-small a')

  if (songName && artist && albumName) {
    track.songName = songName.textContent ?? ''
    track.artist = artist.textContent ?? ''
    track.albumName = albumName.textContent ?? ''

    // send message to background with track info
    // background sends message to index.ts with track info
    // track info gets displayed in popup html

    console.log(track)
    mutationInstance.disconnect()

    chrome.runtime.sendMessage({ action: 'track', info: track })
  }
})

observer.observe(document, {
  childList: true,
  subtree: true,
})
