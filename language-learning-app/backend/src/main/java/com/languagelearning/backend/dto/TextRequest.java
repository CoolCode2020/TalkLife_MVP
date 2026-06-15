package com.languagelearning.backend.dto;

import lombok.Getter;
import lombok.Setter;

/*

 * Request object used to transfer data from the frontend

 * to the backend API.

 *

 * A DTO is used instead of exposing the database entity

 * directly. This allows the API contract to evolve

 * independently from the database structure.

 *

 * Currently only the text field is required, but additional

 * metadata such as source language, target language, and

 * session information will be added in later versions.

 */

@Getter
@Setter
public class TextRequest {
    
    private String text;

    private String sourceLanguage;

    private String targetLanguage;

    private String sessionId;
}
