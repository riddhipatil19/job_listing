FROM openjdk:17-jdk-alpine
LABEL authors="Riddhi Patil"

WORKDIR /app

COPY target/joblisting_backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]