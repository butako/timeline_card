import {test} from "node:test";
import assert from "node:assert/strict";
import {getHighlightPolylineOptions} from "../src/utils.js";

test("getHighlightPolylineOptions adds dashArray and the marching-ants class when animated", () => {
    const options = getHighlightPolylineOptions({color: "red", weight: 7, animated: true});
    assert.equal(options.dashArray, "14, 10");
    assert.equal(options.className, "timeline-marching-ants");
});

test("getHighlightPolylineOptions omits dashArray and className for a normal track", () => {
    const options = getHighlightPolylineOptions({color: "red", weight: 4, animated: false});
    assert.equal(options.dashArray, undefined);
    assert.equal(options.className, undefined);
});

test("getHighlightPolylineOptions carries color/opacity/weight through unchanged", () => {
    const options = getHighlightPolylineOptions({color: "blue", opacity: 0.8, weight: 5});
    assert.equal(options.color, "blue");
    assert.equal(options.opacity, 0.8);
    assert.equal(options.weight, 5);
});
