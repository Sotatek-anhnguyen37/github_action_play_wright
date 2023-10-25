pipeline {
  agent any
  tools {
    nodejs '18.16.1'
  }
  stages {
    stage('node version') {
      steps {
        sh 'node --version'
      }
    }
    stage('install playwright') {
      steps {
        bat '''
          npm i -D @playwright/test
          npx playwright install
        '''
      }
    }
    stage('help') {
      steps {
        bat 'npx playwright test --help'
      }
    }
    stage('test') {
      steps {
        bat '''
          npx playwright test --list
          npx playwright test --reporter=line, allure-playwright
        '''
      }
    }
  }
  post {
    always {
      publishHTML([
        allowMissing: false,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright',
        reportTitles: '',
        useWrapperFileDirectly: true])
    }
  }
}