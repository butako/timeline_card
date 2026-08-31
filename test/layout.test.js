import {test} from "node:test";
import assert from "node:assert/strict";
import {clampTimelineSize, isSolePanelViewCard, validateLayoutConfig} from "../src/utils.js";

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

test("isSolePanelViewCard is true only for the exact hui-card/hui-panel-view pairing", () => {
    assert.equal(isSolePanelViewCard("HUI-CARD", "HUI-PANEL-VIEW"), true);
});

test("isSolePanelViewCard is false for masonry/sections embeddings", () => {
    assert.equal(isSolePanelViewCard("HUI-CARD", "HUI-MASONRY-VIEW"), false);
    assert.equal(isSolePanelViewCard("HUI-CARD", "HUI-SECTION"), false);
    assert.equal(isSolePanelViewCard(undefined, undefined), false);
});
