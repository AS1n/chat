package com.novruzov.aslan.backend.service;

import com.novruzov.aslan.backend.entity.Message;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface MessageService {
    Message saveMessage(Message message);
    Optional<Message> getMessageById(Long id);
    Iterable<Message> getAllMessages();
    Page<Message> getMessagesByRoom(Integer page, Integer size, Long roomId);
    void deleteMessage(Long id);
}
