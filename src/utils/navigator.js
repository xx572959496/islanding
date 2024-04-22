export const isSafari = () => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export const isMobile = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}