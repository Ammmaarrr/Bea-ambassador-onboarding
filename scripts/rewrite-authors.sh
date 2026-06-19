#!/bin/sh
set -e
cd "$(dirname "$0")/.."
export FILTER_BRANCH_SQUELCH_WARNING=1

git filter-branch -f --env-filter '
if [ "$GIT_AUTHOR_EMAIL" = "hamza@users.noreply.github.com" ]; then
    export GIT_AUTHOR_NAME="Muhammad Ammar"
    export GIT_AUTHOR_EMAIL="m.ammar.63.64@gmail.com"
fi
if [ "$GIT_COMMITTER_EMAIL" = "hamza@users.noreply.github.com" ]; then
    export GIT_COMMITTER_NAME="Muhammad Ammar"
    export GIT_COMMITTER_EMAIL="m.ammar.63.64@gmail.com"
fi
' HEAD

echo "--- Authors after rewrite ---"
git log --format="%an <%ae>" | sort -u
