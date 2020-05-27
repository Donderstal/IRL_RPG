class Sound {
    constructor ( src, sfx = false, battle = false ) {
      /* this.sound = document.createElement("audio");
      this.sound.volume = 0.5;
        if ( sfx ) {
          this.sound.src = "/static/sfx/" + src;      
        }
        else if ( battle ) {
          this.sound.src = "/static/music/" + src;     
          this.sound.setAttribute("loop", true);
        }
        else {
          this.sound.src = "/static/music/" + src;     
          this.sound.setAttribute("loop", true);
        }
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.src = src
        this.sound.setAttribute("id", src);
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);      */   
    }

    play( ) {
      /* this.sound.play(); */
    }
    pause( ) {
      /* this.sound.pause(); */
    }
    stop ( ) {
      /* this.sound.pause();
      document.getElementById(this.src).remove() */
    }
  }

module.exports = {
    Sound
}