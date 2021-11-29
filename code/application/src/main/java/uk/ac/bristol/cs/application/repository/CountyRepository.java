package uk.ac.bristol.cs.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.ac.bristol.cs.application.model.County;

public interface CountyRepository extends JpaRepository<County, String> {

}