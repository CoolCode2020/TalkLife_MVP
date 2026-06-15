package com.languagelearning.backend.repository;
import com.languagelearning.backend.entity.TranslationEntry;
import org.springframework.data.jpa.repository.JpaRepository;

/** Saves and Loads dbs data. Jpa Repo comes with neat functions for repository actions */
public interface TranslationRepository extends JpaRepository<TranslationEntry, Long> {
    

    
}
