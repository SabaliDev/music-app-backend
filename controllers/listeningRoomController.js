import ListeningRoom from '../models/ListeningRoom.js';
import User from '../models/User.js';

export const createRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const newRoom = new ListeningRoom({
      name,
      creator: req.user.id,
      participants: [req.user.id]
    });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: 'Error creating room', error: error.message });
  }
};

export const inviteUser = async (req, res) => {
  try {
    const { roomId, userId } = req.body;
    const room = await ListeningRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    if (room.participants.includes(userId)) {
      return res.status(400).json({ message: 'User already in room' });
    }
    room.participants.push(userId);
    await room.save();
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error inviting user', error: error.message });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ListeningRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    if (!room.participants.includes(req.user.id)) {
      room.participants.push(req.user.id);
      await room.save();
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error joining room', error: error.message });
  }
};

export const getRoomDetails = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ListeningRoom.findById(roomId).populate('participants', 'username');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error getting room details', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, 'username _id');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  };



  export const leaveRoom = async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ListeningRoom.findById(roomId);
      
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      // Remove the user from the participants array
      room.participants = room.participants.filter(
        (participantId) => participantId.toString() !== req.user.id
      );
  
      // If the room is now empty, you might want to delete it
      if (room.participants.length === 0) {
        await ListeningRoom.findByIdAndDelete(roomId);
        return res.json({ message: 'Room left and deleted as it was empty' });
      }
  
      // If the leaving user was the creator, assign a new creator
      if (room.creator.toString() === req.user.id && room.participants.length > 0) {
        room.creator = room.participants[0];
      }
  
      await room.save();
      res.json({ message: 'Successfully left the room', room });
    } catch (error) {
      res.status(500).json({ message: 'Error leaving room', error: error.message });
    }
  };