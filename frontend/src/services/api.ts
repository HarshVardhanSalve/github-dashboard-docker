import axios from "axios";

const BASE_URL =
import.meta.env.VITE_API_URL;

export const getUser =
    async (
        username: string
    ) => {

        return axios.get(
            `${BASE_URL}/user/${username}`
        );
    };

export const getRepos =
    async (
        username: string
    ) => {

        return axios.get(
            `${BASE_URL}/repos/${username}`
        );
    };