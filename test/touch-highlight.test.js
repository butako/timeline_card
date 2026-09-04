import {test} from "node:test";
import assert from "node:assert/strict";
import {nextPinnedSegmentIndex, resolveHighlightIndex} from "../src/utils.js";

// Touch devices fire no mouseover/mouseout, so a tap has to pin the highlight that a
// mouse gets for free from hover -- otherwise the marching ants never show on mobile.

test("nextPinnedSegmentIndex pins the tapped segment", () => {
    assert.equal(nextPinnedSegmentIndex(null, 2), 2);
});

test("nextPinnedSegmentIndex moves the pin to a different segment", () => {
    assert.equal(nextPinnedSegmentIndex(2, 5), 5);
});

test("nextPinnedSegmentIndex unpins when the pinned segment is tapped again", () => {
    assert.equal(nextPinnedSegmentIndex(2, 2), null);
});

test("nextPinnedSegmentIndex keeps the current pin for a non-index argument", () => {
    assert.equal(nextPinnedSegmentIndex(3, undefined), 3);
    assert.equal(nextPinnedSegmentIndex(3, NaN), 3);
});

test("nextPinnedSegmentIndex pins segment 0", () => {
    assert.equal(nextPinnedSegmentIndex(null, 0), 0);
    assert.equal(nextPinnedSegmentIndex(0, 0), null);
});

test("resolveHighlightIndex prefers a live hover over the pin", () => {
    assert.equal(resolveHighlightIndex(2, 5), 5);
});

test("resolveHighlightIndex falls back to the pin once hover ends", () => {
    assert.equal(resolveHighlightIndex(2, null), 2);
    assert.equal(resolveHighlightIndex(2, undefined), 2);
});

test("resolveHighlightIndex returns null when nothing is pinned or hovered", () => {
    assert.equal(resolveHighlightIndex(null, null), null);
});

test("resolveHighlightIndex keeps a hovered or pinned segment 0", () => {
    assert.equal(resolveHighlightIndex(null, 0), 0);
    assert.equal(resolveHighlightIndex(0, null), 0);
});
