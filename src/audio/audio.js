export default class Audio{
  constructor(){
    this.musicSrc = '../../assets/sounds/dreamer.mp3'
    this.music = document.createElement('audio')
    this.music.setAttribute('src',this.musicSrc)
    this.music.volume = 0.05
    this.bounceSrc = '../../assets/sounds/bounce.mp3'
    this.breakSrc = '../../assets/sounds/break.mp3'
  }

  musicMuteUnmute(sound){
    if(sound){
      this.music.volume = 0.05
    }else{
      this.music.volume = 0
    }
  }
  //playSound receive a sound in src, vol(number-float), loop(boolean)
  //volume is in the range of 0 to 1
  playSound(src,vol,loop){
    let sound = document.createElement('audio')
    sound.setAttribute('src',src)
    sound.volume = vol
    sound.loop = loop
    sound.play()
  }
}