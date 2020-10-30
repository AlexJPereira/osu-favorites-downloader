<h1 align="center">
    Unofficial Osu Favorite Downloader
</h1>

![license](https://img.shields.io/github/license/wykke/osu-favorite-downloader)
![issues](https://img.shields.io/github/issues/wykke/osu-favorite-downloader)

<img src="./public/assets/icon.png" alt="logo" width="200" align="right"/>

Projeto feito com Electron para as funcionalidades e React para a interface. Unofficial Osu Favorite Downloader é um programa para baixar os favoritos do usuário no jogo musical [Osu!](https://osu.ppy.sh/home) com apenas um click.

## Como utilizar

- Baixe o [programa](https://github.com/wykke/osu-favorite-downloader/releases/tag/1.0.0).
- Faça login.
- Escolha o offset, a quantidade de beatmaps e se quer baixar com vídeo.
    - O offset representa onde na lista irá começar a baixar, é util quando for parar um download e quiser continuar depois.
    - A quantidade de beatmaps representa a quantidade que irá baixar após o offset.
    - A escolha de download com vídeo se refere ao vídeo que aparece no fundo ao jogar uma música.
- Click download e pronto.

Cuidado, o servidor do osu limita o usuário com 200 downloads seguidos, depois disso deve-se aguardar um tempo.

## Screenshots

<div display="inline">
<img src="./docs/screenshot1.png" width="49%">
<img src="./docs/screenshot2.gif" width="49%">
</div>

## Como desenvolver

Existem alguns comandos úteis no `package.json`.

- `yarn start`: inicia o react, utilize esse comando antes de abrir o electron.
- `yarn electron-compile`: compila os arquivos referentes a pasta `/src/electron`, caso tenha feito modificações nessa pasta, utilize esse comando antes de abrir o electron.
- `yarn electron-start`: abre o electron em modo de desenvolvimento, a interface será provida por `http://localhost:3000`.

Para compilar o projeto para produção.

- `yarn electron-build`: compila os arquivos do electron, cria os arquivos estáticos da interface através do React na pasta `/build` e compila o arquivo executável através do electron-builder.

## Possível upgrades futuros

- Fazer com que após 200 downloads, o programa espere o servidor do osu liberar mais download e continue, ao invés de simplesmente parar o download.
- Adicionar o ReCaptcha na página de login quando necessário.

