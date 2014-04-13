simpleUpload Jquery Ajax upload
====================================

simpleUpload é um simples Jquery plugin para facilitar o envio de arquivos
sem depender de um formulário.

## Usage

#### Html

```html
<input type="file" name="arquivo" id="simpleUpload" multiple >
<button type="button" id="enviar">Enviar</button>
```

#### Javascript

```javascript
$('#simpleUpload').simpleUpload({
	url: 'upload.php',
	trigger: '#enviar',
	success: function(data){
		alert('Envio com sucesso');
	}
});
```

#### PHP

```php
	$arquivo = $_FILES['arquivo'];
```

Se o parâmetro `trigger` não for definido o envio será iniciado
no evento `change` do elemento.

### Data atribute
Todos os parâmetros podem ser enviados via atributo

```html
<input type="file" name="arquivo_1" class="upload" data-trigger="#enviar1" data-url="upload1.php" multiple >
<button type="button" id="enviar1">Enviar 1</button>

<input type="file" name="arquivo_2" class="upload" data-trigger="#enviar1" data-url="upload2.php" multiple >
<button type="button" id="enviar2">Enviar 2</button>
```

```javascript
$('.upload').simpleUpload();
```

### On file change

Callback no evento `change` do elemento com retorno dos metadados
do arquivo

```javascript
$('#simpleUpload').simpleUpload({
	url: 'upload.php',
	change: function(files){
		$.each(files, function(i, file){
			alert('Nome: '+file.name+' - Tamanho: '+file.size+' - Tipo: '+file.type);
		});
	}
});
```

### Valores extras

O parâmetro `fields` recebe um json com campos a serem enviados ao Backend

```javascript
$('#simpleUpload').simpleUpload({
	fields: {
		valor : 'Valor 1',
		array : ['array 1', 'array 2']
	}
});
```

```php
	$arquivo = $_FILES['arquivo'];
	$valor = $_POST['valor'];
	$array = $_POST['array'];

	echo $valor;
	echo $array[0];
	echo $array[1];
```

### Arquivos permitidos

O parâmetro `types` recebe a lista de extensões permitidas, em caso
de arquivo inválido retorna o método `error` com o parametro `erro`
e o atributo `type` com o valor 'fileType'

```javascript
$('#simpleUpload').simpleUpload({
	types: ['jpg', 'png', 'pdf'],
	error: function(erro){
		if(error.type == 'fileType') alert('Arquivo inválido.');
	}
});
```

### Tamnho permitido
O tamanho máximo por arquivo por padrão é 5mb para mudar
use o parâmetro `size` o valor deve ser passado em kb,
em caso de tamanho inválido retorna o método `error` com o parametro `erro`
e o atributo `type` com o valor 'size'

```javascript
$('#simpleUpload').simpleUpload({
	size: 3072, // 3 mb
	types: ['jpg', 'png', 'pdf'],
	error: function(erro){
		if(error.type == 'size'){
			alert('Tamanho não permitido.');
		}else if(error.type == 'fileType'){
			alert('Arquivo inválido.');
		}else{
			...
		}
	}
});
```

O método `error` chamado para arquivos inválidos fora o tamanho e para erro no retorno do Ajax


### Outros parâmetros

O simpleUpload suporta a maioria dos parâmetros que o $.ajax() suporta.

Os parâmetros são:
- url ( string: Caminho do arquivo Backend )
- change ( function: método onChange do input file  )
- types ( array: lista de extensões permitidas )
- size ( int: tamanho permitido em kb )
- fields ( json: campos extra a serem enviados aceita array )
- error ( function: retorno de erro )
- success ( function: retorno de sucesso )
- beforeSend ( function: executado antes de enviar )
- async
- global
- dataType
- contents
- jsonp
- jsonpCallback
- password
- username
- statusCode

### Autor
- Email: rodrigowbazevedo@yahoo.com.br
- GitHub: https://github.com/rodrigowbazevedo
- Work: Programmer on  @ http://kmdois.com.br

