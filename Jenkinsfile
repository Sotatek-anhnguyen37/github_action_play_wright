pipeline {
agent any
  stages {
    stage('install playwright') {
      steps {
        bat 'npm i -D @playwright/test'
        bat 'npx playwright install'
      }
    }
    stage('help') {
      steps {
        bat 'npx playwright test --help'
      }
    }
    stage('test') {
      steps {
        bat 'npx playwright test --list'
        bat 'npx playwright test'
      }
      // post {
      //   success {
      //     archiveArtifacts(artifacts: 'playwright-report/index.html', followSymlinks: false)
      //     publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Test Results', reportTitles: '', useWrapperFileDirectly: true])
      //   }
      }
    }
  }
}