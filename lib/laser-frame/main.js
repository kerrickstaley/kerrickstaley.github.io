// These clearance values are on each side, so you need to double them to get a diameter.
// I found that 0.2 mm gives better results than 0.1 mm. The hole formed with engraving is slightly
// conical and with 0.1 mm the head gets wedged in rather than resting on the tabs.
const nail_head_clearance_mm = 0.2;
const nail_shank_clearance_mm = 0.1;
// nail_to_top_dist_mm is the distance from the center of the nail to the top of the frame when the piece is hanging.
// If you print a small test piece (e.g. 2x2 cm), this will be overridden so that the hole is centered.
const nail_to_top_dist_mm = 20.0;
const doc_margin_mm = 10.0;
// We add extra_frame_size_mm to the width and height of the frame. One thing this accounts for is laser kerf. But kerf
// should only be 0.2 mm, not 0.8 mm. So what is the extra 0.6 mm? I don't know. The picture just always seems to hang
// off the frame if we don't add this.
const extra_frame_size_mm = 0.8;

function render(frame_elem, download_elem, {frame_width_mm, frame_height_mm, nail_head_diameter_mm, nail_shank_diameter_mm}={}) {
    removeChildren(frame_elem);

    const frame_width_with_extra = frame_width_mm + extra_frame_size_mm;
    const frame_height_with_extra = frame_height_mm + extra_frame_size_mm;

    frame_elem.setAttribute('width', (frame_width_with_extra + 2 * doc_margin_mm)  + 'mm');
    frame_elem.setAttribute('height', (frame_height_with_extra + 2 * doc_margin_mm) + 'mm')

    let svg = SVG().addTo(frame_elem);
    svg.viewbox(0, 0, frame_width_with_extra + 2 * doc_margin_mm, frame_height_with_extra + 2 * doc_margin_mm);

    svg.rect(frame_width_with_extra, frame_height_with_extra).move(doc_margin_mm, doc_margin_mm).stroke({color: '#f00', width: 0.1}).fill({opacity: 0, color: '#000'});

    let hole_width = nail_head_diameter_mm + 2 * nail_head_clearance_mm;
    let hole_height = 2 * hole_width;
    let slot_width = nail_shank_diameter_mm + 2 * nail_shank_clearance_mm;
    // hole_to_top_dist is the distance from the top of the frame to the top of the etched shelf
    let hole_to_top_dist = Math.min(nail_to_top_dist_mm - hole_width / 2, (frame_height_with_extra - hole_height) / 2);

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
            ['M', frame_width_with_extra / 2 - hole_width / 2 + doc_margin_mm, hole_to_top_dist + hole_width / 2 + doc_margin_mm],
            ['a', hole_width / 2, hole_width / 2, 0, 0, 1, hole_width, 0],
            ['l', 0, hole_height - hole_width],
        ]
        + shelf_interior_curve
        + [['z']]
    );
    svg.path(shelf_path_array).fill('#000');

    let cut_path_array = new SVG.PathArray(
        [['M', frame_width_with_extra / 2 + hole_width / 2 + doc_margin_mm, hole_to_top_dist + hole_height - hole_width / 2 + doc_margin_mm]]
        + shelf_interior_curve
        + [
            ['a', hole_width / 2, hole_width / 2, 0, 0, 0, hole_width, 0],
            ['z'],
        ]
    );
    svg.path(cut_path_array).stroke({color: '#f00', width: 0.1}).fill({opacity: 0, color: '#000'});

    let download_a = document.querySelector('#download');
    let svg_txt = frame_elem.outerHTML;
    download_elem.setAttribute('href', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg_txt));
    download_elem.setAttribute('download', 'frame.svg');
}

function removeChildren(elem) {
    while (elem.firstChild) {
        elem.firstChild.remove();
    }
}

const frame_svg_elem = document.querySelector('#laser-frame');
const download_a_elem = document.querySelector('#download');
render(frame_svg_elem, download_a_elem, {
    frame_width_mm: 305.0,
    frame_height_mm: 457.5,
    nail_head_diameter_mm: 3.8,
    nail_shank_diameter_mm: 1.6,
});
