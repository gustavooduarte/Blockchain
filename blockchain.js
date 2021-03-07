// Código baseado em: https://tableless.com.br/como-implementar-blockchain-em-javascript/

// Classe que que mantem as infomações de cada bloco da Blockchain
class Bloco {
    constructor(index, hash_anterior, dados = "", dificuldade) {
        this.index = index
        this.hash_anterior = hash_anterior
        this.dados = dados
        this.timestamp = Date.now()
        this.dificuldade = dificuldade
        this.nonce = 0

        // Para obter o hash, é realizado o processo de mineração
        this.minerar()
    }

    gerarHash() {
        return Sha256.hash(this.index + this.hash_anterior + JSON.stringify(this.dados) + this.timestamp + this.nonce).toString()
    }

    // Funcão para realizar o processo de mineração, onde será encontrado o valor de nonce que 
    // irá gerar o número de zeros correspondentes a dificuldade escolhida
    minerar() {
        console.log('Iniciando mineração...')
        
        this.noce = 0
        this.hash = this.gerarHash()

        // Expressão regular para testar as quantidades de zeros gerados no hash
        const re = /^0*$/;

        // Só sai do loop depois que a quantidade de zeros no inicio for igual a dificuldade da Blockchain
        while (!(re.test(this.hash.substring(0, this.dificuldade)))) {
            this.nonce++
            this.hash = this.gerarHash()
        }

        console.log('Mineração Finalizada')
    }
}

// Classe que possui todos os blocos e operações relacionadas a Blockchain
class Blockchain {
    constructor(dificuldade = 1) {          
        this.blocos = []                    // Gerando um array de blocos para a pertencentes a Blockchain
        this.qtd_blocos = 0                 // Facilitar o gerenciamento dos blocos, assim como a atribuição do indice 
        this.dificuldade = dificuldade
    }

    // Funcao que retorna o ultimo bloco criado
    getUltimoBloco() {
        return this.blocos[this.blocos.length - 1]
    }

    // Responsável por acrescentar um novo bloco a cadeia de acordo os dados enviados
    setNovoBloco(dados) {
        const index = this.qtd_blocos
        const dificuldade = this.dificuldade
        let hash_anterior = 0           //Recebe 0, caso seja o bloco 0
        
        // Se não for o primeiro bloco, então recebe o Hash do bloco Anterior
        if (index != 0){
            hash_anterior = this.getUltimoBloco().hash
        }

        const bloco = new Bloco(index, hash_anterior, dados, dificuldade)

        this.qtd_blocos++
        this.blocos.push(bloco)
    }

    validar() {
        // For começa do segundo bloco da cadeia
        for (let i = 1; i < this.blocos.length; i++) {
            const bloco_atual = this.blocos[i]
            const bloco_anterior = this.blocos[i - 1]

            // Verificando se o bloco atual é válido
            if (bloco_atual.hash !== bloco_atual.gerarHash()) {
                return false
            }

            // Verificando se o Hash do bloco antetior ainda corresponde ao armazenado no bloco atual
            if (bloco_atual.hash_anterior != bloco_anterior.gerarHash()) {
                return false
            }
        }
        return true
    }
}