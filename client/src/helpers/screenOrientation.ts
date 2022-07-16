export class ScreenOrientation {
    BENCHMARK_WIDTH: number;
    MOBILE: boolean;

    constructor() {
        this.BENCHMARK_WIDTH = 0;
        this.MOBILE = this.detectMobilePhone()
        this.setScreenBenchmark();
    }

    get PORTRAIT(): boolean { return screen.width < screen.height; }
    get LANDSCAPE(): boolean { return !this.PORTRAIT; }

    detectMobilePhone(): boolean {
        if ( "maxTouchPoints" in navigator ) {
            return navigator.maxTouchPoints > 0;
        } else if ( "msMaxTouchPoints" in navigator ) {
            return ( navigator as any ).msMaxTouchPoints > 0;
        } else {
            const mQ = matchMedia( "(pointer:coarse)" );
            if ( mQ && mQ.media === "(pointer:coarse)" ) {
                return !!mQ.matches;
            } else if ( 'orientation' in window ) {
                return true; // deprecated, but good fallback
            } else {
                // Only as a last resort, fall back to user agent sniffing
                const UA = navigator.userAgent;
                return (
                    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test( UA ) ||
                    /\b(Android|Windows Phone|iPad|iPod)\b/i.test( UA )
                );
            }
        }
    }

    setScreenBenchmark(): void {
        this.BENCHMARK_WIDTH =
            this.MOBILE
                ? screen.width > screen.height ? screen.height : screen.width
                : screen.width;
    }

    onFlip(): void {
        this.setScreenBenchmark();
    }
}