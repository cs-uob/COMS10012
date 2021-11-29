package uk.ac.bristol.cs.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.ac.bristol.cs.application.model.Country;

public interface CountryRepository extends JpaRepository<Country, String> {

}