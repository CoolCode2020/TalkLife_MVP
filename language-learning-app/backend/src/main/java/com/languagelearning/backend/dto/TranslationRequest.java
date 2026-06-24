package com.languagelearning.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record TranslationRequest(
        @NotBlank(message = "Text is required.")
        @Size(max = 2_000, message = "Text must be 2,000 characters or less.")
        String text,

        @NotBlank(message = "Source language is required.")
        @Pattern(
                regexp = "English|German|Chinese|Unknown|Too Short",
                message = "Source language must be English, German, Chinese, Unknown, or Too Short."
        )
        String sourceLanguage,

        @NotBlank(message = "Target language is required.")
        @Pattern(
                regexp = "English|German|Chinese",
                message = "Target language must be English, German, or Chinese."
        )
        String targetLanguage,

        @Size(max = 128, message = "Session ID must be 128 characters or less.")
        String sessionId
) {
}
