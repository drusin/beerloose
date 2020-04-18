import { discoDancer } from "./disco-dancer";
import { squaredancer } from "./squaredancer";
import { metalDancer } from "./metal-dancer";
import { player } from "./player";

export function preloadAllSprites({ scene }) {
    discoDancer.preloadSpritesheet({ scene });
    squaredancer.preloadSpritesheet({ scene });
    metalDancer.preloadSpritesheet({ scene });
    player.preloadSpritesheet({ scene });
};

export function createAnimationsForAllSprites({ scene }) {
    discoDancer.createAnimations({ scene });
    squaredancer.createAnimations({ scene });
    metalDancer.createAnimations({ scene });
    player.createAnimations({ scene });
};

export { discoDancer, squaredancer, metalDancer, player };