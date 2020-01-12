class soundClass {
    constructor ( src, sfx = false ) {
        this.sound = document.createElement("audio");
        if ( sfx ) {
          this.sound.src = "/static/sfx/" + src;      
          this.sound.volume = 0.66  
        }
        else {
          this.sound.src = "/static/music/" + src;     
          this.sound.volume = 1   
        }
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
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
    }
  }

module.exports = {
    soundClass
}