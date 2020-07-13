class Sound {
  constructor ( src, sfx = false, battle = false, isMainMenu = false ) {
    if ( !document.getElementById(src) ) {
      this.sound = document.createElement("audio");
      if ( sfx ) {
        this.sound.volume = 0.66;          
        this.sound.src = "/static/sfx/" + src;  
      }
      else if ( battle ) {
        this.sound.src = "/static/music/" + src;     
        this.sound.setAttribute("loop", true);
      }
      else {
        this.sound.volume = isMainMenu ? 0.25 : 0.50;
        this.sound.src = "/static/music/" + src;     
        this.sound.setAttribute("loop", true);
      }
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.src = src
      this.sound.setAttribute("id", src);
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);        
    }
    else {
      this.sound = document.getElementById(src)
    }
  }
  play( ) {
    this.sound.play();
  }
  pause( ) {
    this.sound.pause();
  }
  stop ( ) {
    this.sound.pause();
  }
}

module.exports = {
    Sound
}