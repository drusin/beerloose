export const DEFAULT_SPRITE_DIMENSIONS = { width: 16, height: 32 };
export const SPRITE_SCALE_FACTOR = 2;

export function createSpriteObject({ 
    spriteSheets, 
    frames, 
    frameDimensions = {
        frameWidth: DEFAULT_SPRITE_DIMENSIONS.width,
        frameHeight: DEFAULT_SPRITE_DIMENSIONS.height,
    },
    frameRate = 10 
}) {
    return {
        preloadSpritesheet: ({ scene }) => {
            Object.entries(spriteSheets).forEach(([key, value]) => scene.load.spritesheet(key, value.img, frameDimensions));
        },

        createAnimations: ({ scene }) => {
            Object.entries(spriteSheets).forEach(([spriteSheetKey, spriteSheetInfo]) => {
                const prefix = spriteSheetInfo.prefix ? spriteSheetInfo.prefix + '-' : '';
                Object.entries(frames).forEach(([key, value]) => {
                    scene.anims.create({
                        key: prefix + key,
                        frames: scene.anims.generateFrameNumbers(spriteSheetKey, value),
                        frameRate,
                        repeat: key === 'gal-drink' ? 0 : -1
                    });
                }) 
            });
        }
    }
}