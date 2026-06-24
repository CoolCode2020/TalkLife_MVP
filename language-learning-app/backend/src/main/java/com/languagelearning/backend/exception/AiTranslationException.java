package com.languagelearning.backend.exception;

public class AiTranslationException extends RuntimeException {

    public AiTranslationException(String message) {
        super(message);
    }

    public AiTranslationException(String message, Throwable cause) {
        super(message, cause);
    }
}
