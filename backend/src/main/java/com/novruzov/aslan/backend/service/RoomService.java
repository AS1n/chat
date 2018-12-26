package com.novruzov.aslan.backend.service;

import com.novruzov.aslan.backend.entity.Room;
import com.novruzov.aslan.backend.entity.User;
import org.springframework.data.domain.Page;

import java.util.Optional;
import java.util.Set;

public interface RoomService {
    Room saveRoom(Room room);
    Optional<Room> getRoomById(Long id);
    Iterable<Room> getAllRooms();
    Page<Room> getPage(Integer page, Integer size);
    Page<Room> getOwnPage(Integer page, Integer size, Long manager_id);
    Set<User> getUsersByRoomId(Long room_id);
    void deleteRoom(Long id);
}
