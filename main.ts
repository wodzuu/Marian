enum ActionKind {
    Walking,
    Idle,
    Jumping,
    WalkingLeft,
    WalkingRight
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    wGórę()
})
function stwórzMariana () {
    marian = sprites.create(marianek, SpriteKind.Player)
    mySprite = 0
    scene.cameraFollowSprite(marian)
    controller.moveSprite(marian, 50, 0)
    marian.ay = 150
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    wGórę()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`coin0`, function (sprite, location) {
    info.changeScoreBy(1)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
function stwórzAnimacje () {
    marianIdzieWLewo = animation.createAnimation(ActionKind.Walking, 100)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`spikes0`, function (sprite, location) {
	
})
info.onLifeZero(function () {
    game.gameOver(false)
})
function wGórę () {
    if (marian.isHittingTile(CollisionDirection.Bottom)) {
        marian.vy = -100
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
    }
    if (marian.tileKindAt(TileDirection.Center, assets.tile`ladder0`)) {
        marian.y += -8
        marian.x = marian.tilemapLocation().x
    }
}
function załadujPoziom (poziom: number) {
    game.splash("Poziom", poziom)
    randomLevel = myCategory.randomTileMap(16, 16)
    scene.setBackgroundColor(15)
    tiles.setCurrentTilemap(randomLevel)
    pozycjaStartowaMariana = tiles.getTilesByType(assets.tile`entrance0`)[0]
    tiles.placeOnTile(marian, pozycjaStartowaMariana)
    tilesExtra.runTileAnimation(
    assets.tile`myTile7`,
    assets.animation`aniGrass0`,
    400,
    TileAnimationOrder.Random
    )
    tilesExtra.runTileAnimation(
    assets.tile`myTile4`,
    assets.animation`lava`,
    100,
    TileAnimationOrder.LoopAsync
    )
    tilesExtra.runTileAnimation(
    assets.tile`flowers`,
    assets.animation`flowersAni`,
    150,
    TileAnimationOrder.LoopAsync
    )
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`exit0`, function (sprite, location) {
    poziom = poziom + 1
    załadujPoziom(poziom)
})
let pozycjaStartowaMariana: tiles.Location = null
let randomLevel: tiles.TileMapData = null
let marianIdzieWLewo: animation.Animation = null
let mySprite = 0
let marian: Sprite = null
let poziom = 0
let marianek: Image = null
marianek = img`
    . . . . . . . . 
    . . 6 6 2 . . . 
    . d 6 6 2 2 . . 
    . . 6 6 2 2 . . 
    . . 2 2 2 2 . . 
    . . 2 2 2 2 . . 
    . . 2 2 2 2 . . 
    . . 4 . . 4 . . 
    `
poziom = 1
stwórzMariana()
załadujPoziom(poziom)
game.setGameOverEffect(true, effects.confetti)
game.setGameOverMessage(true, "Brawo!")
info.setLife(3)
info.setScore(0)
let hittingSpikes = 0
game.onUpdate(function () {
    if (marian.vx < 0) {
        animation.setAction(marian, ActionKind.Walking)
    } else if (marian.vx > 0) {
        animation.setAction(marian, ActionKind.Walking)
    } else {
        animation.setAction(marian, ActionKind.Walking)
    }
    if (marian.tileKindAt(TileDirection.Center, assets.tile`ladder0`)) {
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
    if (marian.tileKindAt(TileDirection.Bottom, assets.tile`spikes0`)) {
        if (hittingSpikes == 0 && marian.vy > 0) {
            info.changeLifeBy(-1)
            hittingSpikes = 1
            marian.vy = -80
        }
    }
})
game.onUpdateInterval(1000, function () {
    for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
        tiles.setWallAt(value, false)
        tiles.setTileAt(value, assets.tile`myTile1`)
    }
    for (let randomLevel2 of tiles.getTilesByType(assets.tile`myTile2`)) {
        tiles.setTileAt(randomLevel2, assets.tile`myTile3`)
    }
})
game.onUpdateInterval(500, function () {
    hittingSpikes = 0
})
