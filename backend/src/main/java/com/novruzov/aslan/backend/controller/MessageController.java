package com.novruzov.aslan.backend.controller;

import com.novruzov.aslan.backend.entity.Message;
import com.novruzov.aslan.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> getMessageById(@PathVariable(name = "id") Long id) {
        Optional<Message> message = messageService.getMessageById(id);
        if (message.isPresent()) {
            return ResponseEntity.ok(message.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Message saveMessage(@RequestBody Message message) {
        return messageService.saveMessage(message);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteMessage(@PathVariable(name = "id") Long id) {
        messageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }


}
