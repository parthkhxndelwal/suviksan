import * as THREE from 'three';

const MAX_RIPPLES = 10;

const vertexShader = `
varying vec2 v_uv;

void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform vec2 u_res;
uniform sampler2D u_images[5];  
uniform float u_time;
uniform float u_radius;
uniform int u_index;
uniform float u_gapTime;
uniform float u_revealTime;
uniform vec2 u_mouse;

#define MAX_RIPPLES 10
uniform vec2 u_rippleCenters[MAX_RIPPLES];
uniform float u_rippleRadii[MAX_RIPPLES];

varying vec2 v_uv;

float circle(in vec2 _st, in float _radius, in float blurriness){
    vec2 dist = _st;
    return 1.-smoothstep((_radius * 3.0)-((_radius * 3.0)*blurriness), (_radius * 3.0)+((_radius * 3.0)*blurriness), dot(dist,dist)*4.0);
}

vec4 getTexture(sampler2D textures[5], int index, vec2 uv) {
    if (index == 0) return texture2D(textures[0], uv);
    if (index == 1) return texture2D(textures[1], uv);
    if (index == 2) return texture2D(textures[2], uv);
    if (index == 3) return texture2D(textures[3], uv);
    if (index == 4) return texture2D(textures[4], uv);
    return texture2D(textures[0], uv);
}

// Simplex noise function
vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(vec4(0.0, i1.z, i2.z, 1.0) + i.z) + vec4(0.0, i1.y, i2.y, 1.0) + i.y) + vec4(0.0, i1.x, i2.x, 1.0) + i.x);
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  vec2 res = u_res * PR;
  vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
  st.y *= u_res.y / u_res.x;

  float revealProgress = min(u_time / u_revealTime, 1.0);
  float c = circle(st, revealProgress, 2.) * 2.5;

  vec2 uv = v_uv;
  vec2 uvPerturbed = uv;

  float aspectRatio = u_res.x / u_res.y;
  
  float finalRipple = 0.0;
  for (int i = 0; i < MAX_RIPPLES; i++) {
    if (u_rippleRadii[i] > 0.0) {
      vec2 rippleDist = uv - u_rippleCenters[i];
      rippleDist.x *= aspectRatio;  // Adjust for aspect ratio
      float dist = length(rippleDist);
      float ripple = smoothstep(u_rippleRadii[i] - 0.01, u_rippleRadii[i], dist) - 
                     smoothstep(u_rippleRadii[i], u_rippleRadii[i] + 0.01, dist);
      rippleDist.x /= aspectRatio;  // Revert aspect ratio adjustment for displacement
      uvPerturbed += rippleDist * ripple * 0.05;
      finalRipple += ripple;
    }
  }

  float offx = uvPerturbed.x + sin(uvPerturbed.y + u_time * .1);
  float offy = uvPerturbed.y - u_time * 0.1 - cos(u_time * .001) * .01;
  float n = snoise(vec3(offx, offy, u_time * .1) * 8.) - 1.;

  float finalMask = smoothstep(0.4, 0.5, n + pow(c, 2.));

  float noiseIntensity = mix(0.02, 0.0, revealProgress);
  float noiseSpeed = mix(10.0, 1.0, revealProgress);

  uvPerturbed.x += snoise(vec3(uv * noiseSpeed, u_time)) * noiseIntensity;
  uvPerturbed.y += snoise(vec3(uv * noiseSpeed, u_time + 100.0)) * noiseIntensity;

  vec4 image = getTexture(u_images, u_index, v_uv);
  vec4 hover = getTexture(u_images, (u_index + 1) % 5, uvPerturbed);

  vec4 finalImage = mix(image, hover, finalMask);

  gl_FragColor = finalImage;
}
`;

export class Figure {
  private scene: THREE.Scene;
  private callback: () => void;
  private loader: THREE.TextureLoader;
  private images: THREE.Texture[];
  private texturesLoaded: number;
  private currentIndex: number;
  private time: number;
  private revealTime: number;
  private gapTime: number;
  private initialDelay: number;
  private previousTime: number;
  private uniforms: any;
  private mesh: THREE.Mesh | null;
  private geometry: THREE.PlaneGeometry | null;

