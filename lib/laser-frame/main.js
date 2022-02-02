let frame_width_mm = 80.0; // 304.8;
let frame_height_mm = 80.0; // 457.2;
let nail_head_diameter_mm = 4.4;
let nail_shank_diameter_mm = 2.0;

// These clearance values are on each side, so you need to double them to get a diameter.
// I found that 0.2 mm gives better results than 0.1 mm. The hole formed with engraving is slightly
// conical and with 0.1 mm the head gets wedged in rather than resting on the tabs.
const nail_head_clearance_mm = 0.2;
const nail_shank_clearance_mm = 0.1;
const max_hole_to_top_dist_mm = 10.0;

const frame_elem = document.querySelector('#laser-frame');
while (frame_elem.firstChild) {
    frame_elem.firstChild.remove();
}

let svg = SVG().addTo('#laser-frame');
svg.rect(frame_width_mm + "mm", frame_height_mm + "mm").stroke('#f00').fill({'opacity': 0});

let hole_width = nail_head_diameter_mm + 2 * nail_head_clearance_mm;
let hole_height = 2 * hole_width;
let hole_to_top_dist = Math.min(max_hole_to_top_dist_mm, (frame_height_mm - hole_height) / 2);

svg.circle(hole_width + 'mm').fill('#000').center(
    frame_width_mm / 2 + 'mm',
    hole_to_top_dist + hole_width / 2 + 'mm');
svg.circle(hole_width + 'mm').fill('#000').center(
    frame_width_mm / 2 + 'mm',
    hole_to_top_dist + hole_height - hole_width / 2 + 'mm');

let path_array = new SVG.PathArray([
    ['M', 0, 0],
    ['L', 100, 0],
    ['L', 0, 100],
    ['z'],
]);
svg.path(path_array).fill('#00f');

let download_a = document.querySelector('#download');
let svg_txt = document.querySelector('#laser-frame').outerHTML;
download_a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(svg_txt));
download_a.setAttribute('download', 'frame.svg');
