package com.novruzov.aslan.backend.repository;

import com.novruzov.aslan.backend.entity.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository  extends CrudRepository<Room, Long> {
}
