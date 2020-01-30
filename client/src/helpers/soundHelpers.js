class soundClass {
    constructor ( src, sfx = false ) {
      this.sound = document.createElement("audio");
        if ( sfx ) {
          this.sound.src = "/static/sfx/" + src;      
          this.sound.volume = 0.5  
        }
        else {
          this.sound.src = "/static/music/" + src;     
          this.sound.volume = 0.75  
          this.sound.setAttribute("loop", true);
        }
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.src = src
        this.sound.setAttribute("id", src);
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);        
    }

    play( ) {
      this.sound.play();
    }
    pause( ) {
      this.sound.pause();
    }
    stop ( ) {
      this.sound.pause();
      document.getElementById(this.src).remove()
    }
  }

module.exports = {
    soundClass
}