const popupWindow = (url, title, w, h) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    // const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
    // const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;

    // const systemZoom = width / window.screen.availWidth;
    // const left = (width - w) / 2 / systemZoom + dualScreenLeft
    // const top = (height - h) / 2 / systemZoom + dualScreenTop
    const left = (window.screen.width - w) / 2;
    const top = (window.screen.height - h) / 4;
    const newWindow = window.open(url, title,
        `
    scrollbars=yes,
    width=${w}, 
    height=${h}, 
    top=${top}, 
    left=${left}
    `
    )

    if (window.focus)
        newWindow.focus();
    return newWindow;
}

export default popupWindow;