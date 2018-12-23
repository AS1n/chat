package com.novruzov.aslan.backend.service;

import com.novruzov.aslan.backend.entity.Room;

import java.util.Optional;

public interface RoomService {
    Room saveRoom(Room room);
    Optional<Room> getRoomById(Long id);
    Iterable<Room> getAllRooms();
    void deleteRoom(Long id);
}
