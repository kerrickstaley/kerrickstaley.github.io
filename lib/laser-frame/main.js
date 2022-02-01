let frame_width_cm = 30.48;
let frame_height_cm = 45.72;

const frame_elem = document.querySelector('#laser-frame');
while (frame_elem.firstChild) {
    frame_elem.firstChild.remove();
}
