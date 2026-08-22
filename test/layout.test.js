import {test} from "node:test";
import assert from "node:assert/strict";
import {clampTimelineSize, getTimelineLayoutClass, validateLayoutConfig} from "../src/utils.js";

test("getTimelineLayoutClass returns the matching class for each valid position", () => {
    assert.equal(getTimelineLayoutClass("top"), "timeline-top");
    assert.equal(getTimelineLayoutClass("bottom"), "timeline-bottom");
    assert.equal(getTimelineLayoutClass("left"), "timeline-left");
    assert.equal(getTimelineLayoutClass("right"), "timeline-right");
});

test("getTimelineLayoutClass falls back to bottom for invalid/missing values", () => {
    assert.equal(getTimelineLayoutClass("sideways"), "timeline-bottom");
    assert.equal(getTimelineLayoutClass(undefined), "timeline-bottom");
});

test("validateLayoutConfig accepts a valid timeline_position", () => {
    assert.doesNotThrow(() => validateLayoutConfig({timeline_position: "left"}));
});

test("validateLayoutConfig throws for an invalid timeline_position", () => {
    assert.throws(() => validateLayoutConfig({timeline_position: "sideways"}));
});

test("clampTimelineSize clamps values into the 10-90 range", () => {
    assert.equal(clampTimelineSize(5), 10);
    assert.equal(clampTimelineSize(95), 90);
    assert.equal(clampTimelineSize(30), 30);
});

test("clampTimelineSize falls back to 30 for non-numeric input", () => {
    assert.equal(clampTimelineSize("not-a-number"), 30);
    assert.equal(clampTimelineSize(undefined), 30);
});
