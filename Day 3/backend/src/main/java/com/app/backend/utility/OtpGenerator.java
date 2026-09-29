package com.app.backend.utility;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Random;
@Component
public class OtpGenerator {
    private  SecureRandom secureRandom;
    public String generateOtp(){
       secureRandom = new SecureRandom();
       int value = 10000 + secureRandom.nextInt(900000);
       return  String.valueOf(value);
    }

}
