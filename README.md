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
        MF1[Login/User Info]:::frontend
        MF2[Videos]:::frontend
        MF3[Stream]:::frontend
        MF4[Currency/Points]:::frontend
    end

    subgraph Gateway["API Gateway Layer"]
        AG[API Gateway]:::infra
    end

    subgraph Services["Service Layer"]
        MS1[Auth]:::service
        MS2[Currency/Points]:::service
        MS3[Stream]:::service
        MS4[Videos]:::service
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

    %% Label
    subgraph Label["Label"]
        F[Frontend Component]:::frontend
        S[Service Component]:::service
        M[Messaging System]:::messaging
        I[Infrastructure]:::infra
    end
```