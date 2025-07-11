### 3.3.1 Processo 2 – Seleção do Menu

![Seleção de Menu](https://github.com/user-attachments/assets/6f6c941b-6b3e-4528-96ca-696614518f71)


### Descrição Geral
O processo de Seleção do Menu é uma etapa fundamental na organização de eventos, onde o cliente escolhe as opções de pratos e bebidas que serão servidos. Esse processo é conduzido pelo gerente do buffet e envolve a personalização do cardápio de acordo com as preferências e necessidades do cliente. O objetivo é garantir que as escolhas do menu estejam de acordo com o tema e o público do evento, oferecendo uma experiência gastronômica de qualidade.

**Preencher dados do menu**

| Campo                     | Tipo           | Restrições               | Valor default |
|---------------------------|----------------|--------------------------|---------------|
| Sobremesa                 | Caixa de Texto |                          |               |
| Prato Principal           | Caixa de Texto |                          |               |
| Acompanhamento            | Caixa de Texto |                          |               |
| Bebidas                   | Caixa de Texto |                          |               |
| Entrada                   | Seleção única  |                          |               |
| Opções Vegetarianas       | Seleção única  |                          |               |
| Orçamento Máximo          | Numero         |                          |               |
| Observações               | Caixa de Texto |                          |               |


**Comandos**:

| Nome do botão/link | Atividade/processo de destino       | Tipo     |
|--------------------|-------------------------------------|----------|
| Enviar             | Envia formulario para o Banco de Dados| default|


**Analisar formulário (Gerente do Buffet)**

| Campo                     | Tipo           | Restrições               | Valor default |
|---------------------------|----------------|--------------------------|---------------|
| Cliente                   | Não Editavel   |                          |               |
| Data do Evento            | Não Editavel   |                          |               |
| Tipo do Evento            | Não Editavel   |                          |               |
| Prato Principal           | Não Editavel   |                          |               |
| Acompanhamento            | Não Editavel   |                          |               |
| Bebidas                   | Não Editavel   |                          |               |
| Entrada                   | Não Editavel   |                          |               |
| Opções Vegetarianas       | Não Editavel   |                          |               |
| Orçamento Máximo          | Não Editavel   |                          |               |
| Observações               | Não Editavel   |                          |               |

**Comandos**:

|    Nome do botão/link    | Atividade/processo de destino       | Tipo     |
|--------------------------|-------------------------------------|----------|
| Enviar Orçamento de menu | Redireciona para a tela envio de orçamento| default|


**Enviar Orçamentos**

| Campo                     | Tipo           | Restrições               | Valor default |
|---------------------------|----------------|--------------------------|---------------|
| Nome Completo             | Caixa de Texto |                          |               |
| CPF                       | Caixa de Texto |                          |               |
| Nome do Restaurante       | Caixa de Texto |                          |               |
| CNPJ                      | Número         |                          |               |
| CEP                       | Número         |                          |               |
| Rua                       | Número         |                          |               |
| Numero                    | Número         |                          |               |
| Telefone                  | Número         |                          |               |
| Preço                     | Número         |                          |               |

**Comandos**:

| Nome do botão/link | Atividade/processo de destino         | Tipo     |
|--------------------|---------------------------------------|----------|
| Adicionar          |Envia dados para o Banco de Dados      | default  |


**Escolher Orçamentos**

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

**Comandos**:

| Nome do botão/link | Atividade/processo de destino         | Tipo     |
|--------------------|---------------------------------------|----------|
| Aceitar             | Muda Status no Banco de Dados        | default  |
| Recusadar           | Muda Status no Banco de Dados        | default  |
| Novo Evento     | Redireciona para a Escolher buffe| default|
| Concluido       | Muda os status do evento       | default  |
| Cancelado       | Muda os status do evento       | default  |
| Estrela         | Redireciona para a avalição do evento| default|

