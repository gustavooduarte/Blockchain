# Blockchain

Projeto desenvolvido para a disciplina de Segurança e Auditoria de Sistemas.

## Descrição

A aplicação foi implementada utilizando HTML, CSS e Javascript. Para facilitar a implementação da parte gráfica foi utilizado o framework Bootsrap (https://getbootstrap.com/).

No repositório há 4 arquivos no total, sendo eles:

- blockchain.js: Código em JavaScript que possui todas as funções necessárias para a manipulação da blockchain e dos blocos pertencentes a ela. Esse código foi baseado em: https://tableless.com.br/como-implementar-blockchain-em-javascript/

- index.html: Página HTML que mostra as informações dos blocos.

- index.js: Código JavaScript que possibilitam que a página seja dinâmica, atualizando as informações na parte visual da aplicação, assim como a parte que realiza a requisições solicitadas pelo usuário.

- sha256.js: Código com a implementação da função de hash SHA-256, utilizado na geração de hash de cada bloco. Esse código não é de autoria própria, foi obtida em: 
https://cdn.jsdelivr.net/gh/chrisveness/crypto@latest/


## Forma de utilização da aplicação

Para a utilização do sistema basta abrir o arquivo .html com o navegador, onde aparecerá uma parte visual com as opções de Inserir Bloco, Mudar Dificuldade, Verificar Blockchain e Limpar Blockchain.

![Site blockchain](https://user-images.githubusercontent.com/31395476/110257658-a8872200-7f7d-11eb-87c4-9e069aca6927.png)

Cada bloco possui uma opção de edição, assim é possível alterar o conteúdo do bloco e realizar a validação da blockchain.
