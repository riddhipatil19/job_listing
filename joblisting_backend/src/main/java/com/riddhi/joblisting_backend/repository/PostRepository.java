package com.riddhi.joblisting_backend.repository;

import com.riddhi.joblisting_backend.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
}
