# Atenas Buffet


**Rayssa Pierre da Silva Ramiro, rayssa.pierre@sga.pucminas.br**

**Lorena Aparecida de Paula Pereira,
lappereira@sga.pucminas.br**

**Débora Campos Sigaud, dcsigaud@sga.pucminas.br**

**Diogo Henrique Moreira da Silva, dhmsilva@sga.pucminas.br**

**Matheus Felipe Correa da Silva, matheusfelipecorreasilva@hotmail.com**

**Sofia Vasconcelos Moreira e Silva, sofiavasconcelosmsilva@gmail.com**

---

Professores:

** Prof. Aline Norberta de Brito **

** Prof. Eveline Alonso Veloso **

** Prof. Juliana Amaral Baroni de Carvalho **

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

**Resumo**. Este projeto desenvolveu um sistema web para automatizar a gestão do Buffet Atenas, resolvendo problemas de desorganização causados pela dependência do WhatsApp. A plataforma integra funcionalidades como solicitação de orçamento, personalização de cardápio, seleção de garçons e coleta de feedback, otimizando processos administrativos e aprimorando a experiência do cliente. O sistema foi projetado com foco na otimização de processos, centralização de informações, acompanhamento em tempo real e flexibilidade, buscando diferenciar o Buffet Atenas em um mercado competitivo. Os resultados demonstram a eficácia da solução na resolução do problema proposto e o aprendizado prático da equipe no desenvolvimento de um sistema completo.

---


## 1. Introdução

A seguir, será apresentado o projeto do site 'Athenas Buffet', detalhando suas funcionalidades, design e recursos técnicos desenvolvidos para proporcionar uma experiência interativa e intuitiva aos usuários, refletindo a elegância e a sofisticação dos serviços oferecidos pelo buffet.

### [1.1 Contextualização](https://www.reclameaqui.com.br/santa-bagunca-buffet/2-festas-marcadas-para-o-mesmo-dia-e-horario_14438541/)



A organização de eventos é uma atividade multifacetada que envolve planejamento, coordenação e execução de vários tipos de eventos, como conferências, feiras, festas e casamentos. No cenário atual, caracterizado pela crescente digitalização e pela demanda por soluções mais eficazes, a utilização de ferramentas tecnológicas avançadas tornou-se essencial para atender às necessidades dos organizadores de eventos. Essas ferramentas ajudam a evitar problemas como a marcação de eventos diferentes no mesmo local e data.

Um exemplo de como a falta de um sistema eficiente pode causar transtornos é o incidente ocorrido no Buffet Santa Bagunça em São Paulo no dia 08/08/2015. Neste caso, a falta de uma ferramenta adequada resultou na marcação de duas festas no mesmo dia e local, levando a uma série de problemas e frustrações para os envolvidos. Esse tipo de situação evidencia a importância de um sistema de gerenciamento de eventos para garantir que não haja conflitos de agendamento e para melhorar a coordenação e comunicação entre todas as partes envolvidas.


### 1.2 Problema

O BOOM Festas estava enfrentando sérios problemas de desorganização devido ao uso exclusivo do WhatsApp para administrar todos os aspectos do buffet. Confiar apenas em um aplicativo de mensagens para gerenciar a comunicação, os pedidos, a organização dos eventos e as finanças resultava em várias complicações. Sem um sistema estruturado, muitas tarefas eram feitas repetidamente, e detalhes importantes frequentemente precisavam ser confirmados várias vezes. Isso causava atrasos, pois a dificuldade em acessar informações rapidamente e a comunicação desorganizada levavam a respostas lentas e a uma coordenação ineficaz dos eventos. Além disso, havia o risco constante de perder informações importantes, já que mensagens essenciais podiam se perder em meio a uma grande quantidade de conversas. Diante desses desafios, ficou claro que era necessária uma solução tecnológica que centralizasse e organizasse todas as operações do buffet, automatizando os processos e proporcionando uma gestão mais eficiente e uma melhor experiência para os clientes.

Por isso, surgiu a necessidade de criar uma solução tecnológica que reunisse todas as operações do buffet em um único sistema. O objetivo é automatizar as tarefas, melhorar a eficiência e proporcionar uma experiência mais organizada tanto para a gestão do buffet quanto para os clientes._

### 1.3 Objetivo geral

O objetivo deste trabalho é desenvolver um sistema web para automatizar e integrar os processos de gestão de um buffet.

#### 1.3.1 Objetivos específicos

1.3.1.1 Automatizar Processos Administrativos 

- Intuito de facilitar o controle de reserva e agendamentos de eventos. 

1.3.1.2 Gerenciar Cardápios

- Permitir a criação e customização de cardápios de acordo com o evento.

1.3.1.3 Agendar Eventos 

- Oferecer um calendário integrado para gerenciar datas de eventos, reuniões com clientes e outras obrigações. 

1.3.1.4 Gerenciar Estoque

- Gerenciar pedidos de fornecedores e entrada de mercadorias. 

### 1.4 Justificativas

A tarefa de criar um buffet costuma ser um grande desafio e com a crescente demanda por experiências personalizadas e de alta qualidade, a eficiência operacional tornou-se um diferencial competitivo crucial. Foi com base nessas necessidades que desenvolvemos um programa específico para buffets, embora já existam soluções no mercado buscamos criar uma alternativa que atenda completamente às necessidades especificas de cada tipo de evento. 

