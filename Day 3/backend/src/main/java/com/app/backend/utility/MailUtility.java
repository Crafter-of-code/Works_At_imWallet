package com.app.backend.utility;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class MailUtility {
    public JavaMailSender javaMailSender;
    MailUtility(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }
    public void sendMail(String to,String subject, String message){
        System.out.println("Email has been sended");
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(to);
        mail.setSubject(subject);
        mail.setText(message);
        javaMailSender.send(mail);
    }
}
