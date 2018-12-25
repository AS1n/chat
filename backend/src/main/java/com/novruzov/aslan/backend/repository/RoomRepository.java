package com.novruzov.aslan.backend.repository;

import com.novruzov.aslan.backend.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository  extends
        CrudRepository<Room, Long>,
        PagingAndSortingRepository<Room, Long> {
    Optional<Room> findByName(String name);
    Page<Room> findRoomsByUserId(Pageable pageable, Long userId);



//    Page<Room> findRoomsByUsersContainingId(Pageable pageable, Long userId);
}
