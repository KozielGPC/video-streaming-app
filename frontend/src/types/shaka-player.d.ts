declare module "shaka-player/dist/shaka-player.compiled" {
  export interface PlayerConfiguration {
    streaming?: {
      bufferingGoal?: number;
      rebufferingGoal?: number;
    };
  }

  export class Player {
    constructor(videoElement?: HTMLVideoElement);
    configure(config: PlayerConfiguration): void;
    attach(videoElement: HTMLVideoElement): Promise<void>;
    load(manifestUri: string): Promise<void>;
    destroy(): Promise<void>;
    addEventListener(type: string, listener: (event: unknown) => void): void;
    removeEventListener(type: string, listener: (event: unknown) => void): void;
    static isBrowserSupported(): boolean;
  }

  export namespace polyfill {
    function installAll(): void;
  }
}
