let frame_width_mm = 15.0; // 304.8;
let frame_height_mm = 15.0; // 457.2;
let nail_head_diameter_mm = 3.8;
let nail_shank_diameter_mm = 1.6;

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
svg.viewbox(0, 0, 1000, 1000);

let mm = 0; // "mm"

svg.rect(frame_width_mm + mm, frame_height_mm + mm).stroke({color: '#f00', width: 0.1}).fill({opacity: 0, color: '#000'});

let hole_width = nail_head_diameter_mm + 2 * nail_head_clearance_mm;
let hole_height = 2 * hole_width;
let slot_width = nail_shank_diameter_mm + 2 * nail_shank_clearance_mm;
let hole_to_top_dist = Math.min(max_hole_to_top_dist_mm, (frame_height_mm - hole_height) / 2);

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
        ['M', frame_width_mm / 2 - hole_width / 2, hole_to_top_dist + hole_width / 2],
        ['a', hole_width / 2, hole_width / 2, 0, 0, 1, hole_width, 0],
        ['l', 0, hole_height - hole_width],
    ]
    + shelf_interior_curve
    + [['z']]
);
svg.path(shelf_path_array).fill('#000');

let cut_path_array = new SVG.PathArray(
    [['M', frame_width_mm / 2 + hole_width / 2, hole_to_top_dist + hole_height - hole_width / 2]]
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
