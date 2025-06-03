FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/build/libs/app.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]

RUN mkdir -p /app/.gradle-cache && chown gradle:gradle /app/.gradle-cache
ENV GRADLE_USER_HOME=/tmp/.gradle

USER root
RUN rm -rf /tmp/.gradle && mkdir -p /tmp/.gradle && chown -R gradle:gradle /tmp/.gradle

USER gradle
RUN gradle clean bootJar --no-daemon --no-build-cache --refresh-dependencies --stacktrace --info


