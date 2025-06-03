# 1. Build Stage
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY . .

# 여기에 실행 권한 부여
RUN chmod +x gradlew

RUN ./gradlew build --no-daemon

# 2. Run Stage
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/build/libs/app.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
