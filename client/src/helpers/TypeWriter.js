class TypeWriter {
    constructor( text ) {
        this.index  = 0;
        this.speed  = 50;

        this.fullText   = text;
        this.activeText = "";

        this.write( );
    }

    write( ) {
        if ( this.index < this.fullText.length ) {
            this.activeText += this.fullText.charAt(this.index);
            this.index++;
            setTimeout( this.write.bind(this), this.speed );
        }
    }
}

module.exports = {
    TypeWriter
}