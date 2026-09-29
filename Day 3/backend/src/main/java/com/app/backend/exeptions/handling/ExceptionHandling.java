package com.app.backend.exeptions.handling;
import com.app.backend.dto.GeneralResponse;
import com.app.backend.exeptions.IllegalArgumentException;
import com.app.backend.exeptions.InvalidCredentailException;
import com.app.backend.exeptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;

@RestControllerAdvice
public class ExceptionHandling {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<GeneralResponse<Void>> notFoundException(NotFoundException message){
        GeneralResponse<Void> generalResponse = new GeneralResponse<Void>();
        generalResponse.setStatus(false);
        generalResponse.setMessage(message.getMessage());
        return ResponseEntity.status(HttpStatus.OK).body(generalResponse);
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<GeneralResponse<Void>> illegalArgumentException(IllegalArgumentException message){
        GeneralResponse<Void> generalResponse = new GeneralResponse<Void>();
        generalResponse.setStatus(false);
        generalResponse.setMessage(message.getMessage());
        return ResponseEntity.status(HttpStatus.OK).body(generalResponse);
    }
    @ExceptionHandler(SQLException.class)
    public ResponseEntity<GeneralResponse<Void>> sqlException(SQLException message){
        GeneralResponse<Void> generalResponse = new GeneralResponse<Void>();
        generalResponse.setStatus(false);
        generalResponse.setMessage(message.getMessage());
        return ResponseEntity.status(HttpStatus.OK).body(generalResponse);
    }
    @ExceptionHandler(InvalidCredentailException.class)
    public ResponseEntity<GeneralResponse<Void>> invalidCredentialException(InvalidCredentailException message){
        GeneralResponse<Void> generalResponse = new GeneralResponse<Void>();
        generalResponse.setStatus(false);
        generalResponse.setMessage(message.getMessage());
        return ResponseEntity.status(HttpStatus.OK).body(generalResponse);
    }
}
