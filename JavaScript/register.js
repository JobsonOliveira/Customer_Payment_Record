    document.querySelector('#btnCadastra').addEventListener('click', () => {
    let Nome = document.querySelector('#nome');
    let Sobrenome = document.querySelector('#sobrenome');
    let Login = document.querySelector('#login');
    let Senha = document.querySelector('#senha');
    let DataNascimento = document.querySelector('#dataNascimento');

    if((Nome.value == "") || (Sobrenome.value == "") || (Login.value == "") || (Senha.value == "") || (DataNascimento.value == "")){
       alert('Verifique se todas as informações foram fornecidas corretamente!');
    }else{
        let registrado = document.querySelector('#registrado');
        registrado.show();
        setTimeout(()=> {
            registrado.close();
            window.open('../index.html', '_self');
        }, '1000');
    }
});