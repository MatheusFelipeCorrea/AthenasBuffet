package br.com.atenasbuffet.api.model;

public class UserCredentials {
    private String email;
    private String password;
    private String identificador;

    // Construtores
    public UserCredentials() {}

    public UserCredentials(String email, String password, String identificador) {
        this.email = email;
        this.password = password;
        this.identificador = identificador;
    }

    // Getters e Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getIdentificador() { return identificador; }
    public void setIdentificador(String identificador) { this.identificador = identificador; }
}
