pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS', type: 'Tool'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup node') {
            steps {
                script {
                    def nodeVersion = '14' // Đổi phiên bản Node.js tùy thuộc vào bạn đã cài đặt trên Jenkins
                    tool name: "NodeJS", type: "jenkins.plugins.nodejs.tools.InstallerTool", properties: []
                    env.PATH = "${NODEJS_HOME}/bin:${env.PATH}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def playwrightCmd = "npx playwright"
                    def playwrightArgs = "install"
                    
                    sh "${playwrightCmd} ${playwrightArgs}"
                }
            }
        }

        stage('Run Playwright tests') {
            steps {
                script {
                    def playwrightCmd = "npx playwright"
                    def testCmd = "test"

                    sh "${playwrightCmd} ${testCmd}"
                }
            }
        }
    }

    post {
        always {
            junit '**/test-results/*.xml'
        }
    }
}