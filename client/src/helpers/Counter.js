/**
 * The counter class tracks counts milliseconds up to a ceratin limit.
 * Every time the countAndCheckLimit method is called, the amount of milliseconds between
 * the last call and the current is added up to counter.
 */
class Counter { 
    constructor( maximumLimit, hasSemiRandomLimit ) {
        this.maximumLimit   = maximumLimit;
        this.semiRandomLimit= hasSemiRandomLimit;

        this.activeLimit    = 0;
        this.lastTimeStamp  = 0;
        this.newTimeStamp   = 0;
        this.counter        = 0;
        this.initLimit( );
    }
    /**
     * Set the millisecondslimit based on the maximumLimit
     */
    initLimit( ) {
        this.activeLimit = this.semiRandomLimit ? Math.ceil(Math.random( ) * this.maximumLimit ) : this.maximumLimit;
    }
    /**
     * Check the difference in milliseconds between the last timestmap and the new timestamp
     * Add the difference to the counter. Then, return isCounterOverLimit( )
     */
    countAndCheckLimit( ) {
        let count = false;
        if ( this.newTimeStamp != 0 ) {
            this.oldTimeStamp = this.newTimeStamp;
            count = true;
        }

        this.newTimeStamp = Date.now( );

        if ( count ) {
            this.counter += ( this.newTimeStamp - this.oldTimeStamp );
        }

        return this.isCounterOverLimit( ); 
    }
    /**
     * If the counter is over limit, reset it and return true.
     * Else, return false.
     */
    isCounterOverLimit( ) {
        if( this.counter > this.activeLimit ) {
            this.resetCounter( );
            this.initLimit( );
            return true;
        }
        return false;
    }
    /**
     * Clear the counter, lastTimeStamp and newTimeStamp props to restart counting
     */
    resetCounter( ) {
        this.counter = 0;
        this.lastTimeStamp  = 0;
        this.newTimeStamp   = 0;
    }
}

module.exports = {
    Counter
}