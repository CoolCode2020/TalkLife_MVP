package com.languagelearning.backend.service;

import com.languagelearning.backend.dto.TranslationListResponse;
import com.languagelearning.backend.dto.TranslationRequest;
import com.languagelearning.backend.dto.TranslationResponse;
import com.languagelearning.backend.entity.TranslationEntry;
import com.languagelearning.backend.repository.TranslationRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class TranslationService {

    private static final Logger log = LoggerFactory.getLogger(TranslationService.class);

    private final TranslationRepository translationRepository;
    private final TranslationProvider translationProvider;

    public TranslationService(
            TranslationRepository translationRepository,
            TranslationProvider translationProvider
    ) {
        this.translationRepository = translationRepository;
        this.translationProvider = translationProvider;
    }

    public TranslationResponse translate(TranslationRequest request) {
        log.info(
                "Translation requested: sourceLanguage={}, targetLanguage={}, textLength={}, sessionPresent={}",
                request.sourceLanguage(),
                request.targetLanguage(),
                request.text().length(),
                request.sessionId() != null && !request.sessionId().isBlank()
        );

        AiTranslationResult aiTranslation = translationProvider.translate(request);

        TranslationEntry entry = new TranslationEntry();
        entry.setOriginalText(request.text());
        entry.setTranslatedText(aiTranslation.translation());
        entry.setSourceLanguage(request.sourceLanguage());
        entry.setTargetLanguage(request.targetLanguage());
        entry.setSessionId(request.sessionId());
        entry.setPronunciation(aiTranslation.pronunciation());
        entry.setCreatedAt(LocalDateTime.now());

        TranslationEntry savedEntry = translationRepository.save(entry);

        log.info("Translation saved: id={}", savedEntry.getId());

        return toTranslationResponse(savedEntry);
    }

    public List<TranslationListResponse> getAllTranslations() {
        return translationRepository.findAll()
                .stream()
                .map(this::toTranslationListResponse)
                .toList();
    }

    private TranslationResponse toTranslationResponse(TranslationEntry entry) {
        return new TranslationResponse(
                entry.getId(),
                entry.getOriginalText(),
                entry.getTranslatedText(),
                entry.getSourceLanguage(),
                entry.getTargetLanguage(),
                entry.getPronunciation(),
                entry.getCreatedAt()
        );
    }

    private TranslationListResponse toTranslationListResponse(TranslationEntry entry) {
        return new TranslationListResponse(
                entry.getId(),
                entry.getOriginalText(),
                entry.getTranslatedText(),
                entry.getSourceLanguage(),
                entry.getTargetLanguage(),
                entry.getPronunciation(),
                entry.getCreatedAt()
        );
    }
}
