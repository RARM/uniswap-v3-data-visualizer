# Uniswap V3 Data Visualizer
This project is a solution to [this Full Stack Coding Challenge](https://webbtools.notion.site/Full-Stack-Coding-Challenge-c7ba2a97e5ab44409e051ae414a13833). As the challenge requires, it is a front end that pulls information about the top pools, tokens, and transactions of the [Uniswap V3](https://app.uniswap.org/) protocol through [The Graph](https://thegraph.com/).

The section below provides a quick guide to setting up and running the project locally, but the Wikis have more information on the project's design and functionalities.

## Quick Setup Guide
Yarn is a prerequisite to set up the project, but the front end also needs a The Graph API key; run the front end locally by running the following commands.

```bash
yarn
yarn dev
```

Get an API key in [The Graph Studio](https://thegraph.com/studio/apikeys/) and save it in a new file `.env.local` in the root directory using the variable name `SUBGRAPH_KEY`.

```
SUBGRAPH_KEY=<api-key>
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the solution.

## The Design
Although it is a coding challenge, the solution considers the application's possible requirements if it were a company product. Its design heavily considers maintainability and flexibility. Learn more about the design and architecture in the Wikis.
