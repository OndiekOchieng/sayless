/**
 * Fixed intrinsic output formats.
 *
 * Every template canvas is authored at these exact pixel dimensions and is only
 * scaled down for on-screen display (see CanvasFrame.vue). Export targets the
 * unscaled node, so output size never depends on viewport width.
 */
export interface CanvasFormat {
  width: number;
  height: number;
  /** Cap on the on-screen display width, in CSS px. Display only. */
  maxWidth: number;
}

/** 9:16 status templates: Minimal, Twitter, Paper, Poster. */
export const STATUS_FORMAT: CanvasFormat = {
  width: 1080,
  height: 1920,
  maxWidth: 360,
};

/** 1:1 templates: Highlight. */
export const SQUARE_FORMAT: CanvasFormat = {
  width: 1080,
  height: 1080,
  maxWidth: 512,
};
