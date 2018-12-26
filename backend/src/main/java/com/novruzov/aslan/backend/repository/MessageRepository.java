package com.novruzov.aslan.backend.repository;

import com.novruzov.aslan.backend.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository  extends
        CrudRepository<Message, Long>,
        PagingAndSortingRepository<Message, Long> {
    Page<Message> findMessagesByRoomId(Pageable pageable, Long id);
}
