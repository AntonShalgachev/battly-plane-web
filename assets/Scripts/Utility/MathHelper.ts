export function clamp(val: number, min: number, max: number) {
	return Math.min(Math.max(val, min), max);
}

export function lerp(val1: number, val2: number, t: number) {
	return (1 - t) * val1 + t * val2;
}

export function closestArc(fromDeg: number, toDeg: number) {
	return (toDeg - fromDeg + 540.0) % 360.0 - 180.0;
}

export function clampMagnitude(val: number, max: number) {
	console.assert(max >= 0.0, "Invalid max");
	return clamp(val, -max, max);
}
