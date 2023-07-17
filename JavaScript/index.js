document.querySelector('#entrar').addEventListener('click', () => {
    let aparecer = document.querySelector('#bemVindo');
    aparecer.show();
    setTimeout(()=> {
        aparecer.close();
        window.open('../HTML/paginaPrincipal.html','_self');
    }, '1000');
});