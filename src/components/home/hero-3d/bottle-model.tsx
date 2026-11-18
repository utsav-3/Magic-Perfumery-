"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { labelSvg, LABEL_ASPECT } from "@/components/product/label-art";
import type { Fragrance } from "@/types/fragrance";

/**
 * The bottle, 2 units tall. Proportions follow `bottle.tsx` (viewBox 60x200,
 * 1 unit = 100 viewBox units, origin at viewBox y = 100).
 */
export function BottleModel({ fragrance }: { fragrance: Fragrance }) {
  const texture = useLabelTexture(fragrance);

  return (
    <group>
      {/* Frosted body */}
      <mesh position={[0, -0.27, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 1.34, 64]} />
        <meshPhysicalMaterial
          color="#ebe6f1"
          transmission={0.6}
          roughness={0.45}
          thickness={0.3}
          envMapIntensity={1}
        />
      </mesh>
      {/* Rounded shoulder and base */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.24, 48, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#f4f1f7" transmission={0.6} roughness={0.45} thickness={0.3} />
      </mesh>
      {/* Label band */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.2405, 0.2405, 0.92, 64, 1, true]} />
        {/* Texture centre (u = 0.5) must face the camera (+z). */}
        <meshStandardMaterial
          map={texture ?? undefined}
          emissiveMap={texture ?? undefined}
          emissive="#ffffff"
          emissiveIntensity={0.18}
          color={texture ? "#ffffff" : "#c9bfe0"}
          roughness={0.5}
        />
      </mesh>
      {/* Collar */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.24, 48]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} />
      </mesh>
      {/* Actuator */}
      <mesh position={[0, 0.71, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.26, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} />
      </mesh>
      {/* Clear overcap */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.58, 48]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.8}
          roughness={0.3}
          thickness={0.2}
          transparent
        />
      </mesh>
    </group>
  );
}

/** Renders the flat label SVG to a canvas texture, wrapped once around the band. */
function useLabelTexture(fragrance: Fragrance): THREE.CanvasTexture | null {
  const svg = useMemo(() => labelSvg(fragrance), [fragrance]);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024 / LABEL_ASPECT;
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    // Cylinder u = 0 faces +z; shift half a turn so the label centre faces the camera.
    t.offset.x = 0.5;
    t.wrapS = THREE.RepeatWrapping;
    return t;
  }, []);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const ctx = texture.image.getContext("2d") as CanvasRenderingContext2D;
      ctx.drawImage(img, 0, 0, texture.image.width, texture.image.height);
      texture.needsUpdate = true;
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    return () => {
      cancelled = true;
    };
  }, [svg, texture]);

  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}
