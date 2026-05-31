package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.GitHubRepoDTO;
import com.example.backend.dto.GitHubUserDTO;
import com.example.backend.service.GitHubService;

@RestController
@RequestMapping("/api/github")
@CrossOrigin(origins = "https://your-frontend-app.onrender.com")
public class GitHubController {

    @Autowired
    private GitHubService gitHubService;

    @GetMapping("/user/{username}")
    public GitHubUserDTO getUser(
            @PathVariable String username
    ) {

        return gitHubService.getUser(username);
    }


    @GetMapping("/repos/{username}")
      public List<GitHubRepoDTO> getRepos(
        @PathVariable String username
    ) {
        return gitHubService.getRepos(username);
      }
}