package uk.ac.bristol.cs.application.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import uk.ac.bristol.cs.application.NoSuchElementException;

import uk.ac.bristol.cs.application.model.Region;
import uk.ac.bristol.cs.application.repository.RegionRepository;

@RestController
public class RegionController {

    private final RegionRepository repository;

    RegionController(RegionRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/api/regions")
    List<Region> getAllRegions() {
        return repository.findAll();
    }
    
    @GetMapping("/api/region/{id}")
    Region getRegionById(@PathVariable String id) {
        Region r = repository.findByIdFull(id);
        if (r == null) {
            throw new NoSuchElementException(Region.class, id);
        }
        return r;
    }
}
