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

function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

class LevelGenerator {
    constructor(width = 4, height = 4, rooms = {}) {
        this.width = width;
        this.height = height;
        this.roomWidth = 10;
        this.roomHeight = 8;
    }

    generatePath() {
        let x = Math.floor(Math.random() * this.width);
        let y = 0;
        let path = [[x, y, '!']];

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
                let first = path.pop();
                if (dy === 1) first[2] = this.randomRoomType(RoomCompatibility.BOTTOM);
                else if (dx === 1) first[2] = this.randomRoomType(RoomCompatibility.RIGHT);
                else first[2] = this.randomRoomType(RoomCompatibility.LEFT);
                path.push(first);
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

                path[path.length - 1][2] = type;
            }

            path.push([x, y, '?']);
            prevDirection = [dx, dy];
        }

        let [px, py] = prevDirection;
        let last = path.pop();
        if (py === 1) last[2] = this.randomRoomType(RoomCompatibility.TOP);
        else if (px === 1) last[2] = this.randomRoomType(RoomCompatibility.LEFT);
        else last[2] = this.randomRoomType(RoomCompatibility.RIGHT);
        path.push(last);

        return path;
    }

    randomRoomType(roomTypes = RoomCompatibility.ALL) {
        return roomTypes[Math.floor(Math.random() * roomTypes.length)];
    }

    generate() {
        const roomGrid = Array.from({length: this.width}, () => Array.from({length: this.height}, () => this.randomRoomType()));
        let path = this.generatePath();
        path.forEach(([x, y, roomType]) => {
            roomGrid[x][y] = roomType;
        });
        return [roomGrid, path];
    }
}

class RoomCollection {
    constructor() {
        this.roomWidth = 10;
        this.roomHeight = 8;
        this.roomsX = 3
        this.roomsY = 3;
        this.roomTypeMappings = {}
    }

    getRandomRoomOfType(roomType) {
        var rooms = this.roomTypeMappings[roomType];
        if (rooms) {
            return rooms[Math.floor(Math.random() * rooms.length)];
        }
    }

    addRoomType(roomType, room) {
        if (!this.roomTypeMappings[roomType]) {
            this.roomTypeMappings[roomType] = [];
        }
        this.roomTypeMappings[roomType].push(room);
    }

    extractRoom(chunks, x, y) {
        let skip = y * this.roomsX * this.roomHeight + x // TODO this could be pre-defined for 3x3 input
        let room = []
        for (let i = 0; i < this.roomHeight; i++) {
            room.push(chunks[skip + i * 3])
        }
        //console.log(room)
        return room
    }


    checkRoomType(roomYX) {
        let doors = 0
        // top
        if (roomYX[0][4] !== 1 && roomYX[0][5] !== 1) doors += 1
        if (roomYX[this.roomHeight - 1][4] !== 1 && roomYX[this.roomHeight - 1][5] !== 1) doors += 2
        if (roomYX[2][0] !== 1 && roomYX[3][0] !== 1 && roomYX[4][0] !== 1 && roomYX[5][0] !== 1) doors += 4
        if (roomYX[2][this.roomWidth - 1] !== 1 && roomYX[3][this.roomWidth - 1] !== 1 && roomYX[4][this.roomWidth - 1] !== 1 && roomYX[5][this.roomWidth - 1] !== 1) doors += 8
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

    mirror(room) {
        let mirroredRoom = []
        for (let i = 0; i < room.length; i++) {
            mirroredRoom.push(room[i].slice().reverse())
        }
        return mirroredRoom
    }

    addRooms(roomSet) {
        var chunks = chunkArray(roomSet, this.roomWidth)

        for (let y = 0; y < this.roomsY; y++) {
            for (let x = 0; x < this.roomsX; x++) {
                const roomYX = this.extractRoom(chunks, x, y);
                const roomType = this.checkRoomType(roomYX);
                this.addRoomType(roomType, roomYX.flat())
                if (this.canBeMirrored(roomType)) {
                    const additionalRoomYX = this.mirror(roomYX)
                    const additionalRoomType = this.checkRoomType(additionalRoomYX);
                    this.addRoomType(additionalRoomType, additionalRoomYX.flat())
                }
            }
        }
    }

    canBeMirrored(roomType) {
        return RoomCompatibility.LEFT_RIGHT.indexOf(roomType) < 0 && (RoomCompatibility.LEFT.indexOf(roomType) >= 0 || RoomCompatibility.RIGHT.indexOf(roomType) >= 0);
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

    printLevel(level, width, height) {
        console.log('level')
        for (let y = 0; y < height; y++) {
            let line = []
            for (let x = 0; x < width; x++) {
                line.push(level[y * width + x])
                if (x % 10 === 9) {
                    line.push(' ')
                }
            }
            console.log(line.join(''))
            if (y % 8 === 7) {
                console.log('')
            }
        }
    }

    paintOver(level, levelWidth, room, posX, posY, width, height) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let block = room[y * width + x]
                level[(posX + x) + (posY + y) * levelWidth] = block
            }
        }
    }

    assemble(roomCollection, levelMap, path) {
        let height = levelMap[0].length
        let width = levelMap.length
        let levelWidth = width * 10;
        let levelHeight = height * 8;
        let level = Array.from({length: levelWidth * levelHeight}, () => 0);
        //console.log(path)
        //this.printMap(levelMap)

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let roomType = levelMap[x][y]
                let room = roomCollection.getRandomRoomOfType(roomType)
                //this.printRoom(room, roomCollection.roomWidth, roomCollection.roomHeight)
                this.paintOver(level, levelWidth, room, x * roomCollection.roomWidth, y * roomCollection.roomHeight, roomCollection.roomWidth, roomCollection.roomHeight)
            }
        }
        //this.printLevel(level, levelWidth, levelHeight)
        return level
    }

    printRoom(room, roomWidth, roomHeight) {
        console.log('room')
        for (let y = 0; y < roomHeight; y++) {
            let line = []
            for (let x = 0; x < roomWidth; x++) {
                line.push(room[y * roomWidth + x])
            }
            console.log(line.join(''))
        }
    }
}

let roomCollection = new RoomCollection();
roomSets.forEach(roomSet => roomCollection.addRooms(roomSet))

let [levelMap, path] = new LevelGenerator(2, 2).generate()

let level = new LevelAssembler().assemble(roomCollection, levelMap, path)
console.log(level)

// console.log(level.generate().map(row => row.join('')).join('\n'));
