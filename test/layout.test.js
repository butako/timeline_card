import {test} from "node:test";
import assert from "node:assert/strict";
import {getTimelineLayoutClass, validateLayoutConfig} from "../src/utils.js";

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
