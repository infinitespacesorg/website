'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SplatMesh, transcodeSpz } from '@sparkjsdev/spark';

interface FileInfo {
  fileBytes: Uint8Array;
  pathOrUrl: string;
}

interface TranscodeInfo {
  inputs: FileInfo[];
  maxSh: number;
  fractionalBits: number;
  opacityThreshold: number;
}

const Viewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const loadedSplatRef = useRef<SplatMesh | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const [fileName, setFileName] = useState<string>('');
  const [fileBytes, setFileBytes] = useState<Uint8Array | null>(null);
  const [isDragover, setIsDragover] = useState(false);
  const [isSpzButtonVisible, setIsSpzButtonVisible] = useState(false);
  const [isLoadContainerVisible, setIsLoadContainerVisible] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  // Initialize Three.js scene
  const initializeScene = useCallback(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 0, 4);
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;
    renderer.setSize(width, height, false);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 0, 0);
    orbitControls.minDistance = 0.1;
    orbitControls.maxDistance = 10;

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    controlsRef.current = orbitControls;

    // Animation loop
    const animate = (time: number) => {
      resize();
      orbitControls.update();
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle window resize
  const resize = useCallback(() => {
    if (!rendererRef.current || !cameraRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const canvas = rendererRef.current.domElement;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      rendererRef.current.setSize(width, height, false);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    }
  }, []);

  // Load splat file from file input
  const loadSplatFile = useCallback(async (splatFile: File) => {
    const bytes = new Uint8Array(await splatFile.arrayBuffer());
    setFileBytes(bytes);
    setFileName(splatFile.name);
    setSplatFile({ fileBytes: bytes.slice(), fileName: splatFile.name });
  }, []);

  // Load splat file from URL
  const loadSplatURL = useCallback((splatURL: string) => {
    const name = splatURL.split("/").pop()?.split("?")[0] || '';
    setFileName(name);
    setIsLoadContainerVisible(false);
    setSplatFile({ url: splatURL });
  }, []);

  // Set splat file in scene
  const setSplatFile = useCallback((init: { fileBytes?: Uint8Array; fileName?: string; url?: string }) => {
    if (!sceneRef.current) return;

    if (loadedSplatRef.current) {
      sceneRef.current.remove(loadedSplatRef.current);
    }

    const loadedSplat = new SplatMesh(init);
    loadedSplat.quaternion.set(1, 0, 0, 0);
    sceneRef.current.add(loadedSplat);
    loadedSplatRef.current = loadedSplat;
  }, []);

  // Handle file input change
  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      loadSplatFile(file);
    }
  }, [loadSplatFile]);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragover(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragover(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragover(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      loadSplatFile(files[0]);
    }
  }, [loadSplatFile]);

  // Handle URL form submission
  const handleUrlSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput) {
      loadSplatURL(urlInput);
      const url = new URL(window.location.href);
      url.searchParams.set('url', urlInput);
      window.history.pushState(null, '', url.toString());
    }
  }, [urlInput, loadSplatURL]);

  // Handle SPZ conversion
  const handleSpzConversion = useCallback(async () => {
    if (!fileBytes || !fileName) return;

    const fileInfo: FileInfo = {
      fileBytes: fileBytes,
      pathOrUrl: fileName,
    };

    const transcodeInfo: TranscodeInfo = {
      inputs: [fileInfo],
      maxSh: 3,
      fractionalBits: 12,
      opacityThreshold: 0
    };

    try {
      const transcode = await transcodeSpz(transcodeInfo);
      const blob = new Blob([transcode.fileBytes], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName.split(".")[0] + ".spz";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error converting to SPZ:', error);
    }
  }, [fileBytes, fileName]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'x') {
      setIsSpzButtonVisible(prev => !prev);
    }
    if (event.key === 'z') {
      setIsLoadContainerVisible(prev => !prev);
    }
  }, []);

  // Initialize scene and load default splat
  useEffect(() => {
    initializeScene();

    // Load default splat from URL params or default
    const params = new URLSearchParams(window.location.search);
    const inputSplatURL = params.get("url");
    
    if (inputSplatURL) {
      loadSplatURL(inputSplatURL);
    } else {
      loadSplatURL('https://wslqutnzjionxsidfydk.supabase.co/storage/v1/object/public/media/3dscenes/spark/furry-logo-pedestal.spz');
    }

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

    // Add resize event listener
    const handleResize = () => {
      setTimeout(() => resize(), 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [initializeScene, loadSplatURL, handleKeyDown, resize]);

  return (
    <div style={{ 
      margin: 0, 
      fontFamily: 'system-ui, sans-serif', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: 'rgb(0, 0, 0)' 
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        width: '100vw', 
        height: '100vh', 
        margin: 0, 
        padding: '10px' 
      }}>
        {/* SPZ Button */}
        {isSpzButtonVisible && (
          <div style={{ 
            position: 'fixed', 
            top: '30px', 
            right: '30px', 
            zIndex: 1000 
          }}>
            <button 
              onClick={handleSpzConversion}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4em', 
                padding: '0.5em 1.5em', 
                backgroundColor: 'rgb(60, 60, 60)', 
                border: '0px solid rgb(60, 60, 60)', 
                borderRadius: '0.5em', 
                color: '#fffefe', 
                fontFamily: 'system-ui, sans-serif', 
                fontSize: '0.9em', 
                cursor: 'pointer', 
                zIndex: 1000 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(90, 90, 90)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(60, 60, 60)';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/assets/svg/download.svg" width="18" height="18" alt="" />
              </span>
              <span>.spz</span>
            </button>
          </div>
        )}

        {/* Load Splat Container */}
        {isLoadContainerVisible && (
          <div style={{ 
            position: 'fixed', 
            top: '30px', 
            left: '30px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            width: '400px', 
            height: '350px', 
            backgroundColor: 'rgb(43, 41, 40)', 
            margin: 0, 
            padding: '10px', 
            zIndex: 1000, 
            border: '0px solid rgb(60, 60, 60)', 
            borderRadius: '0.5em' 
          }}>
            <div style={{ 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              <div 
                style={{ 
                  width: '100%', 
                  maxWidth: '500px', 
                  paddingTop: '4rem', 
                  paddingBottom: '4rem', 
                  border: isDragover ? '1px dashed #aaa' : '1px dashed #666', 
                  color: '#fffefe', 
                  backgroundColor: 'rgb(47, 47, 47)', 
                  borderRadius: '6px', 
                  fontSize: '1rem', 
                  textAlign: 'center' as const,
                  margin: '0.5rem 0'
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                Drag and drop a splat file here <br/> (ply, sogs, spz, splat, ksplat)
              </div>
              
              <label 
                htmlFor="file-input" 
                style={{ 
                  width: '100%', 
                  maxWidth: '300px', 
                  margin: '0.5rem 0', 
                  padding: '0.75rem', 
                  borderRadius: '6px', 
                  fontSize: '1rem', 
                  textAlign: 'center' as const,
                  backgroundColor: 'transparent', 
                  color: '#fffefe', 
                  border: 'none', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(47, 47, 47)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <img className="upload-icon" src="/assets/svg/upload-icon.svg" alt="upload" style={{ marginRight: '10px', height: '1em' }} />
                Choose file
              </label>
              
              <input 
                id="file-input" 
                style={{ display: 'none' }} 
                accept=".ply,.spz,.splat,.ksplat,.zip" 
                type="file" 
                onChange={handleFileInput}
              />
              
              <form onSubmit={handleUrlSubmit}>
                <input 
                  type="text" 
                  placeholder="Paste splat URL" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  style={{ 
                    width: '100%', 
                    maxWidth: '300px', 
                    margin: '0.5rem 0', 
                    padding: '0.75rem', 
                    borderRadius: '6px', 
                    fontSize: '1rem', 
                    textAlign: 'center' as const,
                    backgroundColor: 'rgb(47, 47, 47)', 
                    border: 'none', 
                    color: '#fffefe' 
                  }}
                />
              </form>
            </div>
          </div>
        )}

        <canvas 
          ref={canvasRef}
          style={{ 
            display: 'block', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            backgroundColor: 'rgb(0, 0, 0)' 
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      </div>
    </div>
  );
};

export default Viewer;
