pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "harpia-angular:latest"
        DEPLOY_USER = "tivic"
        DEPLOY_SERVER = "192.168.1.161"
        DEPLOY_PATH = "/tivic/harpia-angular"
        FRONT_HOST = "192.168.1.161"
        FRONT_PORT = "8091"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Generate Environment File') {
            steps {
                script {
                    def envContent = """
                        import packageInfo from "../../package.json";
                        import { Environment } from "./interfaces/environment.interface";

                        export const environment: Environment = {
                          production: true,
                          protocol: "http",
                          apiroot: "v1",
                          host: "${FRONT_HOST}",
                          port: ${FRONT_PORT},
                          context: "api",
                          version: packageInfo.version,
                        };
                    """
                    writeFile file: 'src/environments/environment.development.ts', text: envContent
                    echo "✔️ Arquivo environment.development.ts gerado com sucesso"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                withCredentials([string(credentialsId: 'npm-auth-token', variable: 'NPM_TOKEN')]) {
                    sh '''
                        echo "🚧 Iniciando build da imagem Docker..."
                        docker build --build-arg NPM_AUTH_TOKEN=$NPM_TOKEN -t $DOCKER_IMAGE .
                    '''
                }
            }
        }

        stage('Send Docker Image') {
            steps {
                sshagent(['ssh-cred-id']) {
                    sh '''
                        echo "📦 Exportando imagem para servidor remoto..."
                        docker save $DOCKER_IMAGE | bzip2 | ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_SERVER \
                        "bunzip2 | docker load"
                    '''
                }
            }
        }

        stage('Deploy Remote') {
            steps {
                sshagent(['ssh-cred-id']) {
                    sh '''
                        echo "🚀 Executando docker-compose no servidor remoto..."
                        ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_SERVER "
                        cd $DEPLOY_PATH &&
                        docker-compose up -d"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline concluído com sucesso!"
        }
        failure {
            echo "❌ Falha no pipeline!"
        }
    }
}