Este programa foi desenvolvido com foco especial em quatro pilares: 

- Otimização de Processo  

- Centralização de Informação  

- Acompanhamento em Tempo Real 

- Personalização e Flexibilidade 

Com esses focos, buscamos não apenas criar uma ferramenta, mas oferecer uma solução que atenda de forma completa e diferenciada às necessidades dos buffets, permitindo que eles se destaquem em um mercado altamente competitivo.

## 2. Participantes do processo

Os principais participantes do processo de um evento incluem os clientes, que contratam a empresa, e os terceirizados, como consultores de eventos, responsáveis por entender as necessidades e planejar; a equipe que cuida da montagem, desmontagem; a equipe de catering, que providencia comida e bebida; e os gerentes de eventos, que supervisionam todo o processo para garantir que tudo ocorra conforme o planejado.

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

Atualmente, a gestão de buffets é realizada de forma fragmentada e manual, utilizando planilhas para controle de estoque e finanças, comunicação por e-mail ou telefone para organizar eventos, e agendas físicas ou digitais para gerenciamento de datas. Contratos e pagamentos são processados separadamente, muitas vezes sem integração entre as etapas, o que pode gerar inconsistências e erros. A coleta de feedback é informal e descentralizada, limitando a capacidade de análise e melhoria contínua. O sistema proposto visa unificar e automatizar esses processos, oferecendo uma solução centralizada para uma gestão mais eficiente e organizada.

### 3.2. Descrição geral da proposta de solução

A proposta para o site "Athenas Buffet" é criar uma plataforma que torne a gestão de eventos mais eficiente e fácil. O site terá as seguintes funções principais:

1. **Solicitação de Orçamento**: O cliente começa escolhendo o buffet desejado e solicita um orçamento diretamente no site. O sistema calculará automaticamente os custos com base nas opções selecionadas e enviará uma proposta personalizada.

2. **Escolha do Menu**: Após receber o orçamento, o cliente poderá revisar e escolher os itens do menu de forma simples e direta, personalizando suas opções de pratos e bebidas conforme suas preferências.

3. **Seleção de Garçom pelo Buffet**: Com o menu definido, o buffet selecionará a equipe de garçons ou serviço para o evento. O site permitirá que o buffet escolha os profissionais adequados, considerando suas especialidades e disponibilidade.

4. **Feedback Pós-Evento**: Após a realização do evento, o cliente poderá fornecer sua opinião sobre os serviços prestados. Esse feedback ajudará a melhorar a qualidade do atendimento e dos serviços oferecidos.

O site integrará essas funções de maneira prática, facilitando a gestão de eventos e proporcionando uma experiência aprimorada tanto para os clientes quanto para o buffet.


### 3.3. Modelagem dos processos

[PROCESSO 1 -Solicitação de Orçamento](processo-1-Solicitação-de-Orçamento.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Seleção do Menu](processo-2-Seleção-de-Menu.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Seleção de Garçom](processo-3-Seleção-de-Garçons.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Feedback Pós-Evento](processo-4-Feedback-Pós-eventos.md "Detalhamento do Processo 4.")

## 4. Projeto da solução


[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")


## 5. Indicadores de desempenho


[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema


[Documentação da interface do sistema](interface.md)

## 7. Conclusão


O projeto apresenta uma maneira de otimizar a gestão de eventos, facilitando processos como orçamentos, gestão de cardápios e seleção de profissionais. Durante o desenvolvimento, enfrentamos diversos desafios, tanto no trabalho em equipe quanto na aplicação prática dos conceitos aprendidos em aula. Esses obstáculos, embora desafiadores, foram fundamentais para fortalecer nossas habilidades técnicas, colaborativas e de resolução de problemas. Além disso, o projeto nos proporcionou a oportunidade de vivenciar o processo completo de desenvolvimento de um sistema, desde a concepção até a implementação. Essa experiência reforçou a importância da prática acadêmica para nossa formação, preparando-nos para demandas reais do mercado e destacando o valor do aprendizado contínuo.

Diogo Henrique – Este trabalho foi bem enriquecedor, afinal me permitiu desenvolver novas habilidades tais como a implantação de um banco de dados e integração do front-end com o back-end. Além de poder ver o impacto que a parte mais teórica do curso, como a modelagem de processo, tem na parte pratica.

Rayssa Pierre - O projeto me proporcionou experiência prática no desenvolvimento web, desde a concepção até a implementação.

Lorena Aparecida - O projeto me desafiou a buscar soluções criativas para problemas complexos, estimulando meu pensamento crítico.

Débora Campos - Lidar com as dificuldades técnicas do projeto me tornou mais resiliente e persistente na busca por soluções.

Matheus Felipe - O trabalho em equipe me ajudou a melhorar minha comunicação e a capacidade de receber feedback.

Sofia Vasconcelos - A experiência me motivou a buscar novas oportunidades na área de desenvolvimento web.

# REFERÊNCIAS


**[1.1]** - _ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001._

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._

**[1.6]** - https://www.reclameaqui.com.br/santa-bagunca-buffet/2-festas-marcadas-para-o-mesmo-dia-e-horario_14438541/


# APÊNDICES


## Apêndice A - Código fonte

[Código do front-end](../src/Front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






