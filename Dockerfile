FROM gradle:8.0.0-jdk17 AS build
WORKDIR /app
COPY . .

RUN mkdir -p /app/.gradle-cache && chown gradle:gradle /app/.gradle-cache
ENV GRADLE_USER_HOME=/app/.gradle-cache

USER gradle

RUN gradle clean bootJar --no-daemon --no-build-cache --refresh-dependencies --stacktrace --info

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/build/libs/app.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
