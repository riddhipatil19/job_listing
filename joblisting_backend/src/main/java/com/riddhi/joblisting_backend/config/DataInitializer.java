package com.riddhi.joblisting_backend.config;

import com.riddhi.joblisting_backend.model.*;
import com.riddhi.joblisting_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CandidateProfileRepository candidateProfileRepository;

    @Autowired
    private RecruiterProfileRepository recruiterProfileRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            initializeData();
        }
    }

    private void initializeData() {
        // Create Admin
        User admin = new User("admin","admin@jobportal.com", passwordEncoder.encode("admin123"), Role.ADMIN);
        userRepository.save(admin);

        // Create Recruiters
        User recruiter1 = new User("recruiter1","recruiter1@company.com", passwordEncoder.encode("recruiter123"), Role.RECRUITER);
        userRepository.save(recruiter1);

        RecruiterProfile recruiterProfile1 = new RecruiterProfile();
        recruiterProfile1.setUser(recruiter1);
        recruiterProfile1.setCompanyName("Tech Solutions Inc");
        recruiterProfile1.setAbout("Leading technology company specializing in software development");
        recruiterProfile1.setContactPerson("John Smith");
        recruiterProfile1.setPhone("+1-555-0101");
        recruiterProfileRepository.save(recruiterProfile1);

        User recruiter2 = new User("recruiter2","recruiter2@startup.com", passwordEncoder.encode("recruiter123"), Role.RECRUITER);
        userRepository.save(recruiter2);

        RecruiterProfile recruiterProfile2 = new RecruiterProfile();
        recruiterProfile2.setUser(recruiter2);
        recruiterProfile2.setCompanyName("Innovation Labs");
        recruiterProfile2.setAbout("Fast-growing startup in AI and machine learning");
        recruiterProfile2.setContactPerson("Sarah Johnson");
        recruiterProfile2.setPhone("+1-555-0102");
        recruiterProfileRepository.save(recruiterProfile2);

        // Create Candidates
        User candidate1 = new User("candidate1","candidate1@email.com", passwordEncoder.encode("candidate123"), Role.CANDIDATE);
        userRepository.save(candidate1);

        CandidateProfile candidateProfile1 = new CandidateProfile();
        candidateProfile1.setUser(candidate1);
        candidateProfile1.setFullName("Alice Johnson");
        candidateProfile1.setPhone("+1-555-0201");
        candidateProfile1.setBio("Experienced software developer with 5 years in full-stack development");
        candidateProfile1.setSkills("Java, Spring Boot, React, MySQL, AWS");
        candidateProfile1.setEducation("Bachelor's in Computer Science");
        candidateProfileRepository.save(candidateProfile1);

        User candidate2 = new User("candidate2","candidate2@email.com", passwordEncoder.encode("candidate123"), Role.CANDIDATE);
        userRepository.save(candidate2);

        CandidateProfile candidateProfile2 = new CandidateProfile();
        candidateProfile2.setUser(candidate2);
        candidateProfile2.setFullName("Bob Wilson");
        candidateProfile2.setPhone("+1-555-0202");
        candidateProfile2.setBio("Frontend developer passionate about user experience");
        candidateProfile2.setSkills("JavaScript, React, Vue.js, HTML, CSS, Node.js");
        candidateProfile2.setEducation("Bachelor's in Web Development");
        candidateProfileRepository.save(candidateProfile2);

        User candidate3 = new User("candidate3","candidate3@email.com", passwordEncoder.encode("candidate123"), Role.CANDIDATE);
        userRepository.save(candidate3);

        CandidateProfile candidateProfile3 = new CandidateProfile();
        candidateProfile3.setUser(candidate3);
        candidateProfile3.setFullName("Carol Davis");
        candidateProfile3.setPhone("+1-555-0203");
        candidateProfile3.setBio("Data scientist with expertise in machine learning");
        candidateProfile3.setSkills("Python, TensorFlow, Pandas, SQL, R");
        candidateProfile3.setEducation("Master's in Data Science");
        candidateProfileRepository.save(candidateProfile3);

        // Create Sample Jobs
        Job job1 = new Job();
        job1.setTitle("Senior Java Developer");
        job1.setDescription("We are looking for an experienced Java developer to join our team. You will be responsible for developing high-quality applications using Java and Spring framework.");
        job1.setLocation("New York, NY");
        job1.setSalary(new BigDecimal("95000"));
        job1.setJobType(JobType.FULL_TIME);
        job1.setSkills("Java, Spring Boot, MySQL, REST APIs");
        job1.setRecruiter(recruiter1);
        job1.setStatus(JobStatus.ACTIVE);
        jobRepository.save(job1);

        Job job2 = new Job();
        job2.setTitle("Frontend React Developer");
        job2.setDescription("Join our dynamic team as a Frontend Developer. You will work on creating amazing user interfaces using React and modern JavaScript.");
        job2.setLocation("San Francisco, CA");
        job2.setSalary(new BigDecimal("85000"));
        job2.setJobType(JobType.FULL_TIME);
        job2.setSkills("React, JavaScript, HTML, CSS, Redux");
        job2.setRecruiter(recruiter1);
        job2.setStatus(JobStatus.ACTIVE);
        jobRepository.save(job2);

        Job job3 = new Job();
        job3.setTitle("Data Scientist");
        job3.setDescription("We are seeking a talented Data Scientist to analyze large datasets and build machine learning models to drive business insights.");
        job3.setLocation("Remote");
        job3.setSalary(new BigDecimal("110000"));
        job3.setJobType(JobType.REMOTE);
        job3.setSkills("Python, Machine Learning, TensorFlow, SQL");
        job3.setRecruiter(recruiter2);
        job3.setStatus(JobStatus.ACTIVE);
        jobRepository.save(job3);

        Job job4 = new Job();
        job4.setTitle("Full Stack Developer Intern");
        job4.setDescription("Great opportunity for students to gain hands-on experience in full-stack development using modern technologies.");
        job4.setLocation("Austin, TX");
        job4.setSalary(new BigDecimal("25000"));
        job4.setJobType(JobType.INTERNSHIP);
        job4.setSkills("JavaScript, Node.js, React, MongoDB");
        job4.setRecruiter(recruiter2);
        job4.setStatus(JobStatus.ACTIVE);
        jobRepository.save(job4);

        System.out.println("Sample data initialized successfully!");
        System.out.println("Admin: admin@jobportal.com / admin123");
        System.out.println("Recruiter 1: recruiter1@company.com / recruiter123");
        System.out.println("Recruiter 2: recruiter2@startup.com / recruiter123");
        System.out.println("Candidate 1: candidate1@email.com / candidate123");
        System.out.println("Candidate 2: candidate2@email.com / candidate123");
        System.out.println("Candidate 3: candidate3@email.com / candidate123");
    }
}
