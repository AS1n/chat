package com.novruzov.aslan.backend.service.impl;

import com.novruzov.aslan.backend.entity.Message;
import com.novruzov.aslan.backend.repository.MessageRepository;
import com.novruzov.aslan.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class MessageServiceImpl implements MessageService {
    private MessageRepository repository;

    @Autowired
    public MessageServiceImpl(MessageRepository repository) {
        this.repository = repository;
    }

    @Override
    public Message saveMessage(Message message) {
        return repository.save(message);
    }

    @Override
    public Optional<Message> getMessageById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Iterable<Message> getAllMessages() {
        return repository.findAll();
    }

    @Override
    public Page<Message> getMessagesByRoom(Integer page, Integer size, Long roomId) {
        Pageable pageable = new PageRequest(page-1, size, new Sort(Sort.Direction.DESC, "id"));
        return repository.findMessagesByRoomId(pageable, roomId);
    }

    @Override
    public void deleteMessage(Long id) {
        repository.deleteById(id);
    }
}
