//EVENTO PARA O BUTTON ABRIR O POPPUT PARA ADCICIONAR UM NOVO PAGAMENTO
let modal = document.querySelector("#dialogAddPag");
document.querySelector('#RegistPag').addEventListener('click', () => {
    document.querySelector("#cliente").value = '';
    document.querySelector("#vencimento").value = '';
    document.querySelector("#pagamento").value = '';
    document.querySelector("#valor").value = '';
    modal.show();
    document.querySelector('#salvar').innerHTML = 'Salvar';
   
});
//FECHA O POPPUP DE ADIÇÃO DE PAGAMENTO
document.querySelector('#fechar').addEventListener('click', () => {
    modal.close();
});
//APAGA OS DADOS QUE FORAM DIGITADOS NO POPPUP
document.querySelector('#apagar').addEventListener('click', () => {
    document.querySelector("#cliente").value = '';
    document.querySelector("#vencimento").value = '';
    document.querySelector("#pagamento").value = '';
    document.querySelector("#valor").value = '';
});

//SALVA OS DADOS QUE FORAM DIGITADOS NO POPPUP
document.querySelector('#salvar').addEventListener('click', () => {
   let nome = document.querySelector("#cliente").value;
   let vencimento = document.querySelector("#vencimento").value;
   let pagamento = document.querySelector("#pagamento").value;
   let valor = document.querySelector("#valor").value;
   let forma = document.querySelector("#forma").value;

   //REGEX PARA FAZER A VERIFICAÇÃO DE DATA BRASILEIRA VÁLIDA
   function testeDataRegex(data){
        const teste = /^\d{2}\/\d{2}\/\d{4}$/;
        return teste.test(data);
   }
   //VERIFICA SE TEM ALGUM CAMPO QUE NÃO FOI PREENCHIDO
   if((nome == '') || (valor == '') || (forma == '') || (testeDataRegex(vencimento) == false) || (testeDataRegex(pagamento) == false)){

        document.querySelector('#mensagensNovPag').innerText = "Verifique se todas as informações foram fornecidas corretamente!";
        let msg = document.querySelector('#MensagensSobreAddPag');
        msg.show();
   
        setTimeout(() =>{
            msg.close();
        }, '3000');
   }
    //ADICIONA O NOVO PAGAMENTO
    else{
        //ACEITA OS DADOS E SEGUE O PROCEDIMENTO DE IMPLEMENTAÇÃO
        addPagamento.salvar();
   }
});
//AÇÃO DO BUTTON PARA SAIR DO SITE
document.querySelector('#sair').addEventListener('click', () =>{
    let sair = document.querySelector('#saindoDoSite');
    sair.show();

    setTimeout(() => {
        window.open('../index.html', '_self');
    }, "1000");
});

//CLASSE PARA FAZER O REGISTRO, EXCLUSÃO OU EDIÇÃO DE UM PAGAMENTO
class adicionarPagamento{
    constructor() {
        //ID QUE CADA PAGAMENTO VAI RECEBER
        this.id = 1;
        //CRIAR ARRAY PRINCIPAL
        this.arrayPagamentos = [];
        //ID DE VERIFICAÇÃO SE O PROCEDIMENTO QUE ESTÁ SENDO REALIZADO É UMA EDIÇÃO DE PAGAMENTO
        this.editId = null;
    }
   
    //PRIMEIRA ETAPA PARA REGISTRO DE UM PAGAMENTO
    salvar(){
        let modal = document.querySelector("#dialogAddPag");
        let msg = document.querySelector('#MensagensSobreAddPag');

        document.querySelector('#mensagensNovPag').innerText = "Pagamento registrado com supesso!";
        msg.show();
        setTimeout(() =>{
            msg.close();
            modal.close();
        }, '1000');
       
        let pagamento = this.lerDados();

        //QUANDO É O REGISTRO DE UM NOVO PAGAMENTO
        if(this.editId == null){
            this.adicionar(pagamento);
        }
        //QUANDO É UMA EDIÇÃO DE UM PAGAMENTO
        else{
            this.atualizar(this.editId, pagamento);
        }
        this.listaTabela();
        this.limpar();
    }

