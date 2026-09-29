package com.app.backend.controllers;

import com.app.backend.dto.GeneralResponse;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client")
public class MoneyController {
    @PostMapping("/send-money")
    public ResponseEntity<GeneralResponse<Void>> sendMoneyController(){
        GeneralResponse<Void> generalResponse = new GeneralResponse<Void>();
        generalResponse.setStatus(true);
        generalResponse.setMessage("Every thing is working perfectly fine");
        if(generalResponse.isStatus()){
            return ResponseEntity.status(HttpStatus.OK).body(generalResponse);
        }else{
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(generalResponse);
        }
    }
}
