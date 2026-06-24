package com.languagelearning.backend.service;

import com.languagelearning.backend.dto.TranslationRequest;

public interface TranslationProvider {

    AiTranslationResult translate(TranslationRequest request);
}