  constructor(scene: THREE.Scene, cb: () => void) {
    this.scene = scene;
    this.callback = cb;
    this.loader = new THREE.TextureLoader();
    this.images = [];
    this.texturesLoaded = 0;
    this.currentIndex = 0;
    this.time = 0;
    this.revealTime = 3.0;
    this.gapTime = 5.0;
    this.initialDelay = 1.0;
    this.previousTime = performance.now();
    this.mesh = null;
    this.geometry = null;

    this.loadImages();
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private renderDivToCanvas(div: HTMLDivElement, index: number) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    const width = div.clientWidth;
    const height = div.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    context.scale(dpr, dpr);

    const backgroundImage = new Image();
    backgroundImage.crossOrigin = "anonymous";
    backgroundImage.src = window.getComputedStyle(div).backgroundImage.slice(5, -2).replace(/"/g, "") + "?not-from-cache-please";
    
    const onImageLoad = () => {
      context.drawImage(backgroundImage, 0, 0, width, height);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      
      this.images[index] = texture;
      
      this.texturesLoaded++;
      
      if (this.texturesLoaded === this.images.length) {
        this.start();
      }
    };

    if (backgroundImage.complete) {
      onImageLoad();
    } else {
      backgroundImage.onload = onImageLoad;
    }

    return canvas;
  }

  private loadImages() {
    const divTextures = [...document.querySelectorAll('.tile__image')];
    divTextures.forEach((div, i) => {
      this.renderDivToCanvas(div as HTMLDivElement, i);
    });
  }

  private start() {
    this.createMesh();
    if (typeof this.callback === "function") {
      this.callback();
    }
  }

  private createMesh() {
    const isMobile = window.innerWidth <= window.innerHeight;
    const canvasHeight = isMobile ? window.innerWidth : window.innerHeight;
    
    this.uniforms = {
      u_images: { type: 'tv', value: this.images },
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(window.innerWidth, canvasHeight) },
      u_radius: { value: 0.0 },
      u_index: { value: this.currentIndex },
      u_gapTime: { value: this.gapTime },
      u_revealTime: { value: this.revealTime },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_rippleCenters: { value: new Array(MAX_RIPPLES).fill(null).map(() => new THREE.Vector2(0.5, 0.5)) },
      u_rippleRadii: { value: new Array(MAX_RIPPLES).fill(0.0) }
    };

    this.updateGeometry(canvasHeight);

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      defines: { PR: window.devicePixelRatio.toFixed(1) }
    });

    this.mesh = new THREE.Mesh(this.geometry, material);
    this.scene.add(this.mesh);
  }

  private updateGeometry(canvasHeight: number) {
    let width: number, height: number;
    const isMobile = window.innerWidth <= window.innerHeight;
    const imageAspectRatio = isMobile ? 428 / 441 : 1738 / 1016;
    
    if (window.innerWidth / canvasHeight > imageAspectRatio) {
      width = window.innerWidth;
      height = window.innerWidth / imageAspectRatio;
    } else {
      height = canvasHeight;
      width = canvasHeight * imageAspectRatio;
    }

    if (this.geometry) {
      this.geometry.dispose();
    }
    this.geometry = new THREE.PlaneGeometry(width, height, 1, 1);

    if (this.mesh) {
      this.mesh.geometry = this.geometry;
    }
  }

  private onWindowResize() {
    const isMobile = window.innerWidth <= window.innerHeight;
    const canvasHeight = isMobile ? window.innerWidth : window.innerHeight;

    if (this.uniforms && this.uniforms.u_res) {
      this.uniforms.u_res.value.set(window.innerWidth, canvasHeight);
      this.updateGeometry(canvasHeight);
    }
  }

  public update() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.previousTime) / 1000;
    this.previousTime = currentTime;

    if (this.uniforms) {
      this.time += deltaTime;

      if (this.time < this.initialDelay) {
        return;
      }

      const animationTime = this.time - this.initialDelay;
      this.uniforms.u_time.value = animationTime;

      const totalCycleTime = this.revealTime + this.gapTime;

      if (animationTime <= this.revealTime) {
        this.uniforms.u_radius.value = (animationTime / this.revealTime) * 2.0;
      } else if (animationTime > this.revealTime && animationTime <= totalCycleTime) {
        this.uniforms.u_radius.value = 2.0 - 2.0 * ((animationTime - this.revealTime) / this.gapTime);
      } else if (animationTime > totalCycleTime) {
        this.time = this.initialDelay;
        this.uniforms.u_radius.value = 0.0;
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.uniforms.u_index.value = this.currentIndex;
        const isMobile = window.innerWidth <= window.innerHeight;
        const canvasHeight = isMobile ? window.innerWidth : window.innerHeight;
        this.updateGeometry(canvasHeight);
      }

      this.updateRipples(deltaTime);
    }
  }

  private updateRipples(deltaTime: number) {
    for (let i = 0; i < MAX_RIPPLES; i++) {
      if (this.uniforms.u_rippleRadii.value[i] > 0) {
        this.uniforms.u_rippleRadii.value[i] += deltaTime * 0.2;
        if (this.uniforms.u_rippleRadii.value[i] > 1.0) {
          this.uniforms.u_rippleRadii.value[i] = 0.0;
        }
      }
    }
    this.uniforms.u_rippleCenters.needsUpdate = true;
    this.uniforms.u_rippleRadii.needsUpdate = true;
  }

  public addRipple(centerX: number, centerY: number) {
    for (let i = 0; i < MAX_RIPPLES; i++) {
      if (this.uniforms.u_rippleRadii.value[i] === 0.0) {
        this.uniforms.u_rippleCenters.value[i].set(centerX, centerY);
        this.uniforms.u_rippleRadii.value[i] = 0.01;
        this.uniforms.u_rippleCenters.needsUpdate = true;
        this.uniforms.u_rippleRadii.needsUpdate = true;
        break;
      }
    }
  }
} 