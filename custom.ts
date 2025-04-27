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

    //% block="is tile right below %sprite of type %tile"
    export function tileRightBelow(sprite: Sprite, tile: Image): Image {
        let spriteBottom = sprite.y + (sprite.height / 2)
        //let feetLocation = tiles.locationAtWorld(sprite.x, spriteBottom + 1)
        //return tiles.tileImageAtLocation(feetLocation)

        let col = Math.floor(sprite.x / 8)
        let row = Math.floor((spriteBottom + 1) / 8)

        let loc = tiles.getTileLocation(col, row)
        return tiles.tileAtLocationEquals(loc, tile)
    }

    //% block="random tile map %width by %height"
    export function randomTileMap(width: number = 2, height: number = 2) {
        // var hexWidth = width.toString(16);
        // var hexHeigth = height.toString(16);
        // const width_ = 30
        // const height_ = 24

        console.log('here ' + width + ' ' + height)
        const roomCollection = new Levelgen.RoomCollection();
        roomSets.forEach(roomSet => roomCollection.addRooms(roomSet));
        const [levelMap, path] = new Levelgen.LevelGenerator(width, height).generate();

        const level = new Levelgen.LevelAssembler().assemble(roomCollection, levelMap, path);
        //level.prettyPrint();
        //console.log(path);
        //printRawLevel(level.getWalled(), width);
        const walledLevel = level.getWalled();
        const map = walledLevel.level
        const height_ = walledLevel.height
        const width_ = walledLevel.width

        path.prettyPrint()
        // printRawLevel(walledLevel.level, walledLevel.width);

        //const room = rooms.slice()
        const i = image.create(width_, height_)
        i.fill(0)
        for (let y = 0; y < height_; y++) {
            for (let x = 0; x < width_; x++) {
                const index = y * width_ + x;
                let tile = map[index];
                switch(tile){
                    case Levelgen.Tiles.COIN:
                        if(Math.random() < 0.8) tile = Levelgen.Tiles.NOTHING;
                        break;
                    case Levelgen.Tiles.SPIKES:
                        if (Math.random() < 0.5) tile = Levelgen.Tiles.NOTHING;
                        break;
                    case Levelgen.Tiles.LADDER:
                    case Levelgen.Tiles.WALL:
                    case Levelgen.Tiles.END:
                    case Levelgen.Tiles.START:
                        break;
                    case Levelgen.Tiles.BRICK:
                        tile = Levelgen.Tiles.WALL
                        break;
                    default:
                        tile = Levelgen.Tiles.NOTHING
                }
                map[index] = tile
                if (Levelgen.isWalkableTileType(tile)) {
                    i.setPixel(x, y, 2)
                }
            }
        }


        const b = Buffer.fromArray([width_, 0, height_, 0].concat(map))
        return tiles.createTilemap(b, i, [myTiles.transparency16, myTiles.wall, myTiles.entrance, myTiles.exit, myTiles.coin, myTiles.ladder, myTiles.spikes], TileScale.Eight);
    }
}