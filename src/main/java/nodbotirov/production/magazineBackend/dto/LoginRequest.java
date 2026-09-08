package nodbotirov.production.magazineBackend.dto;

import lombok.Data;

@Data
public class LoginRequest {

    private String username;
    private String password;
}
