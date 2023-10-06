pipeline {
  agent { dockerfile true }
  stages {
    // stage('node version') {
    //   steps {
    //     sh 'node --version'
    //   }
    // }
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
          npx playwright test
        '''
      }
      post {
        success {
          bat 'echo "hello world"'
        }
      }
    }
  }
}