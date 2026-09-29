package com.app.backend.dto.auth;

public class LoginRequestDto {
    private String userEmail;
    private String userPassword;
    public void setUserEmail(String userEmail){
        this.userEmail = userEmail;
    }
    public String getUserEmail(){
        return  userEmail;
    }
    public void setUserPassword(String userPassword){
        this.userPassword = userPassword;
    }
    public String getUserPassword(){
        return  userPassword;
    }
}
