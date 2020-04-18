export function createSpriteObject({ 
    spriteSheet, 
    frames, 
    spriteSheetKey, 
    frameDimensions = {
        frameWidth: 16,
        frameHeight: 32
    },
    frameRate = 15 
}) {
    return {
        preloadSpritesheet: ({ scene }) => {
            scene.load.spritesheet(spriteSheetKey, spriteSheet, frameDimensions);
        },

        createAnimations: ({ scene }) => {
            Object.entries(frames).forEach(([key, value]) => {
                scene.anims.create({
                    key,
                    frames: scene.anims.generateFrameNumbers(spriteSheetKey, value),
                    frameRate,
                    repeat: -1
                });
            });
        },
    }
}