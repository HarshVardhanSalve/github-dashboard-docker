import type { GitHubUser } from "../types/GitHubUser";

interface ProfileCardProps {
    user: GitHubUser | null;
}

const ProfileCard = ({ user }: ProfileCardProps) => {

    if (!user) return null;

    return (
        <div>

            <img
                src={user.avatar_url}
                alt="avatar"
                width={150}
            />

            <h2>{user.login}</h2>

            <p>Followers: {user.followers}</p>

            <p>Following: {user.following}</p>

            <p>Public Repositories: {user.public_repos}</p>

            <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
            >
                Visit GitHub
            </a>

        </div>
    );
};

export default ProfileCard;