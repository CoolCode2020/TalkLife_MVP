package com.languagelearning.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.ai.ollama")
public record OllamaProperties(
        String baseUrl,
        String model
) {
    public OllamaProperties {
        if (baseUrl == null || baseUrl.isBlank()) {
            baseUrl = "http://localhost:11434";
        }

        if (model == null || model.isBlank()) {
            model = "translategemma:latest";
        }
    }
}
