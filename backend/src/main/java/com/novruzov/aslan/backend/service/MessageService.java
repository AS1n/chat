package com.novruzov.aslan.backend.service;

import com.novruzov.aslan.backend.entity.Message;

import java.util.Optional;

public interface MessageService {
    Message saveMessage(Message message);
    Optional<Message> getMessageById(Long id);
    Iterable<Message> getAllMessages();
    void deleteMessage(Long id);
}
