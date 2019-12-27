class OpeningDisplay extends ActivityDisplay {
    static update = (display, opening) => {
        display.cx.fillStyle = '#000';
        display.cx.fillRect(0 * display.zoom, 0 * display.zoom, 480 * display.zoom, 270 * display.zoom)

        // Transitions
        if (opening.initAnimFrame) display.fadeEffect('#000', opening.initAnimFrame, opening.initAnimInitFrame);
        if (opening.endAnimFrame) display.fadeEffect('#000', opening.endAnimFrame, opening.endAnimEndFrame);
    }
}