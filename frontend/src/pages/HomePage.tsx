import { useState } from "react";

import { useNavigate } from "react-router-dom";

import githubImage from "../assets/github-front.webp";

function HomePage() {

    const [username, setUsername] =
        useState("");

    const navigate = useNavigate();

    const handleSearch = () => {

        if (!username.trim()) return;

        navigate(
            `/dashboard/${username}`
        );
    };

    return (

        <div className="container py-5">

            <div
                className="
                row
                align-items-center
                shadow
                rounded
                overflow-hidden
                bg-white
                "
            >

                {/* LEFT IMAGE */}

                <div className="col-lg-7 p-0">

                    <img
                        src={githubImage}
                        alt="github"
                        className="img-fluid w-100 h-100"
                        style={{
                            objectFit: "cover",
                            minHeight: "500px"
                        }}
                    />

                </div>

                {/* RIGHT CONTENT */}

                <div className="col-lg-5 p-5">

                    <h1
                        className="
                        display-4
                        fw-bold
                        mb-3
                        "
                    >
                        GitVision
                    </h1>

                    <p
                        className="
                        text-muted
                        mb-4
                        "
                    >
                        Search any GitHub user and view
                        their repositories, stars,
                        forks, languages, analytics,
                        and dashboard statistics.
                    </p>

                    <div className="mb-3">

                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter GitHub Username"
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter"
                                ) {

                                    handleSearch();
                                }
                            }}
                        />

                    </div>

                    <button
                        className="
                        btn
                        btn-dark
                        btn-lg
                        w-100
                        "
                        onClick={handleSearch}
                    >
                        Search User
                    </button>

                    <hr className="my-4" />

                    <div className="row text-center">

                        <div className="col-4">

                            <h4>
                                📊
                            </h4>

                            <small>
                                Analytics
                            </small>

                        </div>

                        <div className="col-4">

                            <h4>
                                📈
                            </h4>

                            <small>
                                Statistics
                            </small>

                        </div>

                        <div className="col-4">

                            <h4>
                                🚀
                            </h4>

                            <small>
                                Repositories
                            </small>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default HomePage;