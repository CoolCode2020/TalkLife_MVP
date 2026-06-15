package com.languagelearning.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

// Stuff I want in my database: user input text and translated text to process later.
@Setter
@Getter
@Entity
public class TranslationEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionId;
    private String originalText;
    private String translatedText;
    private String sourceLanguage;
    private String targetLanguage;
    private String pronunciation;
    private LocalDateTime createdAt;

    public TranslationEntry() {
    }
}
