const Direction = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right"
};
const RoomType = {
    // TOP: "top",
    // BOTTOM: "bottom",
    // LEFT: "left",
    // RIGHT: "right",
    TOP_LEFT: "╝",
    TOP_RIGHT: "╚",
    BOTTOM_LEFT: "╗",
    BOTTOM_RIGHT: "╔",
    TOP_BOTTOM: "║",
    LEFT_RIGHT: "═",
    TOP_LEFT_RIGHT: "╩",
    BOTTOM_LEFT_RIGHT: "╦",
    LEFT_TOP_BOTTOM: "╣",
    RIGHT_TOP_BOTTOM: "╠",
    ALL: "╬"
}
const RoomCompatibility = {
    ALL: [RoomType.TOP_LEFT, RoomType.TOP_RIGHT, RoomType.BOTTOM_LEFT, RoomType.BOTTOM_RIGHT, RoomType.TOP_BOTTOM, RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
    TOP: [RoomType.TOP_LEFT, RoomType.TOP_RIGHT, RoomType.TOP_BOTTOM, RoomType.TOP_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
    BOTTOM: [RoomType.BOTTOM_LEFT, RoomType.BOTTOM_RIGHT, RoomType.TOP_BOTTOM, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
    LEFT: [RoomType.TOP_LEFT, RoomType.BOTTOM_LEFT, RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.ALL],
    RIGHT: [RoomType.TOP_RIGHT, RoomType.BOTTOM_RIGHT, RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
    TOP_LEFT: [RoomType.TOP_LEFT, RoomType.TOP_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.ALL],
    TOP_RIGHT: [RoomType.TOP_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
    BOTTOM_LEFT: [RoomType.BOTTOM_LEFT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.LEFT_TOP_BOTTOM, RoomType.ALL],
    BOTTOM_RIGHT: [RoomType.BOTTOM_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
    TOP_BOTTOM: [RoomType.TOP_BOTTOM, RoomType.LEFT_TOP_BOTTOM, RoomType.RIGHT_TOP_BOTTOM, RoomType.ALL],
    LEFT_RIGHT: [RoomType.LEFT_RIGHT, RoomType.TOP_LEFT_RIGHT, RoomType.BOTTOM_LEFT_RIGHT, RoomType.ALL]
}

const RoomCategory = {
    PATH: "P",
    START: "S",
    EXIT: "E",
    OTHER: "O"
}

const roomSets = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 5, 1,
        4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 6, 0, 7, 0, 0, 5, 1,
        0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 0, 0, 0, 0, 0, 4, 1, 0, 0, 1, 1, 1, 0, 0, 5, 4,
        1, 1, 0, 0, 0, 0, 7, 0, 0, 6, 1, 4, 0, 0, 0, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 0, 0, 1, 4, 1,
        1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 0, 1, 1,
        1, 1, 5, 0, 4, 0, 0, 0, 0, 0, 1, 1, 0, 0, 4, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 6, 0, 5, 0,
        4, 0, 5, 1, 1, 1, 6, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 5, 0,
        1, 1, 5, 0, 1, 1, 1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1,
        1, 1, 5, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4,
        1, 1, 5, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 7, 0, 4, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 0, 0, 1,
        1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 6, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1,
        1, 1, 4, 0, 0, 0, 0, 0, 6, 6, 1, 4, 0, 0, 0, 0, 4, 0, 6, 1, 1, 1, 4, 4, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 4, 0, 0, 1, 1, 0, 4, 0, 0, 5, 0, 0, 4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        4, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 5, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0,
        1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        1, 1, 0, 5, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 5, 1, 1, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
        1, 1, 6, 5, 0, 4, 0, 0, 0, 1, 4, 0, 5, 0, 7, 0, 0, 0, 0, 1, 6, 0, 0, 7, 6, 6, 1, 1, 6, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

const Tiles = {
    WALL: 1,
    START: 2,
    END: 3,
    COIN: 4,
    LADDER: 5,
    SPIKE: 6,
    SNAKE: 7,
    BRICK: 8
}

const ROOM_WIDTH = 10
const ROOM_HEIGHT = 8

function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

function printRoom(room) {
    console.log('room')
    for (let y = 0; y < ROOM_HEIGHT; y++) {
        let line = []
        for (let x = 0; x < ROOM_WIDTH; x++) {
            line.push(room[y * ROOM_WIDTH + x])
        }
        console.log(line.join(''))
    }
}

class Path {
    constructor(fromX, fromY) {
        this.steps = [[fromX, fromY, '!']]
    }

    addStep(x, y) {
        this.steps.push([x, y, '?'])
    }

    setCurrentRoomType(type) {
        this.steps[this.steps.length - 1][2] = type
    }

    forEachStep(callback) {
        this.steps.forEach(([x, y, roomType]) => callback(x, y));
    }

    getRoomTypeAt(x, y) {
        for (let i = 0; i < this.steps.length; i++) {
            if (x === this.steps[i][0] && y === this.steps[i][1]) {
                return this.steps[i][2];
            }
        }
    }

    isEndRoom(x, y) {
        return this.steps[this.steps.length - 1][0] === x && this.steps[this.steps.length - 1][1] === y;
    }

    isStartRoom(x, y) {
        return this.steps[0][0] === x && this.steps[0][1] === y;
    }
}

class LevelGenerator {
    constructor(width = 4, height = 4, rooms = {}) {
        this.width = width;
        this.height = height;
    }

    generatePath() {
        let x = Math.floor(Math.random() * this.width);
        let y = 0;
        let path = new Path(x, y)

        let visited = new Set([`${x},${y}`]);
        let prevDirection = null;
        let type = "?"

        while (y < this.height) {
            let directions = [];
            if (x > 0 && !visited.has(`${x - 1},${y}`)) directions.push([-1, 0]); // Left
            if (x < this.width - 1 && !visited.has(`${x + 1},${y}`)) directions.push([1, 0]); // Right
            directions.push([0, 1]); // Down (always possible)

            let [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
            if (dy === 1 && y === this.height - 1) break; // skip last down move
            x += dx;
            y += dy;
            visited.add(`${x},${y}`);

            if (!prevDirection) {
                if (dy === 1) path.setCurrentRoomType(this.randomRoomType(RoomCompatibility.BOTTOM));
                else if (dx === 1) path.setCurrentRoomType(this.randomRoomType(RoomCompatibility.RIGHT));
                else path.setCurrentRoomType(this.randomRoomType(RoomCompatibility.LEFT));
            } else {
                let [px, py] = prevDirection;
                if (py === 0) {
                    if (dy === 1 && px === 1) type = this.randomRoomType(RoomCompatibility.BOTTOM_LEFT);
                    else if (dy === 1 && px === -1) type = this.randomRoomType(RoomCompatibility.BOTTOM_RIGHT);
                    else type = this.randomRoomType(RoomCompatibility.LEFT_RIGHT);
                } else {
                    if (dx === 1) type = this.randomRoomType(RoomCompatibility.TOP_RIGHT);
                    else if (dx === -1) type = this.randomRoomType(RoomCompatibility.TOP_LEFT);
                    else type = this.randomRoomType(RoomCompatibility.TOP_BOTTOM);
                }

                path.setCurrentRoomType(type);
            }

            path.addStep(x, y)
            prevDirection = [dx, dy];
        }

        let [px, py] = prevDirection;
        if (py === 1) path.setCurrentRoomType(this.randomRoomType(RoomCompatibility.TOP));
        else if (px === 1) path.setCurrentRoomType(this.randomRoomType(RoomCompatibility.LEFT));
        else path.setCurrentRoomType(this.randomRoomType(RoomCompatibility.RIGHT));

        return path;
    }

    randomRoomType(roomTypes = RoomCompatibility.ALL) {
        return roomTypes[Math.floor(Math.random() * roomTypes.length)];
    }

    generate() {
        const roomGrid = Array.from({length: this.width}, () => Array.from({length: this.height}, () => this.randomRoomType()));
        let path = this.generatePath();
        path.forEachStep((x, y) => {
            roomGrid[x][y] = path.getRoomTypeAt(x, y);
        });
        return [roomGrid, path];
    }
}

class RoomCollection {
    constructor() {
        this.roomsX = 3
        this.roomsY = 3;
        this.roomTypeMappings = {}
    }

    getRandomRoomOfType(roomType) {
        var rooms = this.roomTypeMappings[roomType];
        if (rooms) {
            return rooms[Math.floor(Math.random() * rooms.length)];
        }
        console.log("Could not find room of type: " + roomType)
        console.log("-----------")
        console.log(this.roomTypeMappings)
        console.log("-----------")

    }

    addRoomType(room) {
        const roomType = room.type
        if (!this.roomTypeMappings[roomType]) {
            this.roomTypeMappings[roomType] = [];
        }
        this.roomTypeMappings[roomType].push(room);
    }

    extractRoom(chunks, x, y) {
        let skip = y * this.roomsX * ROOM_HEIGHT + x // TODO this could be pre-defined for 3x3 input
        let room = []
        for (let i = 0; i < ROOM_HEIGHT; i++) {
            room.push(chunks[skip + i * 3])
        }
        //console.log(room)
        return room.flat()
    }

    addRooms(roomSet) {
        var chunks = chunkArray(roomSet, ROOM_WIDTH)

        for (let y = 0; y < this.roomsY; y++) {
            for (let x = 0; x < this.roomsX; x++) {
                const roomTiles = this.extractRoom(chunks, x, y);
                const room = new Room(roomTiles)
                this.addRoomType(room)
                if (room.canBeMirrored()) {
                    this.addRoomType(room.mirrorCopy())
                }
            }
        }
    }
}

class LevelAssembler {
    constructor() {
    }

    printMap(roomGrid) {
        let height = roomGrid[0].length
        let width = roomGrid.length
        for (let y = 0; y < height; y++) {
            let line = []
            for (let x = 0; x < width; x++) {
                line.push(roomGrid[x][y])
            }
            console.log(line.join(''))
        }
    }

    assemble(roomCollection, levelMap, path) {
        let height = levelMap[0].length
        let width = levelMap.length
        let levelWidth = width * ROOM_WIDTH;
        let levelHeight = height * ROOM_HEIGHT;
        let level = new Level(levelWidth, levelHeight)

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let roomType = levelMap[x][y]
                let room = roomCollection.getRandomRoomOfType(roomType)
                if (path.isStartRoom(x, y)) {
                    room.setRoomCategory(RoomCategory.START)
                }
                if (path.isEndRoom(x, y)) {
                    room.setRoomCategory(RoomCategory.EXIT)
                }
                level.setRoom(room, x, y)
            }
        }
        return level
    }


}

class Room {
    constructor(tiles) {
        this.tiles = tiles;
        this.type = this.checkRoomType();
    }

    tileTypeAt(x, y) {
        return this.tiles[x + y * ROOM_WIDTH]
    }

    setRoomCategory(category) {
        let tile = Tiles.WALL
        switch (category) {
            case RoomCategory.START:
                tile = Tiles.START
                break
            case RoomCategory.EXIT:
                tile = Tiles.END;
                break;
        }

        let candidates = []
        this.tiles.forEach((block, index) => {
            if (block === Tiles.COIN) {
                candidates.push(index)
            }
        })
        this.tiles[candidates[Math.floor(Math.random() * candidates.length)]] = tile
    }

    checkRoomType() {
        let doors = 0
        // top
        if (this.tileTypeAt(4, 0) !== Tiles.WALL && this.tileTypeAt(5, 0) !== Tiles.WALL) doors += 1
        if (this.tileTypeAt(4, ROOM_HEIGHT - 1) !== Tiles.WALL && this.tileTypeAt(5, ROOM_HEIGHT - 1) !== Tiles.WALL) doors += 2
        if (this.tileTypeAt(0, 2) !== Tiles.WALL && this.tileTypeAt(0, 3) !== Tiles.WALL && this.tileTypeAt(0, 4) !== Tiles.WALL && this.tileTypeAt(0, 5) !== Tiles.WALL) doors += 4
        if (this.tileTypeAt(ROOM_WIDTH - 1, 2) !== Tiles.WALL && this.tileTypeAt(ROOM_WIDTH - 1, 3) !== Tiles.WALL && this.tileTypeAt(ROOM_WIDTH - 1, 4) !== Tiles.WALL && this.tileTypeAt(ROOM_WIDTH - 1, 5) !== Tiles.WALL) doors += 8
        switch (doors) {
            case 0:
            case 1:
            case 2:
            case 4:
            case 8:
                console.log("invalid room door configuration detected: " + doors)
                return null
            case 3:
                return RoomType.TOP_BOTTOM
            case 5:
                return RoomType.TOP_LEFT
            case 6:
                return RoomType.BOTTOM_LEFT
            case 7:
                return RoomType.LEFT_TOP_BOTTOM
            case 9:
                return RoomType.TOP_RIGHT
            case 10:
                return RoomType.BOTTOM_RIGHT
            case 11:
                return RoomType.RIGHT_TOP_BOTTOM
            case 12:
                return RoomType.LEFT_RIGHT
            case 13:
                return RoomType.TOP_LEFT_RIGHT
            case 14:
                return RoomType.BOTTOM_LEFT_RIGHT
            case 15:
                return RoomType.ALL
        }
    }

    mirrorCopy() {
        let mirroredRoom = []
        for (let y = 0; y < ROOM_HEIGHT; y++) {
            for (let x = 0; x < ROOM_WIDTH; x++) {
                mirroredRoom.push(this.tiles[(ROOM_WIDTH - x - 1) + (y * ROOM_WIDTH)])
            }
        }
        return new Room(mirroredRoom)
    }

    canBeMirrored() {
        let result = RoomCompatibility.LEFT_RIGHT.indexOf(this.type) < 0 && (RoomCompatibility.LEFT.indexOf(this.type) >= 0 || RoomCompatibility.RIGHT.indexOf(this.type) >= 0);
        //console.log('can be mirrored', this.type, result)
        return result;
    }
}

class Level {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.level = Array.from({length: width * height}, () => 0);
    }

    prettyPrint() {
        console.log('level')
        for (let y = 0; y < this.height; y++) {
            let line = []
            for (let x = 0; x < this.width; x++) {
                line.push(this.level[y * this.width + x])
                if (x % ROOM_WIDTH === 9) {
                    line.push(' ')
                }
            }
            console.log(line.join(''))
            if (y % ROOM_HEIGHT === 7) {
                console.log('')
            }
        }
    }

    setRoom(room, roomPosX, roomPosY) {
        let posX = roomPosX * ROOM_WIDTH
        let posY = roomPosY * ROOM_HEIGHT
        for (let y = 0; y < ROOM_HEIGHT; y++) {
            for (let x = 0; x < ROOM_WIDTH; x++) {
                if (room === undefined) {
                    console.log('room is undefined')
                    return
                }
                this.level[(posX + x) + (posY + y) * this.width] = room.tileTypeAt(x, y)
            }
        }
    }

    getWalled() {
        let result = Array.from({length: (this.width + 2) * (this.height + 2)}, () => 0);
        for (let y = -1; y <= this.height; y++) {
            for (let x = -1; x <= this.width; x++) {
                if (y === -1 || y === this.height) {
                    result[x + 1 + (y + 1) * (this.width + 2)] = Tiles.BRICK
                } else if (x === -1 || x === this.width) {
                    result[x + 1 + (y + 1) * (this.width + 2)] = Tiles.BRICK
                } else {
                    result[(x + 1) + (y + 1) * (this.width + 2)] = this.level[x + y * this.width]
                }
            }
        }
        return result;
    }
}

function printRawLevel(tiles, width) {
    width = width * ROOM_WIDTH + 2
    let height = tiles.length / width
    for (let y = 0; y < height; y++) {
        let line = []
        for (let x = 0; x < width; x++) {
            line.push(tiles[x + y * width])
        }
        console.log(line.join(''))
    }
}

let roomCollection = new RoomCollection();
roomSets.forEach(roomSet => roomCollection.addRooms(roomSet))

let width = 2
let height = 2
let [levelMap, path] = new LevelGenerator(width, height).generate()

let level = new LevelAssembler().assemble(roomCollection, levelMap, path)
level.prettyPrint()
console.log(path)
printRawLevel(level.getWalled(), width)

// console.log(level.generate().map(row => row.join('')).join('\n'));
