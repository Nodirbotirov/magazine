package nodbotirov.production.magazineBackend.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    private final String uploadDir = "uploads/";

    @PostMapping("/upload")
    public Map<String, String> uploadFile(
            @RequestParam("file")MultipartFile file
    ) throws IOException {

        // 1. uploadDir papkasi mavjudligini tekshiring, bo'lmasa yarating
        Files.createDirectories(Paths.get(uploadDir));

        // 2. noyob fayl nomi generatsiya qiling
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // 3. faylni diskka saqlang
        Path path = Paths.get(uploadDir + fileName);
        Files.write(path, file.getBytes());

        // 4. URL qaytaring
        return Map.of("url", "/uploads/" + fileName);
    }


}
