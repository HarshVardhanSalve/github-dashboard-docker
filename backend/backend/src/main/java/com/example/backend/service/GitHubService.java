package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.reactive.function.client.WebClient;

import com.example.backend.dto.GitHubRepoDTO;
import com.example.backend.dto.GitHubUserDTO;


@Service
public class GitHubService {

    @Autowired
    private WebClient webClient;

    public GitHubUserDTO getUser(String username) {
                try {
                 return webClient.get()
                .uri("/users/" + username)
                .retrieve()
                .bodyToMono(GitHubUserDTO.class)
                .block();
                    
                } catch (Exception e) {
                    throw  new RuntimeException("User not found");
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
             throw  new RuntimeException("Repositories not found");
        }
    }
}