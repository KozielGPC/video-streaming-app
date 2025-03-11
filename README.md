# video-streaming-app
Repository destinated to study how a video is streamed on demand

# Standard protocols for live streaming include:

- RTMP (Real-Time Messaging Protocol): This was originally developed by Macromedia to transmit data between a Flash player and a server. Now it is used for streaming video data over the internet. Note that video conferencing applications like Skype use RTC (Real-Time Communication) protocol for lower latency.
- HLS (HTTP Live Streaming): It requires the H.264 or H.265 encoding. Apple devices accept only HLS format.
- DASH (Dynamic Adaptive Streaming over HTTP): DASH does not support Apple devices.
- Both HLS and DASH support adaptive bitrate streaming.


# Architeture

https://excalidraw.com/#json=ePw5gyX2Y2Q7t84yHDilK,3Nxi5-GevPWPpKE-8qyGzQ

<img width="1690" alt="image" src="https://github.com/user-attachments/assets/3d0a3304-5364-48fd-975b-89b240156429" />



``` mermaid
flowchart TD
    classDef frontend fill:#42b883,color:#fff,stroke:#42b883
    classDef service fill:#007acc,color:#fff,stroke:#007acc
    classDef messaging fill:#ff4757,color:#fff,stroke:#ff4757
    classDef infra fill:#622569,color:#fff,stroke:#622569

    Client[Client Applications]:::frontend

    subgraph Frontend["Frontend Layer"]
        direction TB
        MF1[Microfrontend 1]:::frontend
        MF2[Microfrontend 2]:::frontend
        MF3[Microfrontend 3]:::frontend
    end

    subgraph Gateway["API Gateway Layer"]
        AG[API Gateway]:::infra
    end

    subgraph Services["Service Layer"]
        MS1[Microservice 1]:::service
        MS2[Microservice 2]:::service
        MS3[Microservice 3]:::service
    end

    subgraph Messaging["Messaging Layer"]
        RMQ[RabbitMQ]:::messaging
        Redis[Redis Cache]:::messaging
    end

    Client --> MF1 & MF2 & MF3
    MF1 & MF2 & MF3 --> AG
    AG --> MS1 & MS2 & MS3
    MS1 & MS2 & MS3 <--> RMQ
    MS1 & MS2 & MS3 <--> Redis

    %% Legend
    subgraph Legend["Legend"]
        F[Frontend Component]:::frontend
        S[Service Component]:::service
        M[Messaging System]:::messaging
        I[Infrastructure]:::infra
    end
```