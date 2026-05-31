package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.reactive.function.client.WebClient;

import com.example.backend.dto.GitHubRepoDTO;
import com.example.backend.dto.GitHubUserDTO;

import reactor.core.publisher.Mono;


@Service
public class GitHubService {

    @Autowired
    private WebClient webClient;

    public GitHubUserDTO getUser(String username) {
    try {

        return webClient.get()
        .uri("/users/" + username)
        .retrieve()
.onStatus(
    status -> status.value() == 403,
    response -> response.bodyToMono(String.class)
        .flatMap(body -> Mono.error(new RuntimeException(body)))
)
.bodyToMono(GitHubUserDTO.class)
.block();

    } catch (Exception e) {

        System.out.println("FULL ERROR:");
        e.printStackTrace();

        throw e;
    }
}


    public List<GitHubRepoDTO> getRepos(String username){
        try {
            return webClient.get()
            .uri("/users/"+username+"/repos")
            .retrieve()
            .bodyToFlux(GitHubRepoDTO.class)
            .collectList()
            .block();
            
        } catch (Exception e) {
              System.out.println("ERROR = " + e.getMessage());

        e.printStackTrace();

        throw e;
        }
    }
}