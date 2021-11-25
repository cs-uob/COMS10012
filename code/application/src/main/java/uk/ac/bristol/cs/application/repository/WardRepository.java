package uk.ac.bristol.cs.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.ac.bristol.cs.application.model.Ward;

public interface WardRepository extends JpaRepository<Ward, Long> {

}