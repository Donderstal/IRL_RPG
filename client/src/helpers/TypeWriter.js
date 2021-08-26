class TypeWriter {
    constructor( text ) {
        this.index  = 0;
        this.speed  = 50;

        this.fullText   = text;
        this.displayFull = false;
        this.activeText = "";

        this.write( );
    }
    
    get isWriting( ) { 
        if ( !this.displayFull ) {
            if ( this.index < this.fullText.length ) {
                return true;
            }
        }
        return false;
     }

    write( ) {
        if ( this.isWriting ) {
            this.activeText += this.fullText.charAt(this.index);
            this.index++;
            setTimeout( this.write.bind(this), this.speed );
        }
    }

    displayFullText( ) {
        this.activeText = this.fullText;
        this.displayFull = true;
    }
}

module.exports = {
    TypeWriter
}