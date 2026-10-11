import {test} from "node:test";
import assert from "node:assert/strict";
import {
    clampTimelineSize,
    getTimelineLayoutClass,
    isSolePanelViewCard,
    shouldFixMapHeight,
    validateLayoutConfig,
} from "../src/utils.js";

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
    assert.doesNotThrow(() => validateLayoutConfig({timeline_position: "left", pills_position: "below"}));
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

test("validateLayoutConfig throws for an invalid pills_position", () => {
    assert.throws(() => validateLayoutConfig({timeline_position: "top", pills_position: "inside"}));
});

test("validateLayoutConfig accepts a full valid layout config", () => {
    assert.doesNotThrow(() => validateLayoutConfig({timeline_position: "right", pills_position: "above"}));
});

test("shouldFixMapHeight is always true for top/bottom regardless of width", () => {
    assert.equal(shouldFixMapHeight("top", 1200), true);
    assert.equal(shouldFixMapHeight("bottom", 300), true);
});

test("shouldFixMapHeight is false for left/right when wide (the two-column desktop layout)", () => {
    assert.equal(shouldFixMapHeight("left", 1200), false);
    assert.equal(shouldFixMapHeight("right", 601), false);
});

test("shouldFixMapHeight is true for left/right when narrow (collapsed back to stacked)", () => {
    assert.equal(shouldFixMapHeight("left", 600), true);
    assert.equal(shouldFixMapHeight("right", 320), true);
});

test("isSolePanelViewCard is true only for the exact hui-card/hui-panel-view pairing", () => {
    assert.equal(isSolePanelViewCard("HUI-CARD", "HUI-PANEL-VIEW"), true);
});

test("isSolePanelViewCard is false for masonry/sections embeddings", () => {
    assert.equal(isSolePanelViewCard("HUI-CARD", "HUI-MASONRY-VIEW"), false);
    assert.equal(isSolePanelViewCard("HUI-CARD", "HUI-SECTION"), false);
    assert.equal(isSolePanelViewCard(undefined, undefined), false);
});
