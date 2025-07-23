package com.riddhi.joblisting_backend.jobs;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class KeepAliveTask {

    private final RestTemplate restTemplate = new RestTemplate();

    // Ping every 10 minutes (600,000 milliseconds)
    @Scheduled(fixedRate = 600000)
    public void pingSelf() {
        try {
            String url = "https://job-portal-cj3n.onrender.com/api/ping";
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("Pinged self successfully: " + response);
        } catch (Exception e) {
            System.err.println("Self-ping failed: " + e.getMessage());
        }
    }
}
