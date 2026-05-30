package com.example.backend.dto;
import lombok.Data;

@Data
public class GitHubRepoDTO {
    private String name;

    private String description;

    private String language;

    private int stargazers_count;

    private int forks_count;

    private String html_url;
}
