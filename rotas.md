### Usuário
- (POST) - '/register' => Cria um usuário 
- (POST) - '/authenticate' => Faz login do usuário

### Instituição
- (POST) - '/registerInst' => Cria uma Instituição 
- (POST) - '/authenticateInst' => Faz login da Instituição
- (GET) - '/listInst' => Retorna todas as Instituições cadastradas

### Animal
- (POST) - '/animal' => Cadastra um animal 
- (GET) - '/animal' => Retorna todos os animais cadastrados
- (DELETE) - '/necessities' => Deleta uma necessidade de acordo com o id

### Necessidades
- (POST) - '/necessitie' => Cadastra uma Necessidade em uma Instituição
- (GET) - '/necessities' => Retorna todas as Necessidades cadastradas 
- (DELETE) - '/necessities' => Deleta uma necessidade de acordo com o id