pipeline {
  agent any
  stages {
    stage('Install dependencies'){
        steps{
            sh 'npm ci'
        }
    }
    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install --with-deps'
      }
    }
    stage('Run Playwright tests') {
      steps {
        sh 'npx playwright test'
      }
    }
  }
}