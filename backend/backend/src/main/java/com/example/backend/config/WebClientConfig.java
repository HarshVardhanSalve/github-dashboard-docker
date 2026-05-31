package com.example.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${GITHUB_TOKEN}")
    private String githubToken;

    @Bean
    public WebClient webClient() {

        return WebClient.builder()
                .baseUrl("https://api.github.com")
                .defaultHeader("User-Agent", "GitHub-Dashboard-App")
                .defaultHeader("Accept", "application/vnd.github+json")
                .defaultHeader("Authorization", "Bearer " + githubToken)
                .build();
    }
}