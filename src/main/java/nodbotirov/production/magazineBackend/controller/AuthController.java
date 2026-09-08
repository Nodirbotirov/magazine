package nodbotirov.production.magazineBackend.controller;

import lombok.RequiredArgsConstructor;
import nodbotirov.production.magazineBackend.config.JwtUtil;
import nodbotirov.production.magazineBackend.dto.LoginRequest;
import nodbotirov.production.magazineBackend.model.AdminEntity;
import nodbotirov.production.magazineBackend.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        AdminEntity admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Login yoki parol noto'g'ri"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new RuntimeException("parol noto'g'ri");
        }
        String token = jwtUtil.generateToken(admin.getUsername());
        return Map.of("token", token);
    }
}
