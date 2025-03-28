FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    openjdk-11-jdk openjdk-11-jre curl zip unzip

RUN curl -s "https://get.sdkman.io" | bash && \
    bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install sbt 1.10.11 && sdk install scala 3.3.5"

ENV PATH=$PATH:/root/.sdkman/candidates/sbt/current/bin
ENV PATH=$PATH:/root/.sdkman/candidates/scala/current/bin

RUN mkdir -p /app
WORKDIR /app
COPY . /app/

EXPOSE 9000
CMD ["sbt", "run"]