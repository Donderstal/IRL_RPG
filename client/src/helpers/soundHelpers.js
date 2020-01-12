class soundClass {
    constructor ( src ) {
        this.sound = document.createElement("audio");
        this.sound.src = "/static/music/" + src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.setAttribute("id", "src");
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