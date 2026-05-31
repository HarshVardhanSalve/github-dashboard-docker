package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient() {

        return WebClient.builder()
                .baseUrl("https://api.github.com")
                .defaultHeader("User-Agent", "GitHub-Dashboard-App")
                .defaultHeader("Accept", "application/vnd.github+json")
                .build();
    }
}