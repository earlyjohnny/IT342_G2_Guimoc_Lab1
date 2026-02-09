package com.example.userauth.component;

import org.springframework.stereotype.Component;
import java.util.UUID;

@Component
public class TokenProvider {
    public String generateToken(String username){
        return UUID.randomUUID().toString() + "-" + username;
    }

    public boolean validateToken(String token){
        return token != null && token.length() > 10;
    }
}
