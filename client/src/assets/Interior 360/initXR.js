if (typeof navigator.getVRDisplays !== "function") {
    new WebXRPolyfill({
        allowCardboardOnDesktop: false
    })
}