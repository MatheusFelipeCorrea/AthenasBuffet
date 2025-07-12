package br.com.atenasbuffet.api.dto;

// DTO para transferir os dados do cliente
public class ClienteDTO {
    private Long idcliente;
    private String nome;
    private String cpf;
    private String telefone;
    private String bairro;
    private String cep;
    private String complemento;
    private String numero;
    private String rua;

    // Construtor vazio (necessário para serialização/deserialização)
    public ClienteDTO() {
    }

    // Construtor com parâmetros
    public ClienteDTO(Long idcliente, String nome, String cpf, String telefone, String bairro, String cep, String complemento, String numero, String rua) {
        this.idcliente = idcliente;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.bairro = bairro;
        this.cep = cep;
        this.complemento = complemento;
        this.numero = numero;
        this.rua = rua;
    }

    // Getters e Setters
    public Long getIdcliente() {
        return idcliente;
    }

    public void setIdcliente(Long idcliente) {
        this.idcliente = idcliente;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }
}
