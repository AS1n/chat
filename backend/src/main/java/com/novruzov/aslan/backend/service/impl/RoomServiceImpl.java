package com.novruzov.aslan.backend.service.impl;

import com.novruzov.aslan.backend.entity.Room;
import com.novruzov.aslan.backend.entity.User;
import com.novruzov.aslan.backend.repository.RoomRepository;
import com.novruzov.aslan.backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;

@Component
public class RoomServiceImpl implements RoomService {
    private RoomRepository repository;

    @Autowired
    public RoomServiceImpl(RoomRepository repository) {
        this.repository = repository;
    }

    @Override
    public Room saveRoom(Room room) {
        if(room.getId()==null && repository.findByName(room.getName()).isPresent())
            return null;
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
    public Page<Room> getPage(Integer page, Integer size) {
        Pageable pageable = new PageRequest(page-1, size, new Sort(Sort.Direction.ASC, "id"));
            return repository.findAll(pageable);
    }

    @Override
    public Page<Room> getOwnPage(Integer page, Integer size, Long manager_id) {
        Pageable pageable = new PageRequest(page-1, size, new Sort(Sort.Direction.ASC, "id"));
        return repository.findRoomsByUserId(pageable, manager_id);
    }

    @Override
    public Set<User> getUsersByRoomId(Long room_id) {
        Room room = repository.findById(room_id).get();
        return room.getUsers();
    }



    @Override
    public void deleteRoom(Long id) {
        repository.deleteById(id);
    }
}
