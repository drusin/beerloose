export const DEFAULT_SPRITE_DIMENSIONS = { wdith: 16, height: 32 };

export function createSpriteObject({ 
    spriteSheets, 
    frames, 
    frameDimensions = {
        frameWidth: DEFAULT_SPRITE_DIMENSIONS.wdith,
        frameHeight: DEFAULT_SPRITE_DIMENSIONS.height,
    },
    frameRate = 15 
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
                        repeat: -1
                    });
                }) 
            });
        }
    }
}