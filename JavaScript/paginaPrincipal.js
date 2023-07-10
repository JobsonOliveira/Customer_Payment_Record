//EVENTO PARA O BUTTON ABRIR O POPPUT PARA ADCICIONAR UM NOVO PAGAMENTO
let modal = document.querySelector("#dialogAddPag");
document.querySelector('#RegistPag').addEventListener('click', () => {
    modal.show();
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

    if((nome == '') || (valor == '') || (forma == '')){
alert('');
        document.querySelector('#mensagensNovPag').innerHTML = "Verifique se todas as informações foram fornecidas corretamente!";
        let msg = document.querySelector('#MensagensSobreAddPag');
        msg.show();
        setTimeout(() =>{
            msg.close();
        }, '3000');

    }else{

        const meses = ["01", "02", "03", "04", "05", "06", "07","08","09","10","11","12"];
	const dias = ["01", "02", "03", "04", "05", "06", "07","08","09","10","11","12","13", "14", "15", "16", "17", "18", "19","20","21","22","23","24", "25", "26","27","28","29","30","31"];

    //TRANSFORMA A DATA DE VENCIMENTO PARA UM FORMATO BRASILEIRO
	let venciFormatado = (dias[(vencimento.getDate())] + "/" + meses[(vencimento.getMonth())] + "/" + vencimento.getFullYear());

	//TRANSFORMA A DATA DE PAGAMENTO PARA UM FORMATO BRASILEIRO
	let pagamFormatado = (dias[(pagamento.getDate())] + "/" + meses[(pagamento.getMonth())] + "/" + pagamento.getFullYear());

    let msg = document.querySelector('#MensagensSobreAddPag');
    document.querySelector('#mensagensNovPag').innerHTML = "Pagamento registrado com supesso!";
    msg.show();
        //ZERRAR TODOS AS VARIÁVEIS
        setTimeout(() =>{
            msg.close();
            modal.close();
        }, '1500');
    
    }
});
/*AÇÃO DO BUTTON PARA SAIR DO SITE*/
document.querySelector('#sair').addEventListener('click', () =>{
    let sair = document.querySelector('#saindoDoSite');
    sair.show();

    setTimeout(() => {
        window.open('../index.html', '_self');
    }, "1000");
});
