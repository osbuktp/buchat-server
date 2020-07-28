import Room from '../../mongoose/models'

async function createRoom(hostId) {
    const room = new Room({host: hostId, members:[hostId]})
    await room.save()
}

export {createRoom}