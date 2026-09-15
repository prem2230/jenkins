pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jenkins-backend-starter'
        CONTAINER_NAME = 'jenkins-backend-starter'
    }

    stages {
        stage('Install') {
            steps {
                bat 'npm ci --ignore-scripts'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
                bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% -t %IMAGE_NAME%:latest .'
            }
        }

        stage('Smoke test') {
            steps {
                bat 'docker rm -f %CONTAINER_NAME% 2>NUL || exit /b 0'
                bat 'docker run -d --name %CONTAINER_NAME% -p 3001:3000 %IMAGE_NAME%:%BUILD_NUMBER%'
                bat 'powershell -NoProfile -Command "$healthy = $false; 1..10 | ForEach-Object { try { $response = Invoke-WebRequest -UseBasicParsing http://localhost:3001/health; if ($response.StatusCode -eq 200) { $healthy = $true; break } } catch { Start-Sleep -Seconds 1 } }; if (-not $healthy) { exit 1 }"'
            }
        }
    }

    post {
        always {
            bat 'docker rm -f %CONTAINER_NAME% 2>NUL || exit /b 0'
            junit allowEmptyResults: true, testResults: 'test-results/*.xml'
        }
    }
}