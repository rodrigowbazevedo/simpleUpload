simpleUpload Jquery Ajax upload
====================================

simpleUpload � um simples Jquery plugin para facilitar o envio de arquivos
sem depender de um formul�rio.

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

Se o par�metro `trigger` n�o for definido o envio ser� iniciado
no evento `change` do elemento.

### Data atribute
Todos os par�metros podem ser enviados via atributo

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

O par�metro `fields` recebe um json com campos a serem enviados ao Backend

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

O par�metro `types` recebe a lista de extens�es permitidas em caso
de arquivo inv�lido retorna o m�todo `error` com o parametro `erro`
e o atributo `type` com o valor 'fileType'

```javascript
$('#simpleUpload').simpleUpload({
	types: ['jpg', 'png', 'pdf'],
	error: function(erro){
		if(error.type == 'fileType') alert('Arquivo inv�lido.');
	}
});
```

### Tamnho permitido
O tamanho m�ximo por arquivo por padr�o � 5mb para mudar
use o par�metro `size` o valor deve ser passado em kb


```javascript
$('#simpleUpload').simpleUpload({
	size: 3072, // 3 mb
	types: ['jpg', 'png', 'pdf'],
	error: function(erro){
		if(error.type == 'size'){
			alert('Tamanho n�o permitido.');
		}else if(error.type == 'fileType'){
			alert('Arquivo inv�lido.');
		}else{
			...
		}
	}
});
```

O m�todo `error` chamado para arquivos inv�lidos fora o tamanho e para erro no retorno do Ajax


### Outros par�metros

O simpleUpload suporta a maioria dos par�metros que o $.ajax() suporta.

Os par�metros s�o:
- url ( string: Caminho do arquivo Backend )
- change ( function: m�todo onChange do input file  )
- types ( array: lista de extens�es permitidas )
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
