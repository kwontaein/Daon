FROM gradle:8.4.0-jdk17 AS build

COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src

# 테스트 제외하고 빌드하면서 로그 출력
RUN gradle build -x test --no-daemon --info --stacktrace

LABEL org.name="daon"

FROM eclipse-temurin:17-jdk-jammy
COPY --from=build /home/gradle/src/build/libs/demo.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]

