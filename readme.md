Template React Native para Taro
====

## Requisitos

0. taro: `@tarojs/cli@^3.5.0`
1. framework: 'react'

## Início Rápido

### Instalar Biblioteca React Native
> Instale as dependências peer de `@tarojs/taro-rn`, `@tarojs/components-rn` e `@tarojs/router-rn`; essa ação também executará o `post-install`. Por favor, modifique e execute o script `upgradePeerdeps` ao alterar a versão do Taro.
> 
> **Execute este script após a inicialização do projeto.**

`yarn upgradePeerdeps`

### Instalação de Pods
> Execute este script quando adicionar uma nova biblioteca React Native ou atualizar a versão de uma existente.
> 
> Consulte [pod-install](https://www.npmjs.com/package/pod-install) para mais informações.

`yarn podInstall`

### Iniciar Aplicativo iOS

`yarn ios`

### Iniciar Aplicativo Android

`yarn android`

### Iniciar Bundler

`yarn start`

### Mais Informações

0. [Processo de Desenvolvimento do Taro React Native](https://taro-docs.jd.com/taro/docs/react-native)
1. [GitHub](https://github.com/NervJS/taro)

## Publicação

### Construir Bundle para iOS

`yarn build:rn --platform ios`

### Construir Bundle para Android

`yarn build:rn --platform android`

### Publicar Aplicativo iOS

Consulte [publishing-to-app-store](https://reactnative.cn/docs/publishing-to-app-store) para mais detalhes.

### Publicar APK Android

Consulte [signed-apk-android](https://reactnative.cn/docs/signed-apk-android) para mais detalhes.

## Workflows do GitHub
> Utilize o GitHub Actions para construir seus aplicativos. Este template inclui uma configuração básica do GitHub Actions.

Consulte [.github/workflows](.github/workflows) para mais detalhes.

### Eventos

Por padrão, são gerados produtos de debug e release para Android e iOS quando você realiza push ou pull request na branch master. Personalize seus fluxos de trabalho modificando os arquivos em [.github/workflows](.github/workflows).

Consulte [events-that-trigger-workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows).

### iOS

#### Configuração

Modifique os seguintes itens de configuração para empacotar e publicar seu aplicativo.

> [.github/workflows/assemble_ios_debug.yml](.github/workflows/assemble_ios_debug.yml)
> [.github/workflows/assemble_ios_release.yml](.github/workflows/assemble_ios_release.yml)

```yml
env:
  APP_ID: com.taro.demo         # Identificador do Pacote do Aplicativo
  APP_NAME: Taro Demo            # Nome de Exibição do Aplicativo
  VERSION_NUMBER: 1.0.0          # Número da Versão do Aplicativo
  BUILD_NUMBER: 1.0.0.0          # Número da Build do Aplicativo (usado apenas na publicação)
  TEAM_ID: XXXXXXXXXX            # ID da Equipe (usado na atualização do projeto)
  PROVISIONING_PROFILE_SPECIFIER: Product_profile  # Nome do Perfil de Provisionamento para a Assinatura de Código
  CODE_SIGN_IDENTITY: iPhone Distribution           # Tipo de Identidade para Assinatura (iPhone Developer, iPhone Distribution)
  SIGNING_CERTIFICATE_P12_DATA: ${{secrets.RELEASE_SIGNING_CERTIFICATE_P12_DATA}}
  SIGNING_CERTIFICATE_PASSWORD: ${{secrets.RELEASE_SIGNING_CERTIFICATE_PASSWORD}}
  PROVISIONING_PROFILE_DATA: ${{secrets.RELEASE_PROVISIONING_PROFILE_DATA}}
  APP_STORE_CONNECT_USERNAME: ${{secrets.APP_STORE_CONNECT_USERNAME}}  # Defina este segredo com o Apple ID da sua conta de desenvolvedor (usado apenas na publicação)
  APP_STORE_CONNECT_PASSWORD: ${{secrets.APP_STORE_CONNECT_PASSWORD}}  # Utilizado apenas na publicação
```

Valores como ${{secrets.xxxxx}} são gerados manualmente e armazenados nos segredos criptografados do GitHub.

##### SIGNING_CERTIFICATE_P12_DATA

`cat Certificates.p12 | base64 | pbcopy`

##### SIGNING_CERTIFICATE_PASSWORD

Senha de criptografia do seu arquivo de certificado (.p12)

##### PROVISIONING_PROFILE_DATA

`cat profile.mobileprovision | base64 | pbcopy`

##### APP_STORE_CONNECT_PASSWORD

Este segredo deve ser definido como uma senha específica para o seu aplicativo na conta Apple ID. Siga [estas instruções](https://support.apple.com/en-us/HT204397) para criá-la.

#### Leia Mais

1. [Implantar um Aplicativo iOS no TestFlight ou na App Store usando GitHub Actions](https://betterprogramming.pub/deploy-an-ios-app-to-testflight-or-the-app-store-using-github-actions-c4d7082b1430)
2. [Segredos Criptografados](https://docs.github.com/en/actions/reference/encrypted-secrets)
3. [Fastlane](https://docs.fastlane.tools/)

### Android

#### Configuração

Modifique os seguintes itens de configuração para empacotar e publicar seu aplicativo.

> [.github/workflows/assemble_android_debug.yml](.github/workflows/assemble_android_debug.yml)
> [.github/workflows/assemble_android_release.yml](.github/workflows/assemble_android_release.yml)

```yml
env:
  APP_ID: com.taro.demo              # Identificador do Pacote do Aplicativo
  APP_NAME: Taro Demo                # Nome de Exibição do Aplicativo
  APP_ICON: ic_launcher              # Ícone do Aplicativo
  APP_ROUND_ICON: ic_launcher_round  # Ícone Arredondado do Aplicativo
  APP_ABI_FILTERS: armeabi-v7a, arm64-v8a  # Filtros de ABI do Aplicativo
  VERSION_NAME: 1.0.0                # Nome da Versão
  VERSION_CODE: 10                   # Código da Versão
  KEYSTORE_FILE: debug.keystore      # Arquivo de Keystore
  KEYSTORE_PASSWORD: android         # Senha do Keystore
  KEYSTORE_KEY_ALIAS: androiddebugkey  # Alias da Chave do Keystore
  KEYSTORE_KEY_PASSWORD: android       # Senha da Chave do Keystore
```

Para a segurança do seu aplicativo, regenere o arquivo .keystore e armazene a senha nos segredos criptografados do GitHub.

#### Leia Mais

1. [Assinatura de Aplicativos](https://developer.android.com/studio/publish/app-signing)
2. [Segredos Criptografados](https://docs.github.com/en/actions/reference/encrypted-secrets)

## Links

0. [Código Fonte do Template](https://github.com/NervJS/taro-project-templates/tree/v3.1/react-native)
1. [Projeto de Exemplo](https://github.com/wuba/taro-react-native/tree/playground)