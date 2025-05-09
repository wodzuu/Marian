const rooms = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 5, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 5, 1,
    4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 6, 0, 7, 0, 0, 5, 1,
    0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 0, 0, 0, 0, 0, 4, 1, 0, 0, 1, 1, 1, 0, 0, 5, 4,
    1, 1, 0, 0, 0, 0, 7, 0, 0, 6, 1, 4, 0, 0, 0, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 0, 0, 1, 4, 1,
    1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 0, 1, 1,
    1, 1, 5, 0, 4, 0, 0, 0, 0, 0, 1, 1, 0, 0, 4, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 6, 0, 5, 0,
    4, 0, 5, 1, 1, 1, 6, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 5, 0,
    1, 1, 5, 0, 1, 1, 1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1,
    1, 1, 5, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4,
    1, 1, 5, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 7, 0, 4, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 0, 0, 1,
    1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 6, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
    1, 1, 4, 0, 0, 0, 0, 0, 6, 6, 1, 4, 0, 0, 0, 0, 4, 0, 6, 1, 1, 4, 4, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 4, 0, 0, 1, 1, 0, 4, 0, 0, 5, 0, 0, 4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    4, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 5, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0,
    1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
    1, 1, 0, 5, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 5, 1, 1, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
    1, 1, 6, 5, 0, 4, 0, 0, 0, 1, 4, 0, 5, 0, 7, 0, 0, 0, 0, 1, 6, 0, 0, 7, 6, 6, 1, 1, 6, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

const wallTiles = [1]
const coin = 4
const spikes = 6
const snake = 7

enum GameTiles {
    NOTHING = 0,
    WALL_1 = 1,
    START = 2,
    END = 3,
    COIN = 4,
    LADDER = 5,
    SPIKES = 6,
    SNAKE = 7,
    BRICK = 8,
    GROUND_A1 = 9,
    GROUND_A2 = 10,
    GROUND_A3 = 11,
    WALL_2 = 12,
    WALL_3 = 13,
    SHOP = 14,
    SHOP_GUN = 15,
    SHOP_BOMB = 16,
    SHOP_LIFE = 17,
    SHOP_ROPE = 18
}

const arcadeTiles = [
    myTiles.transparency16,
    myTiles.wall,
    myTiles.entrance,
    myTiles.exit,
    myTiles.coin,
    myTiles.ladder,
    myTiles.spikes,
    myTiles.snake, // snake
    myTiles.transparency16, // brick
    myTiles.groundA1,
    myTiles.groundA2,
    myTiles.groundA3,
    myTiles.wall2,
    myTiles.wall3,
    myTiles.shop,
    myTiles.tile12,
    myTiles.tile14,
    myTiles.tile15,
    myTiles.tile21
]


function isWalkableTileType(tile: GameTiles) {
    return tile === GameTiles.WALL_1 || tile === GameTiles.WALL_2 || tile === GameTiles.WALL_3 ||
           tile === GameTiles.BRICK || 
           tile === GameTiles.GROUND_A1 || tile === GameTiles.GROUND_A2 || tile === GameTiles.GROUND_A3
}

function random(array: any[]){
    return array[Math.floor(Math.random() * array.length)];
}

//% color=#FF5733 icon="\uf11b" weight=100
namespace myCategory {
    //% block="console log %value"
    export function logValue(value: any) {
        console.log(">" + value);
    }

    //% block="show number %num"
    export function showNumber(num: number) {
        console.log(num);
    }

    //% block="is the %sprite at left edge or in front of a left wall"
    export function isAtTheLeftEdge(sprite: Sprite): boolean {
        let spriteLeft = sprite.x - 1;
        let spriteBottom = sprite.y - (sprite.height / 2)

        let colLeft = Math.round(spriteLeft / 8) - 1
        let rowBelow = Math.round(spriteBottom / 8) + 1
        let row = Math.round(spriteBottom / 8)

        return !tiles.tileAtLocationIsWall(tiles.getTileLocation(colLeft, rowBelow)) || tiles.tileAtLocationIsWall(tiles.getTileLocation(colLeft, row))
    }

