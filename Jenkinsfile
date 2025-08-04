// Arquivo: Jenkinsfile do job 'harpia-front-deploy'

// Carrega a Shared Library, que deve estar configurada globalmente no Jenkins
// e em seu próprio repositório Git.
@Library('harpia-library') _

pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_VERSION', defaultValue: 'main', description: 'Branch/tag do repositório da APLICAÇÃO a ser usada.')
        choice(name: 'CLIENT_NAME', choices: ['harpia-homologacao', 'harpia-producao'], description: 'Ambiente de destino do deploy.')
    }
    
    stages {
        // ETAPA 1: Baixar os códigos-fonte necessários
        stage('Checkout Múltiplos Repositórios') {
            steps {
                // Limpa o workspace para garantir uma execução limpa
                cleanWs()

                // Faz o checkout do código da APLICAÇÃO (harpia-angular) em uma subpasta.
                // Isso nos dá o código que precisamos construir.
                echo "Baixando código da aplicação de 'harpia-angular' da branch '${params.BRANCH_VERSION}'..."
                dir('codigo-fonte-angular') { // Isola o código da aplicação em uma pasta
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: params.BRANCH_VERSION]],
                        userRemoteConfigs: [[
                            url: 'https://github.com/tivic-pdi/harpia-angular.git', // URL do repositório da APLICAÇÃO
                            credentialsId: 'github-token' 
                        ]]
                    ])
                }
            }
        }

        // ETAPA 2: Carregar a configuração do ambiente de forma dinâmica
        stage('Load Configuration') {
            steps {
                script {
                    def systemName = 'front-end'
                    def configCredentialId = "config-${systemName}-${params.CLIENT_NAME}"
                    echo "Carregando configuração da credencial: ${configCredentialId}"
                    
                    withCredentials([file(credentialsId: configCredentialId, variable: 'CONFIG_FILE_PATH')]) {
                        // A variável 'config' é carregada no ambiente para ser usada nos próximos estágios
                        env.config = readProperties file: "${CONFIG_FILE_PATH}"
                    }
                    echo "Configuração para '${params.CLIENT_NAME}' carregada. Host: ${env.config.host}"
                }
            }
        }

        // ETAPA 3: Construir e implantar o front-end
        stage('Build & Deploy Front-end') {
            steps {
                // Entra no diretório onde o código da aplicação foi baixado
                // Todo o resto acontece a partir daqui
                dir('codigo-fonte-angular') {
                    script {
                        def imageName = "harpia/front-end:${params.BRANCH_VERSION}-${BUILD_NUMBER}".toLowerCase()

                        // As funções da Shared Library são chamadas aqui.
                        // Elas esperam encontrar Dockerfile, package.json, etc. no diretório atual.
                        
                        // 1. Gera os arquivos de ambiente do Angular
                        deployTools.generateAngularEnvironmentFile(env.config)
                        
                        // 2. Constrói a imagem Docker
                        deployTools.buildDockerImage(imageName, env.config)
                        
                        // 3. Transfere e implanta com Docker Compose
                        deployTools.deployWithCompose(imageName, env.config)
                    }
                }
            }
        }
    }
    post {
        always {
            // Limpa o workspace no final para economizar espaço
            cleanWs()
        }
    }
}
