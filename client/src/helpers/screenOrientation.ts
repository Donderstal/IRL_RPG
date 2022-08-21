export const portraitOrientation = (): boolean => { return screen.width < screen.height; };
export const landscapeOrientation = (): boolean => { return !portraitOrientation(); }

export const detectMobilePhone = (): boolean => {
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

export const setScreenBenchmark = (): void => {
    benchmarkWidth = mobileAgent
        ? screen.width > screen.height ? screen.height : screen.width
        : screen.width;
}

export let mobileAgent: boolean = detectMobilePhone();
export let benchmarkWidth: number;
setScreenBenchmark();
