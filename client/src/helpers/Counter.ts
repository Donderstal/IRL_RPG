/**
 * The counter class tracks counts milliseconds up to a certain limit.
 * Every time the countAndCheckLimit method is called, the amount of milliseconds between
 * the last call and the current is added up to counter.
 */
export class Counter {
    maximumLimit: number;
    hasSemiRandomLimit: boolean;
    hasMinimumLimit: boolean;

    activeLimit: number;
    oldTimeStamp: number;
    newTimeStamp: number;
    counter: number;
    constructor( maximumLimit: number, hasSemiRandomLimit = false, hasMinimumLimit = true ) {
        this.maximumLimit       = maximumLimit;
        this.hasSemiRandomLimit = hasSemiRandomLimit;
        this.hasMinimumLimit    = hasMinimumLimit;

        this.activeLimit    = 0;
        this.oldTimeStamp   = 0;
        this.newTimeStamp   = 0;
        this.counter        = 0;
        this.initLimit( );
    }

    initLimit(): void {
        this.activeLimit = this.hasSemiRandomLimit ? Math.ceil(Math.random( ) * this.maximumLimit ) : this.maximumLimit;
        if ( this.activeLimit < 1000 && this.hasMinimumLimit ) {
            this.initLimit( );
        }
    }

    countAndCheckLimit( ): boolean {
        this.count();
        return this.isCounterOverLimit( ); 
    }

    count(): void {
        let count = false;
        if ( this.newTimeStamp !== 0 ) {
            this.oldTimeStamp = this.newTimeStamp;
            count = true;
        }

        this.newTimeStamp = Date.now();

        if ( count ) {
            this.counter += ( this.newTimeStamp - this.oldTimeStamp );
        }
    }

    isCounterOverLimit( ): boolean {
        if( this.counter > this.activeLimit ) {
            this.resetCounter( );
            this.initLimit( );
            return true;
        }
        return false;
    }

    resetCounter( ): void {
        this.counter = 0;
        this.oldTimeStamp  = 0;
        this.newTimeStamp   = 0;
    }
}