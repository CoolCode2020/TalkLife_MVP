package com.languagelearning.backend.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.languagelearning.backend.dto.TranslationRequest;
import com.languagelearning.backend.dto.TranslationResponse;
import com.languagelearning.backend.entity.TranslationEntry;
import com.languagelearning.backend.repository.TranslationRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
class TranslationServiceTest {

    @Autowired
    private TranslationService translationService;

    @Autowired
    private TranslationRepository translationRepository;

    @BeforeEach
    void cleanDatabase() {
        translationRepository.deleteAll();
    }

    @Test
    void translateSavesTranslationMetadataAndReturnsDto() {
        TranslationRequest request = new TranslationRequest(
                "Hello world",
                "English",
                "German",
                "session-123"
        );

        TranslationResponse response = translationService.translate(request);

        List<TranslationEntry> savedEntries = translationRepository.findAll();

        assertThat(savedEntries).hasSize(1);
        assertThat(savedEntries.getFirst().getOriginalText()).isEqualTo("Hello world");
        assertThat(savedEntries.getFirst().getSourceLanguage()).isEqualTo("English");
        assertThat(savedEntries.getFirst().getTargetLanguage()).isEqualTo("German");
        assertThat(savedEntries.getFirst().getSessionId()).isEqualTo("session-123");
        assertThat(savedEntries.getFirst().getCreatedAt()).isNotNull();

        assertThat(response.id()).isEqualTo(savedEntries.getFirst().getId());
        assertThat(response.originalText()).isEqualTo("Hello world");
        assertThat(response.translation()).isEqualTo("Hallo Welt");
        assertThat(response.sourceLanguage()).isEqualTo("English");
        assertThat(response.targetLanguage()).isEqualTo("German");
        assertThat(response.pronunciation()).isEqualTo("HAH-loh velt");
    }

    @TestConfiguration
    static class TestTranslationProviderConfig {

        @Bean
        @Primary
        TranslationProvider translationProvider() {
            return request -> new AiTranslationResult("Hallo Welt", "HAH-loh velt");
        }
    }
}
