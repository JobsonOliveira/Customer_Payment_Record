	//EVENTO PARA O BUTTON ABRIR O POPPUT PARA ADCICIONAR UM NOVO PAGAMENTO
    let modal = document.querySelector("#dialogAddPag");
    document.querySelector('#RegistPag').addEventListener('click', () => {
       modal.show();
       
       //ZERAR OS INPUTs TODAS AS VEZES QUE O POPPUP FOR ABERTO
       document.querySelector("#cliente").value = '';
       document.querySelector("#vencimento").value = '';
       document.querySelector("#pagamento").value = '';
       document.querySelector("#valor").value = '';
       document.querySelector("#forma").value = '';
   
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
       
       const meses = ["01", "02", "03", "04", "05", "06", "07","08","09","10","11","12"];
       const dias = ["01", "02", "03", "04", "05", "06", "07","08","09","10","11","12","13", "14", "15", "16", "17", "18", "19","20","21","22","23","24", "25", "26","27","28","29","30","31"];
    
       //TRANSFORMA A DATA DE VENCIMENTO PARA UM FORMATO BRASILEIRO
       let venciFormatado = (dias[(vencimento.getDate())] + "/" + meses[(vencimento.getMonth())] + "/" + vencimento.getFullYear());
       //TRANSFORMA A DATA DE PAGAMENTO PARA UM FORMATO BRASILEIRO
       let pagamFormatado = (dias[(pagamento.getDate())] + "/" + meses[(pagamento.getMonth())] + "/" + pagamento.getFullYear());
       
       //VERIFICA SE TEM ALGUM CAMPO QUE NÃO FOI PREENCHIDO
       if((nome == '') || (venciFormatado.includes('undefined')) || (venciFormatado.includes('NaN')) || (pagamFormatado.includes('undefined')) || (pagamFormatado.includes('NaN')) || (valor == '') || (forma == '')){
           document.querySelector('#mensagensNovPag').innerText = "Verifique se todas as informações foram fornecidas corretamente!";
           let msg = document.querySelector('#MensagensSobreAddPag');
           msg.show();
           
           setTimeout(() =>{
               msg.close();
           }, '3000');
       }
       //ADICIONA O NOVO PAGAMENTO
       else{
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
   /* //APAGAR PAGAMENTO
    document.querySelector('#apagarPag').addEventListener('click', () => {
       alert('apagar');
    });
    //EDITAR PAGAMENTO
    document.querySelector('#editarPag').addEventListener('click', () => {
       alert('editar');
    });*/
    
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
           let pagamento = {}
               let vencimentoBoleto = new Date(document.querySelector("#vencimento").value);
               let pagamentoBoleto = new Date(document.querySelector("#pagamento").value);
       
               const meses = ["01", "02", "03", "04", "05", "06", "07","08","09","10","11","12"];
               const dias = ["01", "02", "03", "04", "05", "06", "07","08","09","10","11","12","13", "14", "15", "16", "17", "18", "19","20","21","22","23","24", "25", "26","27","28","29","30","31"];
    
               //TRANSFORMA A DATA DE VENCIMENTO PARA UM FORMATO BRASILEIRO
               let venciFormatado = (dias[(vencimentoBoleto.getDate())] + "/" + meses[(vencimentoBoleto.getMonth())] + "/" + vencimentoBoleto.getFullYear());
               //TRANSFORMA A DATA DE PAGAMENTO PARA UM FORMATO BRASILEIRO
               let pagamFormatado = (dias[(pagamentoBoleto.getDate())] + "/" + meses[(pagamentoBoleto.getMonth())] + "/" + pagamentoBoleto.getFullYear());
           
           pagamento.id = this.id;
           pagamento.nomeCliente = document.querySelector('#cliente').value;
           pagamento.Vencimento = venciFormatado;
           pagamento.Pagamento = pagamFormatado;
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
                   
   
               td_id.innerText = this.arrayPagamentos[i].id;
               td_NomeCli.innerText = this.arrayPagamentos[i].nomeCliente;
               td_Vencimento.innerText = this.arrayPagamentos[i].Vencimento;
               td_Pagamento.innerText = this.arrayPagamentos[i].Pagamento;
               td_Valor.innerText = this.arrayPagamentos[i].Valor;
               td_Forma.innerText = this.arrayPagamentos[i].Forma;	
               
               /*alert(`id: ${td_id.innerText} cliente: ${td_NomeCli.innerText} vencimento: ${td_Vencimento.innerText} pagamento: ${td_Pagamento.innerText} valor: ${td_Valor.innerText} forma: ${td_Forma.innerText}`);*/
                       
               
           }			
       }
       limpar(){
       
           document.querySelector('#cliente').value = '';
           document.querySelector('#vencimento').value = '';
           document.querySelector('#pagamento').value = '';
           document.querySelector('#valor').value = '';
           document.querySelector('#forma').value = '';
   
           this.editId = null;
           
       }
       atualizar(editId, pagamento){
           for (let i = 0; i < this.arrayPagamentos.length; i++) {
               if(this.arrayPagamentos[i].id == id){
                   this.arrayPagamentos[i].nomeCliente = pagamento.nomeCliente;
                   this.arrayPagamentos[i].Vencimento = pagamento.Vencimento;
                   this.arrayPagamentos[i].Pagamento = pagamento.Pagamento;
                   this.arrayPagamentos[i].Valor = pagamento.Valor;
                   this.arrayPagamentos[i].Forma = pagamento.Forma;
                   alert('atualizar');
               }	
           }
       }
       
   }
   var addPagamento = new adicionarPagamento();