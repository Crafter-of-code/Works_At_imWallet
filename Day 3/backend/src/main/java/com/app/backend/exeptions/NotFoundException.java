package com.app.backend.exeptions;

public class NotFoundException extends  RuntimeException{
    public NotFoundException(String message){
        super(message);
    }
}
