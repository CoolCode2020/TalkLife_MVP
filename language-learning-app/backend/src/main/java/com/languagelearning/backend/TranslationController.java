package com.languagelearning.backend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/translations")
@CrossOrigin(origins = "http://localhost:5173")
public class TranslationController {

    @PostMapping
    public TranslationResponse translate(@RequestBody TranslationRequest request) {
        return new TranslationResponse(
                request.text(),
                "跟我说说你今天过得怎么样。",
                "Gēn wǒ shuōshuo nǐ jīntiān guò de zěnmeyàng."
        );
    }

    public record TranslationRequest(
            String text,
            String sourceLanguage,
            String targetLanguage
    ) {}

    public record TranslationResponse(
            String originalText,
            String translation,
            String pronunciation
    ) {}
}