
package com.app.backend.jdbc.model;

public class UserCredential {

    private Long userId;
    private String userEmail;
    private String userName;
    private String userPassword;
    private boolean userVerified;

    public UserCredential() {
    }

    public UserCredential(
            Long userId,
            String userEmail,
            String userName,
            String userPassword,
            boolean userVerified
    ) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.userPassword = userPassword;
        this.userVerified = userVerified;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public boolean isUserVerified() {
        return userVerified;
    }

    public void setUserVerified(boolean userVerified) {
        this.userVerified = userVerified;
    }

    @Override
    public String toString() {
        return "UserCredential{" +
                "userId=" + userId +
                ", userEmail='" + userEmail + '\'' +
                ", userName='" + userName + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userVerified=" + userVerified +
                '}';
    }
}