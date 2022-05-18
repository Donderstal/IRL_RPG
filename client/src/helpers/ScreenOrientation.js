class ScreenOrientation {
    constructor( ) {
        this.MOBILE = this.detectMobilePhone( )
        this.setScreenBenchmark( );
    }

    get PORTRAIT() { return screen.width < screen.height; }
    get LANDSCAPE() { return !this.portait; }

    detectMobilePhone( ) {
        if ("maxTouchPoints" in navigator) {
            return navigator.maxTouchPoints > 0;
        } else if ("msMaxTouchPoints" in navigator) {
            return navigator.msMaxTouchPoints > 0;
        } else {
            var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
            if (mQ && mQ.media === "(pointer:coarse)") {
                return !!mQ.matches;
            } else if ('orientation' in window) {
                return true; // deprecated, but good fallback
            } else {
                // Only as a last resort, fall back to user agent sniffing
                var UA = navigator.userAgent;
                return (
                    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
                );
            }
        }
    }

    setScreenBenchmark( ) {
        this.BENCHMARK_WIDTH = 
            this.MOBILE 
                ? screen.width > screen.height ? screen.height : screen.width
                : screen.width;
    }

    onFlip( ) {
        this.setScreenBenchmark( );
    }
}

module.exports = {
    ScreenOrientation
}