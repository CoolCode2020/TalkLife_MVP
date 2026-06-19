package com.languagelearning.backend.contoller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.languagelearning.backend.dto.TextRequest;
import com.languagelearning.backend.entity.TranslationEntry;
import com.languagelearning.backend.service.TranslationService;

import java.util.List;

/*
 * Handles incoming HTTP requests from the frontend.
 * - receive API requests
 * - validate and map request data
 * - delegate business logic to the service layer
 */

@RestController
@RequestMapping("/api/translations")
public class TranslationController {

    private final TranslationService translationService;
    public TranslationController(TranslationService translationService){
        this.translationService = translationService;
    }

    /*
    * Creates a new translation session and stores
    * the original user input before language detection.
    */
    @PostMapping
    public TranslationEntry saveText(@RequestBody TextRequest request) {
        return translationService.saveText(request.getText());

    }
    /*
    * Returns all translations belonging to the current session.
    * Used by the review screen in the frontend.
    * */
   
    @GetMapping
    public List<TranslationEntry> getAllTranslations(){
        return translationService.getAllTranslations();
    
    }
}