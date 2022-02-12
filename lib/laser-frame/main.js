let frame_width_mm =  304.8;
let frame_height_mm = 457.2;
let nail_head_diameter_mm = 3.8;
let nail_shank_diameter_mm = 1.6;
let laser_kerf_mm = 0.2;

// These clearance values are on each side, so you need to double them to get a diameter.
// I found that 0.2 mm gives better results than 0.1 mm. The hole formed with engraving is slightly
// conical and with 0.1 mm the head gets wedged in rather than resting on the tabs.
// These should probably be based on the laser kerf, but :shrug:
const nail_head_clearance_mm = 0.2;
const nail_shank_clearance_mm = 0.1;
// nail_to_top_dist_mm is the distance from the center of the nail to the top of the frame when the piece is hanging
// it may be overridden if the frame is very small (a few cm), so that you can cut test frames to test the hole
const nail_to_top_dist_mm = 20.0;
const doc_margin_mm = 10.0;

const frame_elem = document.querySelector('#laser-frame');
while (frame_elem.firstChild) {
    frame_elem.firstChild.remove();
}

frame_elem.setAttribute('width', (frame_width_mm + 2 * doc_margin_mm + 2 * laser_kerf_mm)  + 'mm');
frame_elem.setAttribute('height', (frame_height_mm + 2 * doc_margin_mm + 2 * laser_kerf_mm) + 'mm')

let svg = SVG().addTo('#laser-frame');
svg.viewbox(0, 0, frame_width_mm + 2 * doc_margin_mm + 2 * laser_kerf_mm, frame_height_mm + 2 * doc_margin_mm + 2 * laser_kerf_mm);

let mm = 0; // "mm"

svg.rect(frame_width_mm + laser_kerf_mm + mm, frame_height_mm + laser_kerf_mm + mm).move(doc_margin_mm + laser_kerf_mm / 2, doc_margin_mm + laser_kerf_mm / 2).stroke({color: '#f00', width: 0.1}).fill({opacity: 0, color: '#000'});

let hole_width = nail_head_diameter_mm + 2 * nail_head_clearance_mm;
let hole_height = 2 * hole_width;
let slot_width = nail_shank_diameter_mm + 2 * nail_shank_clearance_mm;
// hole_to_top_dist is the distance from the top of the frame to the top of the etched shelf
let hole_to_top_dist = Math.min(nail_to_top_dist_mm - hole_width / 2, (frame_height_mm - hole_height) / 2);

// cusp_height is the vertical distance from the center of the insertion hole to the cusp on the shelf
let cusp_height = Math.sqrt((hole_width / 2) ** 2 - (slot_width / 2) ** 2);

let shelf_interior_curve = [
    ['a', hole_width / 2, hole_width / 2, 0, 0, 0, -(hole_width / 2 - slot_width / 2), -cusp_height],
    ['l', 0, cusp_height - (hole_height - hole_width)],
    ['a', slot_width / 2, slot_width / 2, 0, 0, 0, -slot_width, 0],
    ['l', 0, hole_height - hole_width - cusp_height],
    ['a', hole_width / 2, hole_width / 2, 0, 0, 0, -(hole_width / 2 - slot_width / 2), cusp_height],
];

let shelf_path_array = new SVG.PathArray(
    [
        ['M', frame_width_mm / 2 - hole_width / 2 + doc_margin_mm + laser_kerf_mm, hole_to_top_dist + hole_width / 2 + doc_margin_mm + laser_kerf_mm],
        ['a', hole_width / 2, hole_width / 2, 0, 0, 1, hole_width, 0],
        ['l', 0, hole_height - hole_width],
    ]
    + shelf_interior_curve
    + [['z']]
);
svg.path(shelf_path_array).fill('#000');

let cut_path_array = new SVG.PathArray(
    [['M', frame_width_mm / 2 + hole_width / 2 + doc_margin_mm + laser_kerf_mm, hole_to_top_dist + hole_height - hole_width / 2 + doc_margin_mm + laser_kerf_mm]]
    + shelf_interior_curve
    + [
        ['a', hole_width / 2, hole_width / 2, 0, 0, 0, hole_width, 0],
        ['z'],
    ]
);
svg.path(cut_path_array).stroke({color: '#f00', width: 0.1}).fill({opacity: 0, color: '#000'});

let download_a = document.querySelector('#download');
let svg_txt = document.querySelector('#laser-frame').outerHTML;
download_a.setAttribute('href', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg_txt));
download_a.setAttribute('download', 'frame.svg');
