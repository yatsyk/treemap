import { GITHUB_URL } from "../../lib/settings";
import GithubCorner from "react-github-corner";

export const ForkCorner = () => (
  <GithubCorner
    href={GITHUB_URL}
    bannerColor="#4299e1"
    octoColor="#fff"
    size={150}
    direction="right"
  />
);
