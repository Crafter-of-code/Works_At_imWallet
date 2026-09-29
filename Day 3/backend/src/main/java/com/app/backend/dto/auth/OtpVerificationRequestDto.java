package com.app.backend.dto.auth;

public class OtpVerificationRequestDto {
    private String userEmail;
    private String userOtp;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserOtp() {
        return userOtp;
    }

    public void setUserOtp(String userOtp) {
        this.userOtp = userOtp;
    }
}
