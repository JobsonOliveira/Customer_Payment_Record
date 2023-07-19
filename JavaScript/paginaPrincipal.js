//EVENTO PARA O BUTTON ABRIR O POPPUT PARA ADCICIONAR UM NOVO PAGAMENTO
let modal = document.querySelector("#dialogAddPag");
document.querySelector('#RegistPag').addEventListener('click', () => {
   modal.show();
   document.querySelector('#salvar').innerHTML = 'Salvar';
   
});
//FECHA O POPPUP DE ADIÇÃO DE PAGAMENTO
document.querySelector('#fechar').addEventListener('click', () => {
    modal.close();
});
//APAGA OS DADOS QUE FORAM DIGITADOS NO POPPUP
document.querySelector('#apagar').addEventListener('click', () => {
    alert('Dados deletados');
});

//SALVA OS DADOS QUE FORAM DIGITADOS NO POPPUP
document.querySelector('#salvar').addEventListener('click', () => {
   //UTILIZAÇÃO DO DOM
   let nome = document.querySelector("#cliente").value;
   let vencimento = new Date(document.querySelector("#vencimento").value);
   let pagamento = new Date(document.querySelector("#pagamento").value);
   let valor = document.querySelector("#valor").value;
   let forma = document.querySelector("#forma").value;
   
   //VERIFICA SE TEM ALGUM CAMPO QUE NÃO FOI PREENCHIDO
   if((nome == '') || (vencimento == '') || (pagamento == '')|| (valor == '') || (forma == '')){

        document.querySelector('#mensagensNovPag').innerText = "Verifique se todas as informações foram fornecidas!";
        let msg = document.querySelector('#MensagensSobreAddPag');
        msg.show();
   
        setTimeout(() =>{
            msg.close();
        }, '3000');
   }
    //ADICIONA O NOVO PAGAMENTO
    else{
        //VERIFICA SE A DATA DE VENCIMENTO DIGITADA É VÁLIDA
        if(isNaN(vencimento.getTime())){
        
            document.querySelector('#mensagensNovPag').innerText = "Data de Vencimento inválida!";
            let msg = document.querySelector('#MensagensSobreAddPag');
            msg.show();
   
            setTimeout(() =>{
                msg.close();
            }, '3000');
        }
        //VERIFICA SE A DATA DE PAGAMENTO DIGITADA É VÁLIDA
        else if(isNaN(pagamento.getTime())){

            document.querySelector('#mensagensNovPag').innerText = "Data de pagamento inválida!";
            let msg = document.querySelector('#MensagensSobreAddPag');
            msg.show();
   
            setTimeout(() =>{
                msg.close();
            }, '3000');
        }
        //ACEITA OS DADOS E SEGUE O PROCEDIMENTO DE IMPLEMENTAÇÃO
        else{
            addPagamento.salvar();
        }

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
class adicionarPagamento{
   constructor() {
       this.id = 1;
       //CRIAR ARRAY PRINCIPAL
       this.arrayPagamentos = [];
       this.editId = null;
   }
   
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
       if(this.editId == null){
           this.adicionar(pagamento);
       }else{
           this.atualizar(this.editId, pagamento);

       }
       
       this.listaTabela();
       this.limpar();
   }
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
   adicionar(pagamento){
   
       this.arrayPagamentos.push(pagamento);
       this.id++;
   }
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
           
           //--------------------------------------------VERIFICAR
           //if(this.arrayPagamentos[i].id >= 1){
               //ADICIONA UMA CLASSE AO CÉLULA 'ID' DO PAGAMENTO
               td_id.id = "celula" + this.arrayPagamentos[i].id - 1;
           //}

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
            document.querySelector("#forma").value = '';


           let imgEdit = document.createElement('img');
    imgEdit.src = '../Imagens/lapis.png';
    imgEdit.setAttribute("onclick", "addPagamento.preparaEdicao("+ JSON.stringify(this.arrayPagamentos[i]) +")");
                
    let imgDelete = document.createElement('img');
    imgDelete.src = '../Imagens/lixeira.png';
    imgDelete.setAttribute("onclick", "addPagamento.deletar("+ this.arrayPagamentos[i].id +")");
        
    //ADICIONAR A IMAGEM AO td_acoes (DIZER QUE É UMA FILHA DE td_acoes) logo acima
    td_Acao.appendChild(imgEdit);
    td_Acao.appendChild(imgDelete);
       }			
   }
   preparaEdicao(pagamento){
    this.editId = pagamento.id;

    let modal = document.querySelector("#dialogAddPag");
    modal.show();

    document.querySelector('#cliente').value = pagamento.nomeCliente;
    document.querySelector('#vencimento').value = pagamento.Vencimento;
    document.querySelector('#pagamento').value = pagamento.Pagamento;
    document.querySelector('#valor').value = pagamento.Valor;
    document.querySelector('#forma').value = pagamento.Forma;

    //MUDAR O NOME DO BOTÃO PARA "Atualizar"
    document.querySelector('#salvar').innerHTML = 'ATUALIZAR';

}
   limpar(){
   
       document.querySelector('#cliente').value = '';
       document.querySelector('#vencimento').value = '';
       document.querySelector('#pagamento').value = '';
       document.querySelector('#valor').value = '';
   
       this.editId = null;
       
   }
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
   deletar(id){
    if(confirm("Deseja realmente deletar estes dados?")){
        //ATUALIZAR A LISTA
        let tbody = document.querySelector('#tbody');
        var oId;
        //PEERCORRER O ARRAY E IDENTIFICAR O ID DO ITEM QUE FOI SELECIONADO
        for(let i = 0; i < this.arrayPagamentos.length; i++){
            if(this.arrayPagamentos[i].id == id){
                oId = this.arrayPagamentos[i].id;
                this.arrayPagamentos.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
        for (let i = 0; i < this.arrayPagamentos.length; i++) {            
            if ((oId <= this.arrayPagamentos[i].id) && (i + 2 == this.arrayPagamentos[i].id)) {
            alert(this.arrayPagamentos[i].id);
            alert(i + 2);
                document.querySelector(`#celula${this.arrayPagamentos[i].id}`).innerText = this.arrayPagamentos[i].id - 1;
                document.querySelector(`#celula${this.arrayPagamentos[i].id}`).id = `#celula${this.arrayPagamentos[i].id - 1}`			
            }
        }
    }
}
   
}
var addPagamento = new adicionarPagamento();