    //CAPTURAR OS DADOS PREENCHIDOS PELO USUÁRIO
    lerDados(){
        let pagamento = {};
       
        pagamento.id = this.id;
        pagamento.nomeCliente = document.querySelector('#cliente').value;
        pagamento.Vencimento = document.querySelector('#vencimento').value;
        pagamento.Pagamento = document.querySelector('#pagamento').value;
        pagamento.Valor = document.querySelector('#valor').value;
        pagamento.Forma = document.querySelector('#forma').value;
               
        return pagamento;
    }
    //ADICIONA OS DADOS DO PAGAMENTO NO ARRAY E INCREMENTA +1 NO ID
    adicionar(pagamento){
        this.arrayPagamentos.push(pagamento);
        this.id++;
    }

    //CRIA A NOVA LINHA E AS COLUNAS NA TABELA HTML PARA O NOVO PAGAMENTO
    listaTabela(){
        let tbody = document.querySelector('#tbody');
        tbody.innerText = "";

        for(let i = 0; i< this.arrayPagamentos.length; i++){
       
            let tr = tbody.insertRow();
            let td_id = tr.insertCell();
            let td_NomeCli = tr.insertCell();
            let td_Vencimento = tr.insertCell();
            let td_Pagamento = tr.insertCell();
            let td_Valor = tr.insertCell();
            let td_Forma = tr.insertCell();
            let td_Acao = tr.insertCell();
           
            
            //INSERE OS DADOS DO ARRAY NA CÉLULA CORRESPONDENTE A ELE NA TABELA
            td_id.id = "celula" + this.arrayPagamentos[i].id;
            td_id.innerText = this.arrayPagamentos[i].id;
            td_NomeCli.innerText = this.arrayPagamentos[i].nomeCliente;
            td_Vencimento.innerText = this.arrayPagamentos[i].Vencimento;
            td_Pagamento.innerText = this.arrayPagamentos[i].Pagamento;
            td_Valor.innerText = this.arrayPagamentos[i].Valor;
            td_Forma.innerText = this.arrayPagamentos[i].Forma;	  

            //ZERAR OS INPUTs TODAS AS VEZES QUE O POPPUP FOR ABERTO
            document.querySelector("#cliente").value = '';
            document.querySelector("#vencimento").value = '';
            document.querySelector("#pagamento").value = '';
            document.querySelector("#valor").value = '';

            //ADICIONA A OPÇÃO DE EDITAR O PAGAMENTO QUE ESTÁ SENDO REGISTRADO
            let imgEdit = document.createElement('img');
            imgEdit.src = '../Imagens/lapis.png';
            imgEdit.id = "edicao" + this.arrayPagamentos[i].id;
            imgEdit.setAttribute("onclick", "addPagamento.preparaEdicao("+ this.arrayPagamentos[i].id +")");
                
            //ADICIONA A OPÇÃO DE DELETAR O PAGAMENTO QUE ESTÁ SENDO REGISTRADO
            let imgDelete = document.createElement('img');
            imgDelete.src = '../Imagens/lixeira.png';
            imgDelete.id = "delete" + this.arrayPagamentos[i].id;
            imgDelete.setAttribute("onclick", "addPagamento.deletar("+ this.arrayPagamentos[i].id +")");
        
            //ADICIONAR A IMAGEM AO td_acoes (DIZER QUE É UMA FILHA DE td_acoes) logo acima
            td_Acao.appendChild(imgEdit);
            td_Acao.appendChild(imgDelete);
        }			
    }

    //CAPTURA OS DADOS DO PAGAMENTO SELECIONADO PARA EDIÇÃO E COLOCA NO POPPUP PARA SER MODIFICADO
    preparaEdicao(id){
        this.editId = id;
        let modal = document.querySelector("#dialogAddPag");
        modal.show();

        //PERCORRE O ARRAY E ADICIONA AS INFORMAÇÕES DO PAGAMENTO REFERENE AO ID DO PAGAMENTO SELECIONDAD
        for (let i = 0; i < this.arrayPagamentos.length; i++) {
            if(this.arrayPagamentos[i].id == id){
                //MOSTRA OS DADOS NA TELA
                document.querySelector('#cliente').value = `${this.arrayPagamentos[i].nomeCliente}`;
                document.querySelector('#vencimento').value = `${this.arrayPagamentos[i].Vencimento}`;
                document.querySelector('#pagamento').value = `${this.arrayPagamentos[i].Pagamento}`;
                document.querySelector('#valor').value = `${this.arrayPagamentos[i].Valor}`;
                document.querySelector('#forma').value = `${this.arrayPagamentos[i].Forma}`;
            }            
        }

        //MUDAR O NOME DO BOTÃO PARA "Atualizar"
        document.querySelector('#salvar').innerHTML = 'ATUALIZAR'; 
    }

