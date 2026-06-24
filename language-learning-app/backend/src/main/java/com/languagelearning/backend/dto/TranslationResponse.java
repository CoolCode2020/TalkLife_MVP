package com.languagelearning.backend.dto;

import java.time.LocalDateTime;

public record TranslationResponse(
        Long id,
        String originalText,
        String translation,
        String sourceLanguage,
        String targetLanguage,
        String pronunciation,
        LocalDateTime createdAt
) {
}
