# Show do Milhão da OBI
Projeto desenvolvido como parte do projeto de extensão para a preparação de alunos do ensino fundamental de Crateús para a OBI. A aplicação simula um jogo no estilo "Show do Milhão", ajudando os alunos a praticar conteúdos de forma interativa.

🚀 Tecnologias Utilizadas
- Front-end: Next.js com Tailwind CSS
- Back-end: C# (.NET)
- Banco de Dados: MySQL
📂 Como Rodar o Projeto
✅ Pré-requisitos
- Node.js e npm/yarn
- .NET SDK
- MySQL

💻 Rodando o Front-end
1. Acesse a pasta do front-end:
```bash
cd webui
```
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor:
```bash
npm run dev
```
4. Acesse http://localhost:3000 no navegador.

🔧 Rodando o Back-end
1. Acesse a pasta do back-end
```bash
cd core
```
2. Restaure as dependências
```bash
dotnet restore
```
3. Configure a conexão com o MySQL no arquivo de configuração.
4. Execute a aplicação:
```bash
dotnet run
```
5. A API estará disponível em http://localhost:5000.
