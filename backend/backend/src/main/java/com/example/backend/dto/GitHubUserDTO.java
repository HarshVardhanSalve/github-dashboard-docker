package com.example.backend.dto;

import lombok.Data;

@Data
public class GitHubUserDTO {

    private String login;

    private String avatar_url;

    private String html_url;

    private int followers;

    private int following;

    private int public_repos;
}