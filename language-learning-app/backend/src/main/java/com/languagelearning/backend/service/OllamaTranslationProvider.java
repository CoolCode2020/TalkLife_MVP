package com.languagelearning.backend.service;

import com.languagelearning.backend.config.OllamaProperties;
import com.languagelearning.backend.dto.TranslationRequest;
import com.languagelearning.backend.exception.AiTranslationException;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

@Service
public class OllamaTranslationProvider implements TranslationProvider {

    private static final Logger log = LoggerFactory.getLogger(OllamaTranslationProvider.class);

    private final OllamaProperties properties;
    private final ObjectMapper objectMapper;
    private final RestClient restClient;

    public OllamaTranslationProvider(OllamaProperties properties, ObjectMapper objectMapper) {
        this.properties = properties;
        this.objectMapper = objectMapper;
        this.restClient = RestClient.builder()
                .baseUrl(properties.baseUrl())
                .build();
    }

    @Override
    public AiTranslationResult translate(TranslationRequest request) {
        log.info(
                "Calling Ollama translation model: model={}, sourceLanguage={}, targetLanguage={}",
                properties.model(),
                request.sourceLanguage(),
                request.targetLanguage()
        );

        OllamaGenerateRequest ollamaRequest = new OllamaGenerateRequest(
                properties.model(),
                buildPrompt(request),
                buildSystemPrompt(),
                "json",
                false,
                Map.of("temperature", 0.1)
        );

        OllamaGenerateResponse ollamaResponse = callOllama(ollamaRequest);
        return parseTranslationResponse(ollamaResponse);
    }

    private OllamaGenerateResponse callOllama(OllamaGenerateRequest request) {
        try {
            OllamaGenerateResponse response = restClient.post()
                    .uri("/api/generate")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(OllamaGenerateResponse.class);

            if (response == null || response.response() == null || response.response().isBlank()) {
                throw new AiTranslationException("Ollama returned an empty translation response.");
            }

            return response;
        } catch (RestClientResponseException exception) {
            log.warn("Ollama HTTP error: status={}", exception.getStatusCode().value());
            throw new AiTranslationException("Ollama returned an HTTP error.", exception);
        } catch (ResourceAccessException exception) {
            throw new AiTranslationException("Ollama could not be reached.", exception);
        }
    }

    private AiTranslationResult parseTranslationResponse(OllamaGenerateResponse response) {
        try {
            OllamaTranslationPayload payload = objectMapper.readValue(
                    response.response(),
                    OllamaTranslationPayload.class
            );

            if (payload.translation() == null || payload.translation().isBlank()) {
                throw new AiTranslationException("Ollama response did not include a translation.");
            }

            return new AiTranslationResult(
                    payload.translation().trim(),
                    payload.pronunciation() == null ? "" : payload.pronunciation().trim()
            );
        } catch (JacksonException exception) {
            throw new AiTranslationException("Ollama returned invalid translation JSON.", exception);
        }
    }

    private String buildSystemPrompt() {
        return """
                You are a precise language-learning translation engine.
                Return only valid JSON. Do not include markdown, explanations, or extra keys.
                """;
    }

    private String buildPrompt(TranslationRequest request) {
        return """
                Translate the input text for a language-learning app.

                Requirements:
                - Translate from sourceLanguage to targetLanguage.
                - Preserve meaning and natural phrasing.
                - Return pronunciation for the translated text when useful for a learner.
                - If pronunciation is not useful, return an empty string.
                - Respond only with JSON shaped exactly like:
                  {"translation":"...","pronunciation":"..."}

                Input:
                %s
                """.formatted(buildInputJson(request));
    }

    private String buildInputJson(TranslationRequest request) {
        try {
            return objectMapper.writeValueAsString(
                    Map.of(
                            "text", request.text(),
                            "sourceLanguage", request.sourceLanguage(),
                            "targetLanguage", request.targetLanguage()
                    )
            );
        } catch (JacksonException exception) {
            throw new AiTranslationException("Could not build translation prompt.", exception);
        }
    }

    private record OllamaGenerateRequest(
            String model,
            String prompt,
            String system,
            String format,
            boolean stream,
            Map<String, Object> options
    ) {
    }

    private record OllamaGenerateResponse(
            String response
    ) {
    }

    private record OllamaTranslationPayload(
            String translation,
            String pronunciation
    ) {
    }
}