    //% block="is the %sprite at right edge or in front of a right wall"
    export function isAtTheRightEdge(sprite: Sprite): boolean {
        let spriteLeft = sprite.x - sprite.width
        let spriteBottom = sprite.y - (sprite.height / 2)

        let colRight = Math.round(spriteLeft / 8) + 1
        let rowBelow = Math.round(spriteBottom / 8) + 1
        let row = Math.round(spriteBottom / 8)

        return !tiles.tileAtLocationIsWall(tiles.getTileLocation(colRight, rowBelow)) || tiles.tileAtLocationIsWall(tiles.getTileLocation(colRight, row))
    }

    //% block="is the %sprite at tile edge or in front of a wall"
    export function isAtTheEdge(sprite: Sprite): boolean {
        let spriteLeft = sprite.x - (sprite.width / 2)
        // let spriteRight = sprite.x + (sprite.width / 2)
        let spriteBottom = sprite.y + (sprite.height / 2)

        let colLeft = Math.round(spriteLeft / 8) - 1
        let colRight = Math.round(spriteLeft / 8) + 1
        let rowBelow = Math.round(spriteBottom / 8) + 1
        let row = Math.round(spriteBottom / 8)
 
        return !tiles.tileAtLocationIsWall(tiles.getTileLocation(colLeft, rowBelow)) || !tiles.tileAtLocationIsWall(tiles.getTileLocation(colRight, rowBelow))
             || tiles.tileAtLocationIsWall(tiles.getTileLocation(colLeft, row)) || tiles.tileAtLocationIsWall(tiles.getTileLocation(colRight, row))
    }

    //% block="is tile right below %sprite of type %tile"
    export function isOver(sprite: Sprite, tile: Image): boolean {
        let spriteBottom = sprite.y + (sprite.height / 2)
        //let feetLocation = tiles.locationAtWorld(sprite.x, spriteBottom + 1)
        //return tiles.tileImageAtLocation(feetLocation)

        let col = Math.floor(sprite.x / 8)
        let row = Math.floor(spriteBottom / 8)

        let loc = tiles.getTileLocation(col, row)
        return tiles.tileAtLocationEquals(loc, tile)
    }

    //% block="is tile under or behind %sprite of type %tile"
    export function isOnTop(sprite: Sprite, tile: Image): boolean {
        let spriteBottom = sprite.y + (sprite.height / 2)
        //let feetLocation = tiles.locationAtWorld(sprite.x, spriteBottom + 1)
        //return tiles.tileImageAtLocation(feetLocation)

        let col = Math.floor(sprite.x / 8)
        let row = Math.floor(spriteBottom / 8)

        let loc = tiles.getTileLocation(col, row)
        return tiles.tileAtLocationEquals(loc, tile) || sprite.tileKindAt(TileDirection.Center, tile)
    }

    //% block="shop with %difficulty"
    export function shop(difficulty: number = 1) {
        const level = new Levelgen.Level(Levelgen.ROOM_WIDTH, Levelgen.ROOM_HEIGHT);
        level.set(0, 0, Levelgen.Tiles.START)
        level.set(Levelgen.ROOM_WIDTH - 1, Levelgen.ROOM_HEIGHT-1, Levelgen.Tiles.END)
        level.set(2, Levelgen.ROOM_HEIGHT - 3, Levelgen.Tiles.SHOP_LIFE)
        level.set(4, Levelgen.ROOM_HEIGHT - 3, Levelgen.Tiles.SHOP_BOMB)
        level.set(6, Levelgen.ROOM_HEIGHT - 3, Levelgen.Tiles.SHOP_ROPE)
        level.set(8, Levelgen.ROOM_HEIGHT - 3, Levelgen.Tiles.SHOP_GUN)
        return toTilemap(level.getWalled().getWalled().getWalled().getWalled(), 0, 0, 0);
    }

    //% block="is %sprite within taxi %distance from tile %location"
    export function isSpriteWithinTaxiDistanceFromLocation(sprite: Sprite, distance: number, location: tiles.Location): boolean {
        let centerX = location.column * 8 + 4;
        let centerY = location.row * 8 + 4;
        return Math.abs(sprite.x-centerX) < (distance * 8) && Math.abs(sprite.y-centerY) < (distance * 8);
    }

