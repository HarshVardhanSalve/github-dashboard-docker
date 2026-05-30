import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { getUser, getRepos } from "../services/api";

import type { GitHubUser } from "../types/GitHubUser";
import type { GitHubRepo } from "../types/GitHubRepo";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function DashboardPage() {

    const { username } = useParams();

    const [user, setUser] =
        useState<GitHubUser | null>(null);

    const [repos, setRepos] =
        useState<GitHubRepo[]>([]);

    const [sortType, setSortType] =
        useState("name");

    useEffect(() => {

        const loadData = async () => {

            if (!username) return;

            try {

                const userResponse =
                    await getUser(username);

                setUser(userResponse.data);

                const repoResponse =
                    await getRepos(username);

                setRepos(repoResponse.data);

            } catch (error) {

                console.error(error);
            }
        };

        loadData();

    }, [username]);

    // Language Count

    const languageCount:
        Record<string, number> = {};

    repos.forEach((repo) => {

        if (!repo.language) return;

        languageCount[repo.language] =
            (languageCount[repo.language] || 0) + 1;

    });

    const pieData = {

        labels: Object.keys(languageCount),

        datasets: [
            {
                label: "Repositories",

                data: Object.values(languageCount),

                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#8BC34A",
                    "#E91E63",
                    "#00BCD4",
                    "#795548"
                ],

                borderWidth: 1
            }
        ]
    };

    // Statistics

    const totalStars =
        repos.reduce(
            (sum, repo) =>
                sum + repo.stargazers_count,
            0
        );

    const totalForks =
        repos.reduce(
            (sum, repo) =>
                sum + repo.forks_count,
            0
        );

    const totalLanguages =
        Object.keys(languageCount).length;

    const mostStarredRepo =
        repos.length > 0
            ? repos.reduce(
                (max, repo) =>
                    repo.stargazers_count >
                        max.stargazers_count
                        ? repo
                        : max
            )
            : null;

    // Sorting

    const sortedRepos = [...repos];

    if (sortType === "stars") {

        sortedRepos.sort(
            (a, b) =>
                b.stargazers_count -
                a.stargazers_count
        );

    }

    if (sortType === "forks") {

        sortedRepos.sort(
            (a, b) =>
                b.forks_count -
                a.forks_count
        );

    }

    if (sortType === "name") {

        sortedRepos.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }

    return (

        <div className="container py-5">

            {/* PROFILE */}

            {user && (

                <div className="card shadow mb-5">

                    <div className="card-body text-center">

                        <img
                            src={user.avatar_url}
                            alt="avatar"
                            width={130}
                            className="rounded-circle mb-3 border"
                        />

                        <h2>{user.login}</h2>

                        <div className="row mt-4">

                            <div className="col-md-4">

                                <h5>
                                    Followers
                                </h5>

                                <p>
                                    {user.followers}
                                </p>

                            </div>

                            <div className="col-md-4">

                                <h5>
                                    Following
                                </h5>

                                <p>
                                    {user.following}
                                </p>

                            </div>

                            <div className="col-md-4">

                                <h5>
                                    Repositories
                                </h5>

                                <p>
                                    {user.public_repos}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* STATS */}

            <div className="row g-4 mb-5">

                <div className="col-md-3">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h5>
                                Total Stars
                            </h5>

                            <h3>
                                ⭐ {totalStars}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h5>
                                Total Forks
                            </h5>

                            <h3>
                                🍴 {totalForks}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h5>
                                Languages
                            </h5>

                            <h3>
                                {totalLanguages}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h5>
                                Top Repo
                            </h5>

                            <h6>
                                {mostStarredRepo?.name}
                            </h6>

                            <p>
                                ⭐ {
                                    mostStarredRepo
                                        ?.stargazers_count
                                }
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* PIE CHART */}

            <div className="card shadow mb-5">

                <div className="card-body">

                    <h3 className="text-center mb-4">
                        Top Languages Used
                    </h3>

                    <div
                        style={{
                            maxWidth: "500px",
                            margin: "0 auto"
                        }}
                    >

                        <Pie data={pieData} />

                    </div>

                </div>

            </div>

            {/* SORT BUTTONS */}

            <div className="mb-4">

                <button
                    className="btn btn-primary me-2"
                    onClick={() =>
                        setSortType("name")
                    }
                >
                    Sort By Name
                </button>

                <button
                    className="btn btn-success me-2"
                    onClick={() =>
                        setSortType("stars")
                    }
                >
                    Sort By Stars
                </button>

                <button
                    className="btn btn-warning"
                    onClick={() =>
                        setSortType("forks")
                    }
                >
                    Sort By Forks
                </button>

            </div>

            {/* REPOSITORIES */}

            <div className="card shadow">

                <div className="card-body">

                    <h3 className="mb-4">
                        Repository List
                    </h3>

                    <div className="table-responsive">

                        <table
                            className="
                            table
                            table-striped
                            table-hover
                            align-middle
                            "
                        >

                            <thead
                                className="table-dark"
                            >

                                <tr>

                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Language</th>
                                    <th>Stars</th>
                                    <th>Forks</th>
                                    <th>Link</th>

                                </tr>

                            </thead>

                            <tbody>

                                {sortedRepos.map(
                                    (repo) => (

                                        <tr
                                            key={repo.name}
                                        >

                                            <td>
                                                {repo.name}
                                            </td>

                                            <td>
                                                {
                                                    repo.description
                                                }
                                            </td>

                                            <td>
                                                {
                                                    repo.language
                                                }
                                            </td>

                                            <td>
                                                {
                                                    repo.stargazers_count
                                                }
                                            </td>

                                            <td>
                                                {
                                                    repo.forks_count
                                                }
                                            </td>

                                            <td>

                                                <a
                                                    href={
                                                        repo.html_url
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="
                                                    btn
                                                    btn-outline-primary
                                                    btn-sm
                                                    "
                                                >
                                                    Open
                                                </a>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default DashboardPage;