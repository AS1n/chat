package com.novruzov.aslan.backend.controller;

import com.novruzov.aslan.backend.entity.Room;
import com.novruzov.aslan.backend.entity.User;
import com.novruzov.aslan.backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Room> getPage(
            @RequestParam(name = "page") Integer pageNumber,
            @RequestParam(name = "size") Integer size) {
        Page page = roomService.getPage(pageNumber, size);
        return page.getContent();
    }

    @RequestMapping(value = "/own", method = RequestMethod.GET)
    public Iterable<Room> getOwnPage(
            @RequestParam(name = "page") Integer pageNumber,
            @RequestParam(name = "size") Integer size,
            @RequestParam(name = "user_id") Long user_id) {
        Page page = roomService.getOwnPage(pageNumber, size, user_id);
        return page.getContent();
    }

    @RequestMapping(value = "/total-pages", method = RequestMethod.GET)
    public Integer getTotalPages(
            @RequestParam(name = "size") Integer size,
            @RequestParam(name = "manager_id", required = false) Long manager_id) {
        if(manager_id!=null)
            return roomService.getOwnPage(1,size,manager_id).getTotalPages();
        return roomService.getPage(1, size).getTotalPages();
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public Iterable<User> getUsersInRoom(
            @RequestParam(name = "room_id") Long room_id) {
        return roomService.getUsersByRoomId(room_id);
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Room> getRoomById(@PathVariable(name = "id") Long id) {
        Optional<Room> room = roomService.getRoomById(id);
        if (room.isPresent()) {
            return ResponseEntity.ok(room.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


//    @RequestMapping(value = "", method = RequestMethod.GET)
//    public Iterable<Room> getAllRooms() {
//        return roomService.getAllRooms();
//    }

    @RequestMapping(method = RequestMethod.POST)
    public Room saveRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteRoom(@PathVariable(name = "id") Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }


}
