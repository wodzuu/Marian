enum ActionKind {
    Walking,
    Idle,
    Jumping,
    WalkingLeft,
    WalkingRight
}
namespace SpriteKind {
    export const Trap = SpriteKind.create()
    export const Bomb = SpriteKind.create()
    export const UI = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Trap, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        changeLife(-1)
        music.powerDown.play()
    }
    pause(invincibilityPeriod)
})
function buildStatusBar () {
    statusBarImage = image.create(scene.screenWidth(), 12)
    statusBarSprite = sprites.create(statusBarImage, SpriteKind.UI)
    statusBarSprite.setPosition(scene.screenWidth() / 2, 6)
    makeUISprite(statusBarSprite)
    coinSprite = sprites.create(assets.image`Marian0`, SpriteKind.UI)
    coinSprite.setPosition(scene.screenWidth() / 1.4, 5)
    makeUISprite(coinSprite)
    pointsTextBarSprite = textsprite.create("", 0, 1)
    pointsTextBarSprite.setPosition(coinSprite.x + 8, 5)
    makeUISprite(pointsTextBarSprite)
    heartSprite = sprites.create(img`
        . 2 2 . . 2 2 . 
        2 2 2 2 . 2 2 2 
        2 2 2 2 2 2 2 2 
        3 2 2 2 2 2 2 2 
        . 2 2 2 2 2 2 . 
        . 3 2 2 2 2 3 . 
        . . 2 2 2 2 . . 
        . . . 2 2 . . . 
        `, SpriteKind.UI)
    heartSprite.setPosition(pointsTextBarSprite.x + 16, 5)
    makeUISprite(heartSprite)
    lifeTextBarSprite = textsprite.create("", 0, 1)
    lifeTextBarSprite.setPosition(heartSprite.x + 8, 5)
    makeUISprite(lifeTextBarSprite)
    updateStatusBar()
}
function stwórzMariana () {
    marian = sprites.create(marianek, SpriteKind.Player)
    mySprite = 0
    scene.cameraFollowSprite(marian)
    controller.moveSprite(marian, 50, 0)
    marian.ay = 150
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    rzućLinę()
})
function makeUISprite (sprite: Sprite) {
    sprite.setFlag(SpriteFlag.RelativeToCamera, true)
    sprite.setFlag(SpriteFlag.Ghost, true)
    sprite.setKind(SpriteKind.UI)
    sprite.z = 1000
}
function załadujSklep (poziom: number) {
    clearLevel()
    tiles.setCurrentTilemap(myCategory.shop(poziom))
    setUpLevelObjects(poziom)
}
function wDół () {
    if (myCategory.isOnTopClimbable(marian)) {
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
    for (let value22 of tiles.getTilesByType(assets.tile`life`)) {
        life_cost = textsprite.create(convertToText(life_cost_value), 0, 1)
        tiles.placeOnTile(life_cost, value22)
        life_cost.y += -8
    }
    for (let value23 of tiles.getTilesByType(assets.tile`gun`)) {
        life_cost = textsprite.create(convertToText(gun_cost_value), 0, 1)
        tiles.placeOnTile(life_cost, value23)
        life_cost.y += -8
    }
    for (let value24 of tiles.getTilesByType(assets.tile`bomb`)) {
        life_cost = textsprite.create(convertToText(bomb_cost_value), 0, 1)
        tiles.placeOnTile(life_cost, value24)
        life_cost.y += -8
    }
    for (let value25 of tiles.getTilesByType(assets.tile`rope`)) {
        life_cost = textsprite.create(convertToText(rope_cost_value), 0, 1)
        tiles.placeOnTile(life_cost, value25)
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
function updateStatusBar () {
    lifeTextBarSprite.setText(convertToText(life))
    pointsTextBarSprite.setText(convertToText(points))
}
function rzućLinę () {
    if (tiles.tileAtLocationEquals(marian.tilemapLocation(), assets.tile`myTile1`)) {
        tiles.setTileAt(marian.tilemapLocation(), assets.tile`rope0`)
    }
}
function changePoints (diff: number) {
    points = points + diff
    updateStatusBar()
}
function wGórę () {
    if (marian.isHittingTile(CollisionDirection.Bottom) || myCategory.isOnTopClimbable(marian)) {
        marian.vy = -100
    }
    if (myCategory.isOnTopClimbable(marian)) {
        marian.y += -1
        marian.x = marian.tilemapLocation().x
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    changePoints(1)
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
    game.splash("Poziom", poziom)
    tiles.setCurrentTilemap(myCategory.randomLevel(poziom))
    setUpLevelObjects(poziom)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`exit0`, function (sprite, location) {
    poziom = poziom + 1
    załadujPoziom(poziom)
})
function changeLife (diff: number) {
    life = life + diff
    updateStatusBar()
}
function boom (location: tiles.Location) {
    for (let y = 0; y <= 2; y++) {
        for (let x = 0; x <= 2; x++) {
            tiles.setTileAt(tiles.getTileLocation(location.column - 1 + x, location.row - 1 + y), assets.tile`myTile1`)
            tiles.setWallAt(tiles.getTileLocation(location.column - 1 + x, location.row - 1 + y), false)
        }
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Trap)) {
        if (myCategory.isSpriteWithinTaxiDistanceFromLocation(value4, 1.5, location)) {
            sprites.destroy(value4)
        }
    }
    for (let value5 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (myCategory.isSpriteWithinTaxiDistanceFromLocation(value5, 1.5, location)) {
            sprites.destroy(value5)
        }
    }
    for (let value6 of sprites.allOfKind(SpriteKind.Player)) {
        if (myCategory.isSpriteWithinTaxiDistanceFromLocation(value6, 1.5, location)) {
            info.changeLifeBy(-1)
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`life`, function (sprite, location) {
    if (points >= life_cost_value) {
        changeLife(1)
        changePoints(0 - life_cost_value)
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        music.powerUp.play()
    } else {
        changeLife(-1)
        music.powerDown.play()
    }
    pause(invincibilityPeriod)
})
function rzućBombę () {
    if (sprites.allOfKind(SpriteKind.Bomb).length == 0) {
        bomba = sprites.create(img`
            . . . . . . . . 
            . b b . . . . . 
            . . b 6 6 6 . . 
            . 6 6 6 1 1 6 . 
            . 6 6 6 6 1 6 . 
            . 6 6 6 6 6 6 . 
            . 6 6 6 6 6 6 . 
            . . 6 6 6 6 . . 
            `, SpriteKind.Bomb)
        bomba.ay = 100
        bomba.setPosition(marian.x, marian.y)
        animation.runImageAnimation(
        bomba,
        [img`
            . . . . . . . . 
            . a a . . . . . 
            . . a 6 6 6 . . 
            . 6 6 6 1 1 6 . 
            . 6 6 6 6 1 6 . 
            . 6 6 6 6 6 6 . 
            . 6 6 6 6 6 6 . 
            . . 6 6 6 6 . . 
            `,img`
            . . . . . . . . 
            . a a . . . . . 
            . . a 3 3 3 . . 
            . 3 3 3 1 1 3 . 
            . 3 3 3 3 1 3 . 
            . 3 3 3 3 3 3 . 
            . 3 3 3 3 3 3 . 
            . . 3 3 3 3 . . 
            `],
        500,
        true
        )
        pause(3000)
        bomba.sayText("boom")
        boom(bomba.tilemapLocation())
        sprites.destroy(bomba, effects.fire, 500)
    }
}
let hittingSpikes = 0
let bomba: Sprite = null
let coinAnimation: animation.Animation = null
let marianIdzieWLewo: animation.Animation = null
let life_cost: TextSprite = null
let snakeSprite: Sprite = null
let spikesSprite: Sprite = null
let pozycjaStartowaMariana: tiles.Location = null
let snakeSpeed = 0
let mySprite = 0
let lifeTextBarSprite: TextSprite = null
let heartSprite: Sprite = null
let pointsTextBarSprite: TextSprite = null
let coinSprite: Sprite = null
let statusBarSprite: Sprite = null
let statusBarImage: Image = null
let life = 0
let points = 0
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
points = 0
life = 2
buildStatusBar()
game.onUpdate(function () {
    if (marian.vx < 0) {
        animation.setAction(marian, ActionKind.Walking)
    } else if (marian.vx > 0) {
        animation.setAction(marian, ActionKind.Walking)
    } else {
        animation.setAction(marian, ActionKind.Walking)
    }
    if (myCategory.isOnTopClimbable(marian)) {
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
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (myCategory.isAtTheRightEdge(value9)) {
            value9.vx = 0 - snakeSpeed
        } else if (myCategory.isAtTheLeftEdge(value9)) {
            value9.vx = snakeSpeed
        }
    }
    if (life <= 0) {
        game.gameOver(false)
    }
})
game.onUpdateInterval(25, function () {
    for (let value of tiles.getTilesByType(assets.tile`rope0`)) {
        if (tiles.tileAtLocationEquals(value.getNeighboringLocation(CollisionDirection.Top), assets.tile`myTile1`)) {
            tiles.setTileAt(value.getNeighboringLocation(CollisionDirection.Top), assets.tile`rope0`)
        }
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
    if (controller.B.isPressed()) {
    	
    }
})
game.onUpdateInterval(500, function () {
    hittingSpikes = 0
})
