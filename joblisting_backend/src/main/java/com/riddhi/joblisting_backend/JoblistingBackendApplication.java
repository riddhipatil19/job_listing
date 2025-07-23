package com.riddhi.joblisting_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class JoblistingBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(JoblistingBackendApplication.class, args);
    }
}
