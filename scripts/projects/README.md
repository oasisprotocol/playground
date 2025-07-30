# Project Management Scripts

This directory contains scripts for managing projects in the Oasis Protocol playground.

## Overview

These scripts help you import projects from different sources and generate a consolidated projects JSON file.

## Available Importers

- **GitHub Importer**: Imports projects from GitHub repositories
- **DoraHacks Importer**: Imports projects from DoraHacks hackathon submissions
- **EthGlobal Importer**: Imports projects from ETHGlobal hackathon submissions

## Usage

### Adding a New Project

To add a new project from a supported source:

```bash
yarn projects add <url> [directory]
```

Where:
- `<url>`: The URL of the project (GitHub repo, DoraHacks project, or ETHGlobal project)
- `[directory]`: (Optional) Custom directory name for the project. If not provided, it will use the project's slug.

#### Examples:

```bash
# Adding a GitHub project
yarn projects add https://github.com/oasisprotocol/dapp-votee

# Adding a GitHub project with a custom directory name
yarn projects add https://github.com/oasisprotocol/dapp-blockvote custom-blockvote
```

### Generating Projects JSON

To generate a consolidated JSON file containing all project information:

```bash
yarn projects dump
```

This will create a `projects.json` file with information about all projects.

To specify a custom output file:

```bash
yarn projects dump -o custom-output.json
```

## Project Structure

When you import a project, the script will:

1. Create a directory under `/projects`
2. Generate a `description.yaml` file with project metadata
3. Download and save screenshots to a `screenshots` subdirectory

## Environment Variables

- `API_KEY`: Optional GitHub API token for higher rate limits

## Supported URL Formats

- GitHub: `https://github.com/username/repository`
- DoraHacks: `https://dorahacks.io/...`
- ETHGlobal: `https://ethglobal.com/...`