### 3.3.2 Processo 1 – Solicitação de Orçamento

![Seleção de Orçamento](https://github.com/user-attachments/assets/d95d57f7-eccd-4ccc-bd50-1e2bde10b878)

### Descrição Geral
O processo de Solicitação de Orçamento visa fornecer ao cliente uma estimativa detalhada dos custos relacionados aos serviços oferecidos pelo buffet. Realizado pelo gerente, essa etapa envolve a coleta de informações sobre o evento, como o número de convidados, data e tipo de menu, para gerar um orçamento preciso. O objetivo é fornecer uma visão clara e transparente dos custos, permitindo ao cliente tomar decisões informadas sobre a contratação dos serviços.


**Visualizar página principal**


| Comandos        | Destino                                    | Tipo     |
|-----------------|--------------------------------------------|----------|
| Área do Cliente | Início do processo de login/Registro       | default  |
| Sobre o Athenas | Rolagem da pagina                          | default  |
| Nossos Serviços | Rolagem da pagina                          | default  |
| Depoimentos     | Rolagem da pagina                          | default  |
| Inscrever-me    | Início do processo de login/Registro       | default  |
| Logout          | Apaga dados do LocalStorage                | default  |
| Acompanhar      | Redireciona para a pagina de acompanhamento| default  |


**Realizar cadastro**

| Campo           | Tipo             | Restrições                          | Valor default |
|-----------------|------------------|-------------------------------------|---------------|
| identificador   | Seleção única    | Cliente, BuffeT, Garçom             |               |
| nome completo   | Caixa de Texto   | Mínimo de 3 caracteres              |               |
| e-mail          | Caixa de Texto   | Formato de e-mail                   |               |
| senha           | Caixa de Texto   | Mínimo de 8 caracteres              |               |
| CPF/CNPJ        | Caixa de Texto   | Mínimo de 11 caracteres             |               |
| CEP             | Número           | Somente números                     |               |
| Rua             | Caixa de Texto   | Mínimo de 8 caracteres              |               |
| Numero          | Número           | Mínimo de 2 caracteres              |               |
| Complemento     | Caixa de Texto   | Mínimo de 2 caracteres              |               |
| telefone        | Número           | Somente números                     |               |
| Bairro          | Caixa de Texto   | Mínimo de 8 caracteres              |               |


| Comandos        | Destino                        | Tipo     |
|-----------------|--------------------------------|----------|
| Registrar-se    | Início do processo de login    | default  |
| Ja tem login    | Realizar Login                 | default  |




**Realizar login**

| Campo           | Tipo             | Restrições                          | Valor default |
|-----------------|------------------|-------------------------------------|---------------|
| identificador   | Seleção única    | Cliente, BuffeT, Garçom             |               |
| e-mail          | Caixa de Texto   | Formato de e-mail                   |               |
| senha           | Caixa de Texto   | Mínimo de 8 caracteres              |               |


| Comandos            | Destino                        | Tipo     |
|---------------------|--------------------------------|----------|
| Entrar              | Início do processo de login    | default  |
| Nao possui cadastro | Realizar Cadastro              | default  |


**Acompanhar Eventos**
| Campo                      | Tipo            | Restrições  | Valor default |
|----------------------------|-----------------|-------------|---------------|
| Evento                     | Não editavel    |             |               |
| Status                     | Não editavel    |             |               |
| data                       | Não editavel    |             |               |
| Horario                    | Não editavel    |             |               |
| duração                    | Não editavel    |             |               |
| convidados                 | Não editavel    |             |               |
| Equipamento                | Não editavel    |             |               |
| Orçamento Evento           | Não editavel    |             |               |
| Orçamento Maximo           | Não editavel    |             |               |
| Serviços Adicionais        | Não editavel    |             |               |
| Orçamento para menu        | Não editavel    |             |               |
| Endereço                   | Não editavel    |             |               |
| Nome do Restaurante       | Caixa de Texto |  Não editavel             |               |
| CNPJ                      | Número         |  Não editavel            |               |
| Endereço do Restaurante   | Caixa de Texto |  Não editavel            |               |
| Telefone do Restaurante   | Número         |  Não editavel            |               |
| Preço                     | Número         |  Não editavel            |               |
| Status                    | Número         |  Não editavel            |               |

| Comandos        | Destino                        | Tipo     |
|-----------------|--------------------------------|----------|
| Novo Evento     | Redireciona para a Escolher buffe| default|
| Concluido       | Muda os status do evento       | default  |
| Cancelado       | Muda os status do evento       | default  |
| Estrela         | Redireciona para a avalição do evento| default|



**Escolher um buffet**
| Campo           | Tipo            | Restrições                    | Valor default |
|-----------------|-----------------|-------------------------------|---------------|
| Nome            | Não editavel    |                               |               |
| Endereço        | Não editavel    |                               |               |
| Telefone        | Não editavel    |                               |               |


| Comandos        | Destino                          | Tipo     |
|-----------------|----------------------------------|----------|
| selecionar      | Responder formulário de orçamento| default  |



**Preencher dados de evento**
| Campo                      | Tipo            | Restrições                     | Valor default |
|----------------------------|-----------------|--------------------------------|---------------|
| Identificador              | Seleção única   | "Casamento, Aniversario, Formatura, Corpotativo Outro"|               |
| data                       | Data            | Formato: dd-mm-aaaa            |               |
| Horario                    | Hora            | Formato: dd-mm-aaaa            |               |
| duração do eventos         | Hora            | Formato: dd-mm-aaaa            |               |
| número de convidados       | Número          | Somente números                |               |
| CEP                        | Número          | Campo Obrigatorio              |               |
| Logradouro                 | Caixa de Texto  | Mínimo de 8 caracteres         |               |
| Numero                     | Número          | Campo Obrigatorio              |               |
| Complemento                | Caixa de Texto  | Campo Obrigatorio              |               |
| Estado                     | Caixa de Texto  | Mínimo de 2 caracteres         |               |
| Bairro                     | Caixa de Texto  | Mínimo de 8 caracteres         |               |
| cidade                     | Caixa de Texto  | Mínimo de 2 caracteres         |               |
| Equipamento e/ou estrutura | Seleção única   | Campo Obrigatorio              |               |
| Orçamento Maximo           | Numero          | Campo Obrigatorio              |               |
| Precisa de Orçamento Menu  | Seleção única   | "Sim, Não"                     |               |
| Outro serviço              | Seleção única   | "Manobrista, Segurança, Fottografia, limpeza, Outro"|               |


| Comandos        | Destino                        | Tipo     |
|-----------------|--------------------------------|----------|
| enviar          | Salva no BD e devolta ao acompanhe| default  |




**Analise de Orçamento**
| Campo                      | Tipo            | Restrições  | Valor default |
|----------------------------|-----------------|-------------|---------------|
| Cliente                    | Não editavel    |             |               |
| Status                     | Não editavel    |             |               |
| Horario                    | Não editavel    |             |               |
| data                       | Não editavel    |             |               |
| Tipo                       | Não editavel    |             |               |
| duração                    | Não editavel    |             |               |
| convidados                 | Não editavel    |             |               |
| Equipamento                | Não editavel    |             |               |
| Orçamento Maximo           | Não editavel    |             |               |
| Serviços Adicionais        | Não editavel    |             |               |
| Orçamento para menu        | Não editavel    |             |               |
| Endereço                   | Não editavel    |             |               |
| Orçamento                  | Numero          |             |               |

| Comandos        | Destino                        | Tipo     |
|-----------------|--------------------------------|----------|
| enviar          | Salva no BD e deixa o orçamento nao editavel| default  |
| enviar Orçamento de Menu| Formulario de orçamento de menu| default  |
| Estrela         | Redireciona para a avalição do evento| default  |
| Relatorios      | Procura termo na pagina        | default  |
| Avaliações      | Redireciona para a área de avalições | default  |
| Formulários de Evento| Muda os dados exibidos na tela | default  |
| Formulários de Menu| Muda os dados exibidos na tela | default  |
| Vagas e Candidatos| Muda os dados exibidos na tela | default  |



