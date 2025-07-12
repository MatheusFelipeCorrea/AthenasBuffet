package br.com.atenasbuffet.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "buffet")
public class Buffet {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long idbuffet;

private String nomeEstabelecimento;
private String email;
private String senha;
private String cnpj;
private String telefone;
private String bairro;
private String cep;
private String complemento;
private String identificador;
private String numero;
private String rua;

// Getters e Setters
public Long getIdbuffet() { return idbuffet; }
public void setIdbuffet(Long idbuffet) { this.idbuffet = idbuffet; }

public String getNomeEstabelecimento() { return nomeEstabelecimento; }
public void setNomeEstabelecimento(String nomeEstabelecimento) { this.nomeEstabelecimento = nomeEstabelecimento; }

public String getEmail() { return email; }
public void setEmail(String email) { this.email = email; }

public String getSenha() { return senha; }
public void setSenha(String senha) { this.senha = senha; }

public String getCnpj() { return cnpj; }
public void setCnpj(String cnpj) { this.cnpj = cnpj; }

public String getTelefone() { return telefone; }
public void setTelefone(String telefone) { this.telefone = telefone; }

public String getBairro() { return bairro; }
public void setBairro(String bairro) { this.bairro = bairro; }

public String getCep() { return cep; }
public void setCep(String cep) { this.cep = cep; }

public String getComplemento() { return complemento; }
public void setComplemento(String complemento) { this.complemento = complemento; }

public String getIdentificador() { return identificador; }
public void setIdentificador(String identificador) { this.identificador = identificador; }

public String getNumero() { return numero; }
public void setNumero(String numero) { this.numero = numero; }

public String getRua() { return rua; }
public void setRua(String rua) { this.rua = rua; }
}
