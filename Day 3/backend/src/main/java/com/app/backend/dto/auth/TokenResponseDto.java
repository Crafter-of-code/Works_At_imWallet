package com.app.backend.dto.auth;

public class TokenResponseDto {
    private String token;
    public void setToken(String token){
        this.token = token;
    }
    public String getToken(){
        return  token;
    }
}
