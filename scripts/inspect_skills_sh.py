import urllib.request
import re
import json

def fetch_skills_sh():
    urls = [
        ("home", "https://skills.sh"),
        ("trending", "https://skills.sh/trending"),
        ("recent", "https://skills.sh/recent"),
    ]
    
    all_skills = {}
    
    for label, url in urls:
        print(f"Fetching {label}: {url}...")
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                html = resp.read().decode("utf-8", errors="replace")
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            continue

        # Look for skill patterns: href="/<owner>/<repo>/<skill>"
        pattern = r'href=["\']/([a-zA-Z0-9_\-\.]+)/([a-zA-Z0-9_\-\.]+)/([a-zA-Z0-9_\-\.]+)["\']'
        matches = re.findall(pattern, html)
        print(f"Matches in {label}: {len(matches)}")
        
        for owner, repo, skill in matches:
            if owner in ("_next", "agents", "agent", "site", "packs", "docs", "blog", "api"):
                continue
            key = f"{owner}/{repo}/{skill}"
            if key not in all_skills:
                all_skills[key] = {
                    "owner": owner,
                    "repo": f"{owner}/{repo}",
                    "skill": skill,
                    "sources": [label]
                }
            else:
                if label not in all_skills[key]["sources"]:
                    all_skills[key]["sources"].append(label)

    print(f"\nTotal unique skills discovered across skills.sh: {len(all_skills)}")
    
    # Group by repo
    repo_groups = {}
    for key, data in all_skills.items():
        r = data["repo"]
        if r not in repo_groups:
            repo_groups[r] = []
        repo_groups[r].append(data["skill"])
        
    print(f"Total unique upstream repos: {len(repo_groups)}")
    
    # Sort repos by number of skills
    sorted_repos = sorted(repo_groups.items(), key=lambda x: len(x[1]), reverse=True)
    print("\nTop Repositories by Skill Count on skills.sh:")
    for repo, skills in sorted_repos[:25]:
        print(f"  - {repo}: {len(skills)} skills ({', '.join(skills[:5])}{'...' if len(skills)>5 else ''})")

if __name__ == "__main__":
    fetch_skills_sh()
