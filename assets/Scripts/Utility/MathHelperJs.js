// TODO antonsh: remove

export default {
    clamp: function (val, min, max) {
        return Math.min(Math.max(val, min), max);
    },

    lerp: function (val1, val2, t) {
        return (1 - t) * val1 + t * val2;
    },
};
