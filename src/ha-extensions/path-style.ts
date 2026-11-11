import type { MapLatLng, MapPath } from "../ha-frontend/src/common/map/map-engine";

export interface PathDash {
    dash: number;
    gap: number;
}

export interface StyledMapPath extends MapPath {
    width?: number;
    border?: { color: string; width: number };
    animated?: PathDash;
    onClick?(location: MapLatLng): void;
}

export interface PopupEngine {
    openPopup(location: MapLatLng, html: string): void;
    closePopup(): void;
}

export const animatePathDash = ({ dash, gap }: PathDash, onOffset: (offset: number) => void): (() => void) => {
    const period = dash + gap;
    let last: number | undefined;
    let frame = requestAnimationFrame(function step(time) {
        const offset = Math.floor((time / 1000) * period) % period;
        if (offset !== last) {
            last = offset;
            onOffset(offset);
        }
        frame = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(frame);
};
