package com.novruzov.aslan.backend.service.impl;

import com.novruzov.aslan.backend.entity.Room;
import com.novruzov.aslan.backend.repository.RoomRepository;
import com.novruzov.aslan.backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class RoomServiceImpl implements RoomService {
    private RoomRepository repository;

    @Autowired
    public RoomServiceImpl(RoomRepository repository) {
        this.repository = repository;
    }

    @Override
    public Room saveRoom(Room room) {
        return repository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Iterable<Room> getAllRooms() {
        return repository.findAll();
    }

    @Override
    public void deleteRoom(Long id) {
        repository.deleteById(id);
    }
}
