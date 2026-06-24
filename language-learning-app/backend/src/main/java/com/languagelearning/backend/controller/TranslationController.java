package com.languagelearning.backend.controller;

import com.languagelearning.backend.dto.TranslationListResponse;
import com.languagelearning.backend.dto.TranslationRequest;
import com.languagelearning.backend.dto.TranslationResponse;
import com.languagelearning.backend.service.TranslationService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/translations")
public class TranslationController {

    private final TranslationService translationService;

    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @PostMapping
    public TranslationResponse translate(@Valid @RequestBody TranslationRequest request) {
        return translationService.translate(request);
    }

    @GetMapping
    public List<TranslationListResponse> getAllTranslations() {
        return translationService.getAllTranslations();
    }
}
