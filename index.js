// Inicialmente é criado uma blockchain com dificuldade 1, mas que o usuário pode fazer a alteração depois
let blockchain = new Blockchain();

// Funcão que retorna formatado todo o conteúdo do bloco
function conteudoBloco (num_bloco, index, hash_anterior, dados, timestamp, hash, nonce) {
    return(
    "<h4> Bloco " + num_bloco + "</h4>" + 
    "<div>" + 
        "<span class='font-weight-bold'> Index: </span>" + 
        "<span class='text-muted' id='index'> " + index + "</span>" + 
    " </div>" +
    "<div>" + 
        "<span class='font-weight-bold'> Dados: </span>" + 
        "<span class='text-muted'> " + dados + "</span>" + 
    " </div>" +
    "<div>" + 
        "<span class='font-weight-bold'> Timestamp: </span>" + 
        "<span class='text-muted'> " + timestamp + "</span>" + 
    "</div>" +
    "<div>" + 
        "<span class='font-weight-bold'> Nonce: </span>" + 
        "<span class='text-muted'> " + nonce + "</span><p/>" + 
    "</div>" +
    "<div>" + 
        "<span class='font-weight-bold'> Hash Anterior </span><br/>" + 
        "<span class='text-muted text-break'> " + hash_anterior + "</span>" + 
    " </div>" +
    "<div class='text-break'>" + 
        "<span class='font-weight-bold'> Hash </span><br/>" + 
        "<span class='text-muted'> " + hash + "</span><p/>" + 
    " </div >" +
    "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modalEdicao'" +
        "onclick='editarBloco(" + num_bloco + ")' >" +
        "Editar Bloco" +
    "</button>"
)}

function inserirBloco() {
    // Obtendo informações inseridas pelo usuario e criando um novo bloco
    let dados_form = document.getElementById("dados").value;
    blockchain.setNovoBloco(dados_form);

    // Obtendo os dados do bloco criado
    let index = blockchain.getUltimoBloco().index;
    let hash_anterior = blockchain.getUltimoBloco().hash_anterior;
    let dados = blockchain.getUltimoBloco().dados;
    let timestamp = blockchain.getUltimoBloco().timestamp;
    let hash = blockchain.getUltimoBloco().hash;
    let nonce = blockchain.getUltimoBloco().nonce;

    // Mostrando as informações na página HTML
    document.getElementById("blockchain").innerHTML += (
        "<div class = 'border rounded mb-1 mr-1 p-2' style = 'width: 33%' id='" + index + "'>" +
             conteudoBloco(index, index, hash_anterior, dados, timestamp, hash, nonce) +
        "</div>"   
    )

    //Limpando campo de dados
    document.getElementById("dados").value = '';
}

// Funcão executada após clicar no botão editar
function editarBloco(num_bloco){
    // Obtendo informações que poderam ser alteradas no bloco
    let index = blockchain.blocos[num_bloco].index;
    let dados = blockchain.blocos[num_bloco].dados;
    let hash = blockchain.blocos[num_bloco].hash;

    // Enviando as informações que poderam ser alteradas para o form de edicão
    document.getElementById("edicaoBloco").value = num_bloco
    document.getElementById("edicaoIndex").value = index
    document.getElementById("edicaoDados").value = dados
    document.getElementById("edicaoHash").value = hash
}

// Função que atualizar a informação direto no bloco já criado e armazenado em memória
function atualizarBloco(){
    let num_bloco = document.getElementById("edicaoBloco").value;
    let bloco = blockchain.blocos[num_bloco]
    
    // Atualizando informações do bloco gravadas em memória
    let index = document.getElementById("edicaoIndex").value;
    let dados = document.getElementById("edicaoDados").value;
    let hash = document.getElementById("edicaoHash").value;
    bloco.dados = dados
    bloco.index = index;
    bloco.hash = hash

    // Atualizando informações no html
    let hash_anterior = bloco.hash_anterior;
    let timestamp = bloco.timestamp;
    let nonce = bloco.nonce;
    let divBloco = document.getElementById(num_bloco.toString())
    divBloco.innerHTML = conteudoBloco(num_bloco, index, hash_anterior, dados, timestamp, hash, nonce)
}

function verificarBlockchain(){
    // O sistema só realiza a verificação da Blockchain se possuir pelo menos 2 blocos criados
    if(blockchain.qtd_blocos <= 1){
        document.getElementById('msgVerificacao').innerHTML = (
            "<div class='alert alert-warning' role='alert'>" +
                "Blockhain precisa de pelo menos <strong>2 blocos</strong> para ser realizada a verificação" +
            "</div>"
        )
        return
    }

    // Caso contrário, é realizada a rotina de verificação
    if (blockchain.validar()){
        document.getElementById('msgVerificacao').innerHTML = (
            "<div class='alert alert-success' role='alert'>" +
                "Blockhain verificada com sucesso e <strong> é válida. </strong>" +
            "</div>"
        )
    }else{
        document.getElementById('msgVerificacao').innerHTML = (
            "<div class='alert alert-danger' role='alert'>" +
                "Blockhain possui uma ou mais <strong> blocos incosistência </strong>" +
            "</div>"
        )
        
    }
}

function atualizarDificuldade(){
    let dificuldade = document.getElementById('dificuldade').value;

    limparBlockchain();

    // Quando a dificuldade é atualizada, é criada uma nova blockchain com a nova dificuldade
    blockchain = new Blockchain(dificuldade);

    document.getElementById('txtDificuldade').innerHTML = "(dificuldade: " + dificuldade + ")"
}

function limparBlockchain(){
    blockchain = new Blockchain();
    document.getElementById("blockchain").innerHTML = "";
    document.getElementById("msgVerificacao").innerHTML = ""; 
}
