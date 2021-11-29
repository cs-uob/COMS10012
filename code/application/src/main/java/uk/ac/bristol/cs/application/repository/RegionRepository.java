package uk.ac.bristol.cs.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import uk.ac.bristol.cs.application.model.Region;

public interface RegionRepository extends JpaRepository<Region, String> {

    @Query("SELECT r FROM Region r JOIN FETCH r.parent WHERE r.id = ?1")
    Region findByIdFull(String id);
}