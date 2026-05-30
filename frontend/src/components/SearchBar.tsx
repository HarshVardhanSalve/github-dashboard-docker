import { useState } from "react";

interface SearchBarProps {

    onSearch: (
        username: string
    ) => void;
}

const SearchBar = ({
    onSearch
}: SearchBarProps) => {

    const [username, setUsername] =
        useState("");

    return (

        <div>

            <input
                type="text"

                placeholder=
                "Enter GitHub Username"

                value={username}

                onChange={(e) =>
                    setUsername(
                        e.target.value
                    )
                }
            />

            <button
                onClick={() =>
                    onSearch(username)
                }
            >
                Search
            </button>

        </div>
    );
};

export default SearchBar;