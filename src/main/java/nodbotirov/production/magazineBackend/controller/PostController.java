package nodbotirov.production.magazineBackend.controller;

import lombok.RequiredArgsConstructor;
import nodbotirov.production.magazineBackend.model.PostEntity;
import nodbotirov.production.magazineBackend.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping
    public List<PostEntity> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public PostEntity getPostById(@PathVariable long id) {
        return postService.getPostById(id);
    }

    @GetMapping("/category/{category}")
    public List<PostEntity> getPostsByCategory(@PathVariable String category) {
        return postService.getPostsByCategory(category);
    }

    @PostMapping
    public PostEntity createPost(@RequestBody PostEntity post) {
        return postService.createPost(post);
    }

    @DeleteMapping("/{id}")
    public void deletePostById(@PathVariable long id) {
        postService.deletePost(id);
    }
}
