package uk.ac.bristol.cs.application.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import uk.ac.bristol.cs.application.model.Ward;
import uk.ac.bristol.cs.application.repository.WardRepository;

@RestController
public class WardController {

    private final WardRepository repository;

    WardController(WardRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/api/wards")
    List<Ward> getAllWards() {
        return repository.findAll();
    }
}
