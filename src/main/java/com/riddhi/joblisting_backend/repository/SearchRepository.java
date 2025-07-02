package com.riddhi.joblisting_backend.repository;

import com.riddhi.joblisting_backend.model.Post;
import java.util.List;

public interface SearchRepository {
    List<Post> findByText(String text);
}
