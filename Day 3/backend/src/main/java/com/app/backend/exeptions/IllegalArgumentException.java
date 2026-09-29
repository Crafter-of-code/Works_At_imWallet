package com.app.backend.exeptions;

public class IllegalArgumentException extends RuntimeException {
    public IllegalArgumentException(String message){
        super (message);
    }
}
