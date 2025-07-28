# Nuxt4 with tus + Uppy

This project implements a file upload server using MinIO as the S3-compatible 
storage backend.

## Features

- File upload functionality
- S3-compatible storage using MinIO
- Built with Nuxt4


## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Start MinIO server locally:

```bash
docker compose up
```

Default MinIO credentials:

- Access Key: `minioadmin`
- Secret Key: `minioadmin`

3. Start the development server:

```bash
pnpm run dev
```

## Usage

Go to [http://localhost:3000]() and upload files upload your files!
