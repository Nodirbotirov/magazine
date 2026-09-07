package nodbotirov.production.magazineBackend.service;

import lombok.RequiredArgsConstructor;
import nodbotirov.production.magazineBackend.model.PostEntity;
import nodbotirov.production.magazineBackend.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;


    public List<PostEntity> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public PostEntity getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post topilmadi: id=" + id));
    }

    public List<PostEntity> getPostsByCategory(String category) {
        return postRepository.findAllByCategory(category);
    }

    public PostEntity createPost(PostEntity post) {
        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post topilmadi: id=" + id);
        }
        postRepository.deleteById(id);
    }


}
