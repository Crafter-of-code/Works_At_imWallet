package com.app.backend.controllers;

import com.app.backend.dto.GeneralResponse;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OtpController {
    @GetMapping("/otp")
    public ResponseEntity<GeneralResponse> getOtpController(){
        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setStatus(true);
        generalResponse.setMessage("here is the response");
        return ResponseEntity.status(HttpStatus.OK).body(generalResponse);
    }
    @PostMapping("/otp")
    public ResponseEntity<GeneralResponse> varifyOtpController(){
        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setStatus(true);
        generalResponse.setMessage("here is the response");
        return ResponseEntity.status(HttpStatus.OK).body(generalResponse);
    }
}
