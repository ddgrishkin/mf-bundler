import { ServiceAssets } from "./types";

export function convertManifest(manifest: Record<string, string>): ServiceAssets {
    const scripts: ServiceAssets['scripts'] = [];
    const links: ServiceAssets['links'] = [];

    for (const filename of Object.keys(manifest)) {
        const path = manifest[filename];
        if (filename.endsWith('.js')) {
            scripts.push(path);
        } else if (filename.endsWith('.css')) {
            links.push(path);
        }
    }

    return {
        scripts,
        links,
    };
}
