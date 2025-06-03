# --- 빌드 스테이지 ---
FROM gradle:8.0.0-jdk17 AS build
WORKDIR /app
COPY . .

# 캐시 없이 깔끔한 Gradle 빌드 설정
ENV GRADLE_USER_HOME=/tmp/.gradle
RUN rm -rf /home/gradle/.gradle && \
    gradle clean bootJar --no-daemon --no-build-cache --refresh-dependencies


# --- 런타임 스테이지 ---
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/build/libs/app.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]

