import { config } from '../support/config';
import { ICustomWorld } from '../support/custom-world';
import { join } from 'path';

/**
 * Compares a screenshot to a base image,
 * if the base image doesn't exist it fails the test but creates a new base image based on
 * the screenshot passed so it can be used on the next run.
 * @param screenshot a playwright screenshot
 * @param customWorld needed to create the base image path
 * @param threshold the difference threshold
 */

interface ImagePathOptions {
  skipOs: boolean;
}

export function getImagePath(
  customWorld: ICustomWorld,
  name: string,
  options?: ImagePathOptions,
): string {
  return join(
    'screenshots',
    customWorld.feature?.uri || '',
    options?.skipOs ? '' : process.platform,
    config.browser,
    `${name}.png`,
  );
}
