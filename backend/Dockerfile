FROM gradle:jdk17

WORKDIR /backend
COPY . .
RUN ./gradlew clean build

CMD gradle bootRun