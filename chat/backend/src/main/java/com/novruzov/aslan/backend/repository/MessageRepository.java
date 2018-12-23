package com.novruzov.aslan.backend.repository;

import com.novruzov.aslan.backend.entity.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository  extends CrudRepository<Message, Long> {
}
