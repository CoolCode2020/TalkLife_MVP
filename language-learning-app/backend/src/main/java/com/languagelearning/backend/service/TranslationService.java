package com.languagelearning.backend.service;

import org.springframework.stereotype.Service;

import com.languagelearning.backend.entity.TranslationEntry;
import com.languagelearning.backend.repository.TranslationRepository;

import java.util.List;

@Service
public class TranslationService {

    private final TranslationRepository translationRepository;
    public TranslationService(TranslationRepository translationRepository) {
        this.translationRepository = translationRepository;
    }
     public TranslationEntry saveText(String originalText) {
        TranslationEntry entry = new TranslationEntry();
        entry.setOriginalText(originalText);
        entry.LLM
        return translationRepository.save(entry);

     }
     public List<TranslationEntry> getAllTranslations() {
        return translationRepository.findAll();
     }
     public translateEntry(String text, String inputLanguage, String outputLanguage) {

      

      return tranlsation;

     
      }

    
}