    //% block="random level with %difficulty"
    export function randomLevel(difficulty: number = 1) {
        let width = difficulty <= 3 ? 2 : 3
        let height = difficulty <= 2 ? 2 : 3
        let snakeChance = Math.min(1.0, difficulty / 20 + 0.1);
        let spikeChance = Math.min(1.0, difficulty / 5 + 0.1);
        let coinChance = Math.min(0.5, difficulty / 20 + 0.3);

        const roomCollection = new Levelgen.RoomCollection();
        roomSets.forEach(roomSet => roomCollection.addRooms(roomSet));
        const [levelMap, path] = new Levelgen.LevelGenerator(width, height).generate();

        const level = new Levelgen.LevelAssembler().assemble(roomCollection, levelMap, path);
        return toTilemap(level, coinChance, spikeChance, snakeChance);
    }

    function toTilemap(level: Levelgen.Level, coinChance: number, spikeChance: number, snakeChance: number) {
        const walledLevel = level.getWalled();
        const map = walledLevel.getRaw()
        const height_ = walledLevel.height
        const width_ = walledLevel.width

        const i = image.create(width_, height_)
        i.fill(0)

        for (let y = 0; y < height_; y++) {
            for (let x = 0; x < width_; x++) {
                const index = y * width_ + x;
                let tile = map[index];
                switch (tile) {
                    case Levelgen.Tiles.COIN:
                        tile = Math.random() < coinChance ? GameTiles.COIN : tile = GameTiles.NOTHING;
                        break;
                    case Levelgen.Tiles.SPIKES:
                        if (y < height_ - 1 && Levelgen.isWalkableTileType(walledLevel.get(x, y + 1))) {
                            tile = Math.random() < spikeChance ? GameTiles.SPIKES : GameTiles.NOTHING
                        } else {
                            tile = GameTiles.NOTHING;
                        }
                        break;
                    case Levelgen.Tiles.LADDER:
                        tile = GameTiles.LADDER;
                        break;
                    case Levelgen.Tiles.WALL:
                        if (y > 0 && !Levelgen.isWalkableTileType(walledLevel.get(x, y - 1))) {
                            tile = random([GameTiles.GROUND_A1, GameTiles.GROUND_A2, GameTiles.GROUND_A3]);
                        } else {
                            tile = random([GameTiles.WALL_1, GameTiles.WALL_2, GameTiles.WALL_3]);
                        }
                        break;
                    case Levelgen.Tiles.END:
                        tile = GameTiles.END;
                        break;
                    case Levelgen.Tiles.START:
                        tile = GameTiles.START;
                        break;
                    case Levelgen.Tiles.BRICK:
                        tile = random([GameTiles.WALL_1, GameTiles.WALL_2, GameTiles.WALL_3]);
                        break;
                    case Levelgen.Tiles.SNAKE:
                        tile = Math.random() < snakeChance ? GameTiles.SNAKE : GameTiles.NOTHING;
                        break;
                    case Levelgen.Tiles.SHOP:
                        tile = GameTiles.SHOP
                        break;
                    case Levelgen.Tiles.SHOP_GUN:
                        tile = GameTiles.SHOP_GUN
                        break;
                    case Levelgen.Tiles.SHOP_LIFE:
                        tile = GameTiles.SHOP_LIFE
                        break;
                    case Levelgen.Tiles.SHOP_ROPE:
                        tile = GameTiles.SHOP_ROPE
                        break;
                    case Levelgen.Tiles.SHOP_BOMB:
                        tile = GameTiles.SHOP_BOMB
                        break;
                    default:
                        tile = GameTiles.NOTHING
                }
                map[index] = tile
                if (isWalkableTileType(tile)) {
                    i.setPixel(x, y, 2)
                }
            }
        }


        const b = Buffer.fromArray([width_, 0, height_, 0].concat(map))
        return tiles.createTilemap(b, i, arcadeTiles, TileScale.Eight);
    }
}