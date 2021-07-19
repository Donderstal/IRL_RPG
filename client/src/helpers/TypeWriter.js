class TypeWriter {
    constructor( text ) {
        this.index  = 0;
        this.speed  = 50;

        this.fullText   = text;
        this.activeText = "";

        this.write( );
    }
    
    get isWriting( ) { return this.index < this.fullText.length }

    write( ) {
        if ( this.isWriting ) {
            this.activeText += this.fullText.charAt(this.index);
            this.index++;
            setTimeout( this.write.bind(this), this.speed );
        }
    }
}

module.exports = {
    TypeWriter
}