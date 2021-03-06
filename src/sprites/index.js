import { discoDancer } from "./disco-dancer";
import { squaredancer } from "./squaredancer";
import { metalDancer } from "./metal-dancer";
import { bartender } from "./bartender";
import { dj } from "./dj";
import { gal } from "./gal";
import { player } from "./player";

import { indicator } from "./indicator";

import { dancefloor } from "./dancefloor";

export { SPRITE_SCALE_FACTOR } from './sprite-creator-factory';

export function preloadAllSprites({ scene }) {
    discoDancer.preloadSpritesheet({ scene });
    squaredancer.preloadSpritesheet({ scene });
    metalDancer.preloadSpritesheet({ scene });
    bartender.preloadSpritesheet({ scene });
    dj.preloadSpritesheet({ scene });
    gal.preloadSpritesheet({ scene });
    player.preloadSpritesheet({ scene });

    indicator.preloadSpritesheet({ scene });

    dancefloor.preloadSpritesheet({ scene });
};

export function createAnimationsForAllSprites({ scene }) {
    discoDancer.createAnimations({ scene });
    squaredancer.createAnimations({ scene });
    metalDancer.createAnimations({ scene });
    bartender.createAnimations({ scene });
    dj.createAnimations({ scene });
    gal.createAnimations({ scene });
    player.createAnimations({ scene });

    dancefloor.createAnimations({ scene });

    indicator.createAnimations({ scene });
};

export { discoDancer, squaredancer, metalDancer, player, bartender, gal, dj, dancefloor, indicator };