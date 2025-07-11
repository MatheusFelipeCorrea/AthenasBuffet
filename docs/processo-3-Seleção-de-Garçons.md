### 3.3.3 Processo 3 – Seleção de Garçons

![Seleção de Garçom](https://github.com/user-attachments/assets/e8258e39-9295-454c-9924-2cd9136fd031)


### Descrição Geral
O processo de Seleção de Garçons é uma fase crítica para assegurar que a equipe de atendimento do evento esteja qualificada e preparada para atender as expectativas do cliente. Conduzido pelo gerente do buffet, esse processo inclui a análise de perfis e a escolha de profissionais adequados para o tipo de evento. O objetivo é garantir que os garçons selecionados possuam as habilidades e a experiência necessárias para proporcionar um atendimento eficiente e de alta qualidade.
### Preencher Formulário de Procura (Gerente Buffet)

| Campo                       | Tipo           | Restrições            | Valor Default |
|-----------------------------|----------------|-----------------------|---------------|
| Idade Minima                | Caixa de texto |                       |               |
| Cargo                       | Caixa de Texto |                       |               |
| Descrição da Vaga de Emprego| Área de texto  |                       |               |
| Experiência Prévia          | Área de texto  |                       |               |
| Qualificações Procuradas    | Área de texto  |                       |               |
| Habilidades Exigidas        | Área de texto  |                       |               |
| Atuação                     | Área de texto  |                       |               |
| Data e Jornada de Trabalho  | Caixa de Texto |                       |               |
| CEP                         | Caixa de Texto |                       |               |
| Bairro                      | Caixa de Texto |                       |               |
| Rua                         | Caixa de Texto |                       |               |
| Número                      | Caixa de Texto |                       |               |
| Salário                     | Caixa de Texto |                       |               |
| Benefícios                  | Caixa de Texto |                       |               |


**Comandos:**

| Nome do botão/link    | Destino                                | Tipo   |
|-----------------------|----------------------------------------|--------|
| Publicar Vaga         | Analisar Vaga                          | default|


### Analisar Vaga

| Campo                       | Tipo           | Restrições            | Valor Default |
|-----------------------------|----------------|-----------------------|---------------|
| Cargo                       | Não Editavel   |                       |               |
| Buffet                      | Não Editavel   |                       |               |
| Idade Minima                | Não Editavel   |                       |               |
| Descrição                   | Não Editavel   |                       |               |
| Experiência Prévia          | Não Editavel   |                       |               |
| Qualificações               | Não Editavel   |                       |               |
| Habilidades                 | Não Editavel   |                       |               |
| Atuação                     | Não Editavel   |                       |               |
| Salário                     | Não Editavel   |                       |               |
| Benefícios                  | Não Editavel   |                       |               |
| Endereço                    | Não Editavel   |                       |               |
| Data e Jornada de Trabalho  | Não Editavel   |                       |               |


**Comandos:**
| Nome do botão/link | Atividade/processo de destino                    | Tipo   |
|--------------------|--------------------------------------------------|--------|
| Candidatar-se      | Envia candidatura para o Banco de Dados          | default|
| Busca              | Encontra palavra                                 | default|



### Analisar Candidatura

| Campo                       | Tipo           | Restrições            | Valor Default |
|-----------------------------|----------------|-----------------------|---------------|
| Cargo                       | Não Editavel   |                       |               |
| Descrição                   | Não Editavel   |                       |               |
| Data e Jornada de Trabalho  | Não Editavel   |                       |               |
| Endereço                    | Não Editavel   |                       |               |
| Nome                        | Não Editavel   |                       |               |
| Telefone                    | Não Editavel   |                       |               |
| Status                      | Não Editavel   |                       |               |


**Comandos:**
| Nome do botão/link | Atividade/processo de destino                    | Tipo   |
|--------------------|--------------------------------------------------|--------|
| Publicar Vaga      | Redidreciona para o formulario                   | default|
| Fechar Vaga        | Muda os status da vaga no Banco de Dados         | default|
| Aceitar            | Muda os status da candidatura no Banco de Dados  | default|
| Recusar            | Muda os status da candidatura no Banco de Dados  | default|
| Busca              | Encontra palavra                                 | default|
