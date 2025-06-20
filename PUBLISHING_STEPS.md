# Publishing Steps

> These are notes for future me, when I've forgotten these steps next time I need to upgrade. May be incomplete.

1. Make code changes on new feature branch

- Manually increase major version in package.json if breaking changes. (eg. `4.0.0-beta.0`).

2. Test it using `npm run start`
3. Once happy check it builds using `npm run build`
4. Push branch to git which should auto publish test build to npm from github action.

- Can also manually deploy from local using `npm run publish`.
- Make sure you have a `.env` file created from `.env.example` with required variables.

5. Get test build and install on another project, make sure it all works.
6. Remove `.beta-x` from package json version.
7. Merge feature branch into main.
