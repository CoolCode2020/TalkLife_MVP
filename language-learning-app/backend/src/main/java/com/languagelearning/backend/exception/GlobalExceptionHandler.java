package com.languagelearning.backend.exception;

import com.languagelearning.backend.dto.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationError(
            MethodArgumentNotValidException exception,
            HttpServletRequest request
    ) {
        Map<String, String> fieldErrors = new LinkedHashMap<>();

        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            fieldErrors.putIfAbsent(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "Please check the translation request.",
                request.getRequestURI(),
                fieldErrors
        );
    }

    @ExceptionHandler(AiTranslationException.class)
    public ResponseEntity<ApiErrorResponse> handleAiTranslationError(
            AiTranslationException exception,
            HttpServletRequest request
    ) {
        log.warn("AI translation failed: path={}, reason={}", request.getRequestURI(), exception.getMessage());

        return buildResponse(
                HttpStatus.BAD_GATEWAY,
                "Translation service is unavailable. Please try again.",
                request.getRequestURI(),
                Map.of()
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponse> handleUnreadableRequest(
            HttpMessageNotReadableException exception,
            HttpServletRequest request
    ) {
        log.warn("Unreadable API request: path={}", request.getRequestURI());

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "The request body could not be read.",
                request.getRequestURI(),
                Map.of()
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleUnexpectedError(
            Exception exception,
            HttpServletRequest request
    ) {
        log.error("Unexpected API error: path={}", request.getRequestURI(), exception);

        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Something went wrong. Please try again.",
                request.getRequestURI(),
                Map.of()
        );
    }

    private ResponseEntity<ApiErrorResponse> buildResponse(
            HttpStatus status,
            String message,
            String path,
            Map<String, String> fieldErrors
    ) {
        return ResponseEntity.status(status).body(
                new ApiErrorResponse(
                        LocalDateTime.now(),
                        status.value(),
                        status.getReasonPhrase(),
                        message,
                        path,
                        fieldErrors
                )
        );
    }
}
