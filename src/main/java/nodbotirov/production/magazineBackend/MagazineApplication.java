package nodbotirov.production.magazineBackend;

import nodbotirov.production.magazineBackend.model.AdminEntity;
import nodbotirov.production.magazineBackend.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class MagazineApplication {

    public static void main(String[] args) {
        SpringApplication.run(MagazineApplication.class, args);
    }

    @Bean
    public CommandLineRunner initAdmin(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (adminRepository.findByUsername("admin").isEmpty()) {
                AdminEntity admin = new AdminEntity();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("maydon2026"));
                adminRepository.save(admin);
                System.out.println("Admin yaratildi: username=admin, password=maydon2026");
            }
        };
    }
}
