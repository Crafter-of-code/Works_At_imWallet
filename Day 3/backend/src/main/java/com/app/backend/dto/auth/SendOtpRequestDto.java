package com.app.backend.dto.auth;

public class SendOtpRequestDto {
    private String userEmail;
    public void setUserEmail(String userEmail){
        this.userEmail = userEmail;
    }
    public String getUserEmail(){
        return  userEmail;
    }
}
