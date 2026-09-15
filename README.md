# Jenkins backend starter

Small Node.js backend with a Docker image and Jenkins pipeline.

## Run locally

```powershell
npm test
npm start
```

Open `http://localhost:3000/health`.

Run with Docker instead:

```powershell
docker compose up --build
```

## Jenkins on Windows

1. Install the Jenkins **NodeJS** and **Pipeline** plugins.
2. Ensure the Jenkins service account can run `node`, `npm`, and `docker`.
3. Create a Pipeline job and choose **Pipeline script from SCM**.
4. Select Git, enter your GitHub repository URL and credentials, and set the script path to `Jenkinsfile`.
5. Enable **GitHub hook trigger for GITScm polling**. Add a GitHub webhook pointing to `http://YOUR-JENKINS-HOST:8080/github-webhook/` with content type `application/json`.
6. Push a change. Jenkins will install, test, build the image, start a smoke-test container, and remove it afterward.

For a Jenkins server on `localhost`, GitHub cannot reach the webhook directly. Use a public Jenkins host or a tunnel such as ngrok for development. Never expose Jenkins without authentication and HTTPS.

## Deploying beyond the local machine

The pipeline currently builds and smoke-tests locally. For deployment, add a registry login and push after `Build`, for example Docker Hub or GitHub Container Registry. Then deploy that immutable image tag to a VM, Kubernetes, Azure Container Apps, AWS ECS, Google Cloud Run, or another container platform. Keep registry and cloud credentials in Jenkins Credentials; do not commit them.
