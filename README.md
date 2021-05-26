<h1>Sistema de Estoque</h1>

<h2> Instalação local</h2>
<p>Dentro do diretorio, Deve ser feito a instalação das dependencias com o seguinte comando:</p>
<p><i>- npm install;</i></p>


<h2>Iniciando servidor</h2>

<p>Após isso, para iniciar, dentro do diretorio raiz, deve ser executado o seguinte comando:</p>
<p><i>- npm run serve;</i></p>
<p><i>- Tambem é necessario executar o aplicativo API_estoque;</i></p>


<h2> Orientações </h2>

<p>- Por padrão, a aplicação estará configurada para escutar a porta 8080, para altera-la, executar o seguinte comando: </p><br>

<p><i>- npm run serve -- --port "PORTA DESEJADA"</i></p>

<p>- Ao iniciar no navegador com as URL Local: http://localhost:8080/ ou Network: http://192.168.1.6:8080/, será carregado o app no Modelo single page app, onde é possivel vizualizar o estoque, inserir um novo material, realizar alterações e deletar; Para inserir um novo material, deve ir na opção "inserir", no menu superior:</p>

<img src="./git_img/estoque_all.png">

<p>- Para inserir um novo material, deve ser realizado o preenchimento do formulario a seguir:</p>

<img src="./git_img/estoque_insert.png">

<p>- Para deletar um material, é necessario clicar no icone da lixeira, onde deve ser confirmado o delete por meio de um alerta: </p>

<img src="./git_img/estoque_delet.png">
<br>
<img src="./git_img/estoque_delet_confirm.png">

<p>- Para realizar alterações nos materiais cadastrados, deve ir na opção editar, no icone de Lapis: - Ao clicar, sera apresentado a tela para editar os campos, informando o Id para escolher o material:</p>

<img src="./git_img/estoque_update_icon.png">

<p>- Ao clicar, sera apresentado a tela para editar os campos, informando o Id para escolher o material: </p>

<img src="./git_img/estoque_update.png">

<p>- Para alterar um material, deve ser confirmado o delete por meio de um alerta:</p>

<img src="./git_img/estoque_update_confirm.png">


<i> Projeto para demonstar um projeto SPA em constante mudança, avançando para melhoria e implementações de novas funcionalidas;</i>