    //LIMPA OS INPUTS E INFORMA QUE NÃO SERÁ FEITA UMA EDIÇÃO
    limpar(){
        document.querySelector('#cliente').value = '';
        document.querySelector('#vencimento').value = '';
        document.querySelector('#pagamento').value = '';
        document.querySelector('#valor').value = '';
   
        this.editId = null;
   }

   //ATUALIZA O ARRAY COM OS NOVOS DADOS DO PAGAMENTO
   atualizar(editId, pagamento){
        for (let i = 0; i < this.arrayPagamentos.length; i++) {

            if(this.arrayPagamentos[i].id == editId){
                this.arrayPagamentos[i].nomeCliente = pagamento.nomeCliente;
                this.arrayPagamentos[i].Vencimento = pagamento.Vencimento;;
                this.arrayPagamentos[i].Pagamento = pagamento.Pagamento;;
                this.arrayPagamentos[i].Valor = pagamento.Valor;
                this.arrayPagamentos[i].Forma = pagamento.Forma;
            }	
        }
    }

    //APAGA O PAGAMENTO SELECIONADO
    deletar(id){

        if(confirm("Deseja realmente deletar estes dados?")){
            //ATUALIZAR A LISTA
            let tbody = document.querySelector('#tbody');

            //PEERCORRER O ARRAY E IDENTIFICAR O ID DO ITEM QUE FOI SELECIONADO
            for(let i = 0; i < this.arrayPagamentos.length; i++){

                //RETIRA O ATRIBUTO DA IMAGENS DE DELETAR PARA SER ATUALIZADO
                document.querySelector(`#delete${this.arrayPagamentos[i].id}`).removeAttribute('onclick');

                //RETIRA O ATRIBUTO DA IMAGENS DE DELETAR PARA SER ATUALIZADO
                document.querySelector(`#edicao${this.arrayPagamentos[i].id}`).removeAttribute('onclick');

                //APAGA O REGISTRO NO ARRAY SE ELE FOR ENCONTRADO
                if(id == this.arrayPagamentos[i].id){
                    
                    this.arrayPagamentos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }

            //PERCORRE O ARRAY REALIZAR ATUALIZAÇÕES DE TELA E MODIFICAÇÕES DE IDs DOS COMPONENTES
            for (let i = 0; i < this.arrayPagamentos.length; i++) {           
                if (id <= this.arrayPagamentos[i].id) {
                    
                    //PEGA O ID DE CADA ITEM DO ARRAY E TIRA 1
                    this.arrayPagamentos[i].id = this.arrayPagamentos[i].id - 1;

                    //ADICIONA UM NOVO ATRIBUTO A IMAGEM DE DELETAR, ATUALIZANDO O ID DO PAGAMENTO
                    document.querySelector(`#delete${this.arrayPagamentos[i].id + 1}`).setAttribute("onclick", "addPagamento.deletar("+ this.arrayPagamentos[i].id +")");

                    //ATUALIZA O ID DA IMAGEM DE DELETAR
                    document.querySelector(`#delete${this.arrayPagamentos[i].id + 1}`).id =  `#delete${this.arrayPagamentos[i].id}`;

                    //ADICIONA UM NOVO ATRIBUTO A IMAGEM DE EDITAR, ATUALIZANDO O ID DO PAGAMENTO
                    document.querySelector(`#edicao${this.arrayPagamentos[i].id + 1}`).setAttribute("onclick", "addPagamento.preparaEdicao("+ this.arrayPagamentos[i].id +")");

                    //ATUALIZA O ID DA IMAGEM DE EDITAR
                    document.querySelector(`#edicao${this.arrayPagamentos[i].id + 1}`).id =  `#edicao${this.arrayPagamentos[i].id}`;

                //PEGA A TABELA COM O ID ANTIGO E TIRA 1 DELA (VALOR DO ID -1)
                    document.querySelector(`#celula${this.arrayPagamentos[i].id + 1}`).innerText = this.arrayPagamentos[i].id;

                //MODA O ID DA TABELA (ID - 1)
                    document.querySelector(`#celula${this.arrayPagamentos[i].id + 1}`).id = `#celula${this.arrayPagamentos[i].id}`;
                }
            }
            //RETIRA 1 DO ID GLOBAL, PARA QUE O NOVO PAGAMENTO REGISTRADO TENHA O ID CORRETO
            this.id--
        }
    }
}

var addPagamento = new adicionarPagamento();