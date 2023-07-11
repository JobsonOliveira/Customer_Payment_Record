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
    let contTabelas = 0;
    
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
        contTabelas += 1;

        //criando a linha da tabela
		 document.querySelector('#tablePagamentos').innerHTML = "<tr  class='InfoPagamentos'>jobi</tr>";
		 //criando as colunas da tabela
         
        msg.show();
        setTimeout(() =>{
            msg.close();
            modal.close();
        }, '1500');
        let msg = document.querySelector('#MensagensSobreAddPag');
        document.querySelector('#mensagensNovPag').innerText = "Pagamento registrado com supesso!";
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
 //APAGAR PAGAMENTO
 document.querySelector('#apagarPag').addEventListener('click', () => {
    alert('apagar');
 });
 //EDITAR PAGAMENTO
 document.querySelector('#editarPag').addEventListener('click', () => {
    alert('editar');
 });