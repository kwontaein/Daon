# --- 빌드 스테이지 ---
FROM gradle:8.0.0-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle bootJar --no-daemon

# --- 런타임 스테이지 ---
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/build/libs/app.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
