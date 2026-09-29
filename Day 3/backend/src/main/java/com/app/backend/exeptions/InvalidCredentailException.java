package com.app.backend.exeptions;

public class InvalidCredentailException extends RuntimeException {
    public InvalidCredentailException(String message) {
        super(message);
    }
}
