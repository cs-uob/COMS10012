package uk.ac.bristol.cs.application.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import uk.ac.bristol.cs.application.NoSuchElementException;

import uk.ac.bristol.cs.application.model.Country;
import uk.ac.bristol.cs.application.repository.CountryRepository;

@RestController
public class CountryController {

    private final CountryRepository repository;

    CountryController(CountryRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/api/countries")
    List<Country> getAllCountries() {
        return repository.findAll();
    }
    
    @GetMapping("/api/country/{id}")
    Country getCountryById(@PathVariable String id) {
        return repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException(Country.class, id));
    }
}
