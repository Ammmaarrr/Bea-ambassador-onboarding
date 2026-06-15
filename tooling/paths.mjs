import path from "node:path";
import { fileURLToPath } from "node:url";

const TOOLING_DIR = path.dirname(fileURLToPath(import.meta.url));

/** Repository root (parent of tooling/). */
export const PROJECT_ROOT = path.resolve(TOOLING_DIR, "..");

/** Next.js application directory. */
export const WEB_APP = path.join(PROJECT_ROOT, "apps", "web");

/** Illustrator artboard PNG exports. */
export const ARTBOARDS_DIR = path.join(PROJECT_ROOT, "design", "artboards");

export const webPublic = (...segments) => path.join(WEB_APP, "public", ...segments);
export const webSrc = (...segments) => path.join(WEB_APP, "src", ...segments);
