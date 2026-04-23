declare module "vanta/dist/vanta.clouds.min" {
  interface VantaEffect {
    destroy(): void;
    resize(): void;
  }

  interface VantaCloudsOptions {
    el: HTMLElement;
    THREE: object;
    backgroundColor?: number;
    cloudColor?: number;
    cloudShadowColor?: number;
    sunColor?: number;
    sunGlareColor?: number;
    sunlightColor?: number;
    speed?: number;
    zoom?: number;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
  }

  export default function CLOUDS(options: VantaCloudsOptions): VantaEffect;
}
