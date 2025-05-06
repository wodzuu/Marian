enum ActionKind {
    Walking,
    Idle,
    Jumping,
    WalkingLeft,
    WalkingRight
}
namespace SpriteKind {
    export const Trap = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Trap, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        info.changeLifeBy(-1)
        music.powerDown.play()
    }
    pause(invincibilityPeriod)
})
function stwórzMariana () {
    marian = sprites.create(marianek, SpriteKind.Player)
    mySprite = 0
    scene.cameraFollowSprite(marian)
    controller.moveSprite(marian, 50, 0)
    marian.ay = 150
}
function załadujSklep (poziom: number) {
    clearLevel()
    tiles.setCurrentTilemap(myCategory.shop(poziom))
    setUpLevelObjects(poziom)
}
function wDół () {
    if (myCategory.isOnTop(marian, assets.tile`ladder0`)) {
        marian.y += 1
        marian.x = marian.tilemapLocation().x
    }
}
function setUpLevelObjects (poziom: number) {
    snakeSpeed = Math.min(poziom * 5, 30)
    pozycjaStartowaMariana = tiles.getTilesByType(assets.tile`entrance0`)[0]
    tiles.placeOnTile(marian, pozycjaStartowaMariana)
    for (let value3 of tiles.getTilesByType(assets.tile`spikes0`)) {
        spikesSprite = sprites.create(img`
            . . . . . . . . 
            . . . . . . . . 
            . . . 7 . . . . 
            . 7 . 7 . . . 7 
            . 7 . 7 . 7 . 7 
            . 7 . 7 7 7 . 7 
            7 7 7 7 7 7 . 7 
            7 7 7 7 7 7 7 7 
            `, SpriteKind.Trap)
        tiles.placeOnTile(spikesSprite, value3)
        tiles.setTileAt(value3, assets.tile`myTile1`)
    }
    for (let value of tiles.getTilesByType(assets.tile`coin0`)) {
        coinSprite = sprites.create(assets.image`Marian0`, SpriteKind.Food)
        animation.runImageAnimation(
        coinSprite,
        [img`
            . . . 4 4 . . . 
            . . 4 5 5 4 . . 
            . . 4 4 5 4 . . 
            . . 4 4 5 4 . . 
            . . 4 4 5 4 . . 
            . . 4 4 5 4 . . 
            . . 4 5 5 4 . . 
            . . . 4 4 . . . 
            `,img`
            . . . 4 4 . . . 
            . . 4 5 5 4 . . 
            . 4 5 4 5 5 4 . 
            . 4 5 4 5 5 4 . 
            . 4 5 4 5 5 4 . 
            . 4 5 4 5 5 4 . 
            . . 4 5 5 4 . . 
            . . . 4 4 . . . 
            `,img`
            . . 4 4 4 . . . 
            . 4 5 5 5 4 . . 
            4 5 5 4 5 5 4 . 
            4 5 4 4 4 5 4 . 
            4 5 4 4 4 5 4 . 
            4 5 5 4 5 5 4 . 
            . 4 5 5 5 4 . . 
            . . 4 4 4 . . . 
            `,img`
            . . 4 4 4 4 . . 
            . 4 5 5 5 5 4 . 
            4 5 5 4 4 5 5 4 
            4 5 4 4 4 4 5 4 
            4 5 4 4 4 4 5 4 
            4 5 5 4 4 5 5 4 
            . 4 5 5 5 5 4 . 
            . . 4 4 4 4 . . 
            `,img`
            . . . 4 4 4 . . 
            . . 4 5 5 5 4 . 
            . 4 5 5 4 5 5 4 
            . 4 5 4 4 4 5 4 
            . 4 5 4 4 4 5 4 
            . 4 5 5 4 5 5 4 
            . . 4 5 5 5 4 . 
            . . . 4 4 4 . . 
            `,img`
            . . . 4 4 . . . 
            . . 4 5 5 4 . . 
            . 4 5 5 4 5 4 . 
            . 4 5 5 4 5 4 . 
            . 4 5 5 4 5 4 . 
            . 4 5 5 4 5 4 . 
            . . 4 5 5 4 . . 
            . . . 4 4 . . . 
            `,img`
            . . . 4 4 . . . 
            . . 4 5 5 4 . . 
            . . 4 5 4 4 . . 
            . . 4 5 4 4 . . 
            . . 4 5 4 4 . . 
            . . 4 5 4 4 . . 
            . . 4 5 5 4 . . 
            . . . 4 4 . . . 
            `],
        50,
        true
        )
        tiles.placeOnTile(coinSprite, value)
        tiles.setTileAt(value, assets.tile`myTile1`)
    }
    for (let value2 of tiles.getTilesByType(assets.tile`snake0`)) {
        snakeSprite = sprites.create(assets.image`Marian0`, SpriteKind.Enemy)
        animation.runImageAnimation(
        snakeSprite,
        [img`
            . . 4 5 5 . . . 
            . . 5 . 4 5 5 . 
            . 5 . . 4 5 5 . 
            . 4 5 . . . . . 
            . . 4 5 5 5 5 . 
            . . . . . . 4 5 
            . . . . . . 4 5 
            . . 5 5 5 5 5 . 
            `,img`
            . . 4 5 5 . . . 
            . . 5 . 4 5 5 . 
            . 5 . . 4 5 5 . 
            . 4 5 . . . . . 
            . . 4 5 5 5 5 . 
            . . . . . . 4 5 
            . . . . . . 4 5 
            . . 5 5 5 5 5 . 
            `,img`
            . . 4 5 5 . . . 
            . . 5 . 4 5 5 . 
            . 5 . . 4 5 5 . 
            . 4 5 . . . . . 
            . . 4 5 5 5 . . 
            . . . . . 4 5 . 
            . . . . . 4 5 . 
            . 5 5 5 5 5 . . 
            `,img`
            . . 4 5 5 5 . . 
            . . 5 . . 4 5 5 
            . 4 5 . . 4 5 5 
            . 4 5 . . . . . 
            . . 4 5 5 . . . 
            . . . . 4 5 . . 
            . . . . 4 5 . . 
            5 5 5 5 5 . . . 
            `],
        111,
        true
        )
        tiles.placeOnTile(snakeSprite, value2)
        tiles.setTileAt(value2, assets.tile`myTile1`)
        snakeSprite.vx = snakeSpeed
    }
    for (let value2 of tiles.getTilesByType(assets.tile`life`)) {
        life_cost = textsprite.create(convertToText(life_cost_value), 0, 1)
        tiles.placeOnTile(life_cost, value2)
        life_cost.y += -8
    }
    for (let value2 of tiles.getTilesByType(assets.tile`gun`)) {
        life_cost = textsprite.create(convertToText(gun_cost_value), 0, 1)
        tiles.placeOnTile(life_cost, value2)
        life_cost.y += -8
    }
    for (let value2 of tiles.getTilesByType(assets.tile`bomb`)) {
        life_cost = textsprite.create(convertToText(bomb_cost_value), 0, 1)
        tiles.placeOnTile(life_cost, value2)
        life_cost.y += -8
    }
    for (let value2 of tiles.getTilesByType(assets.tile`rope`)) {
        life_cost = textsprite.create(convertToText(rope_cost_value), 0, 1)
        tiles.placeOnTile(life_cost, value2)
        life_cost.y += -8
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`shop0`, function (sprite, location) {
    załadujSklep(poziom)
})
function stwórzAnimacje () {
    marianIdzieWLewo = animation.createAnimation(ActionKind.Walking, 100)
    coinAnimation = animation.createAnimation(ActionKind.Walking, 100)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 3 3 3 . . . . . . . . . . . 
        . . 3 3 3 3 . . . . . . . . . . 
        . . 3 3 3 . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 3 3 3 . . . . . . . . . . . 
        . . 3 3 3 3 . . . . . . . . . . 
        . . 3 3 3 . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 3 3 3 . . . . . . . . . . . 
        . . 3 3 3 3 . . . . . . . . . . 
        . . 3 3 3 . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`spikes0`, function (sprite, location) {
	
})
info.onLifeZero(function () {
    game.gameOver(false)
})
function wGórę () {
    if (marian.isHittingTile(CollisionDirection.Bottom) || myCategory.isOnTop(marian, assets.tile`ladder0`)) {
        marian.vy = -100
    }
    if (myCategory.isOnTop(marian, assets.tile`ladder0`)) {
        marian.y += -1
        marian.x = marian.tilemapLocation().x
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite, effects.trail, 100)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
})
function clearLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroyAllSpritesOfKind(SpriteKind.Trap)
    scene.setBackgroundColor(15)
}
function załadujPoziom (poziom: number) {
    clearLevel()
    info.changeLifeBy(1)
    game.splash("Poziom", poziom)
    tiles.setCurrentTilemap(myCategory.randomLevel(poziom))
    setUpLevelObjects(poziom)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`exit0`, function (sprite, location) {
    poziom = poziom + 1
    załadujPoziom(poziom)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`life`, function (sprite, location) {
    if (info.score() >= life_cost_value) {
        info.changeScoreBy(0 - life_cost_value)
        info.changeLifeBy(1)
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        music.powerUp.play()
    } else {
        info.changeLifeBy(-1)
        music.powerDown.play()
    }
    pause(invincibilityPeriod)
})
let hittingSpikes = 0
let coinAnimation: animation.Animation = null
let marianIdzieWLewo: animation.Animation = null
let life_cost: TextSprite = null
let snakeSprite: Sprite = null
let coinSprite: Sprite = null
let spikesSprite: Sprite = null
let pozycjaStartowaMariana: tiles.Location = null
let snakeSpeed = 0
let mySprite = 0
let rope_cost_value = 0
let bomb_cost_value = 0
let gun_cost_value = 0
let life_cost_value = 0
let invincibilityPeriod = 0
let poziom = 0
let marianek: Image = null
let marian: Sprite = null
marianek = img`
    . . . . . . . . 
    . . . . . . . . 
    . . 1 1 5 5 . . 
    . 4 6 1 2 5 5 . 
    . 4 2 2 2 2 . . 
    . . 2 2 2 2 . . 
    . . 2 . . 2 . . 
    . . 2 . . 2 . . 
    `
poziom = 1
invincibilityPeriod = 1000
life_cost_value = 5
gun_cost_value = 15
bomb_cost_value = 10
rope_cost_value = 5
stwórzMariana()
stwórzAnimacje()
załadujPoziom(poziom)
game.setGameOverEffect(true, effects.confetti)
game.setGameOverMessage(true, "Brawo!")
info.setLife(2)
info.setScore(0)
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (myCategory.isAtTheRightEdge(value9)) {
            value9.vx = 0 - snakeSpeed
        } else if (myCategory.isAtTheLeftEdge(value9)) {
            value9.vx = snakeSpeed
        }
    }
})
game.onUpdate(function () {
    if (marian.vx < 0) {
        animation.setAction(marian, ActionKind.Walking)
    } else if (marian.vx > 0) {
        animation.setAction(marian, ActionKind.Walking)
    } else {
        animation.setAction(marian, ActionKind.Walking)
    }
    if (myCategory.isOnTop(marian, assets.tile`ladder0`)) {
        marian.ay = 0
        marian.vy = 0
    } else {
        marian.ay = 300
    }
    if (marian.tileKindAt(TileDirection.Bottom, assets.tile`myTile`)) {
        tiles.setTileAt(marian.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom), assets.tile`myTile2`)
        scene.cameraShake(2, 500)
        music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
    }
})
game.onUpdateInterval(1000, function () {
    for (let value32 of tiles.getTilesByType(assets.tile`myTile3`)) {
    	
    }
    for (let randomLevel2 of tiles.getTilesByType(assets.tile`myTile2`)) {
        tiles.setTileAt(randomLevel2, assets.tile`myTile3`)
    }
})
game.onUpdateInterval(10, function () {
    if (controller.up.isPressed() || controller.A.isPressed()) {
        wGórę()
    } else if (controller.down.isPressed()) {
        wDół()
    } else {
    	
    }
})
game.onUpdateInterval(500, function () {
    hittingSpikes = 0
})
