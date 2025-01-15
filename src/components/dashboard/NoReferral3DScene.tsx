"use client";

import { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Stars,
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import { motion } from "framer-motion-3d";
import * as THREE from "three";

function FloatingText({
  text,
  position,
  delay = 0,
}: {
  text: string;
  position: [number, number, number];
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.group
      position={position}
      animate={{
        y: [position[1] - 0.2, position[1] + 0.2],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2,
        delay: delay,
      }}
    >
      <Text
        fontSize={window.innerWidth < 640 ? 0.2 : 0.3}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#1f2937"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        {text}
      </Text>
    </motion.group>
  );
}

function RobotCharacter() {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <motion.group
        //@ts-expect-error it will be fixed
        ref={groupRef}
        scale={0.7}
        animate={hovered ? { y: 0.2 } : { y: 0 }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Head */}
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial
            color="#4ade80"
            metalness={0.8}
            roughness={0.2}
          />
          {/* Eyes */}
          <group position={[0, 0, 0.61]}>
            {[-0.2, 0.2].map((x) => (
              <motion.mesh
                key={x}
                position={[x, 0.1, 0]}
                animate={hovered ? { scale: 1.5 } : { scale: 1 }}
              >
                <sphereGeometry args={[0.12, 32, 32]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={hovered ? 0.5 : 0.2}
                />
              </motion.mesh>
            ))}
          </group>
          {/* Antenna */}
          <motion.mesh
            position={[0, 0.8, 0]}
            animate={{
              rotateZ: hovered ? [-0.5, 0.5] : 0,
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              repeatType: "reverse",
            }}
          >
            <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
            <meshStandardMaterial color="#4ade80" />
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color="#ff0000"
                emissive="#ff0000"
                emissiveIntensity={0.5}
              />
            </mesh>
          </motion.mesh>
        </mesh>

        {/* Body */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[1.5, 1.8, 1]} />
          <meshStandardMaterial
            color="#4ade80"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Arms */}
        {[-0.85, 0.85].map((x, i) => (
          <motion.group
            key={x}
            position={[x, 1.5, 0]}
            animate={
              hovered
                ? {
                    rotateZ: i === 0 ? -0.5 : 0.5,
                    rotateX: -0.5,
                  }
                : {
                    rotateZ: 0,
                    rotateX: 0,
                  }
            }
          >
            <mesh>
              <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
              <meshStandardMaterial
                color="#4ade80"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, -0.6, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial
                color="#4ade80"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </motion.group>
        ))}

        {/* Speech Bubble */}
        {hovered && (
          <group position={[1.5, 3, 0]}>
            <mesh>
              <boxGeometry args={[2, 1, 0.1]} />
              <meshStandardMaterial color="white" />
            </mesh>
            <Text
              position={[0, 0, 0.1]}
              fontSize={0.2}
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              Let&apos;s get referring 🚀
            </Text>
          </group>
        )}
      </motion.group>
    </Float>
  );
}

function Scene() {
  const isMobile = window.innerWidth < 640;
  const scale = isMobile ? 0.6 : 1;
  const textPositions = {
    top: isMobile ? 3 : 4,
    side: isMobile ? 2 : 2.5,
    bottom: isMobile ? -1.5 : -2,
  };

  return (
    <>
      <Environment preset="sunset" />
      <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 10 : 8]} />

      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <RobotCharacter />

      {/* Floating Text Elements */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <group scale={scale}>
          <FloatingText
            text="Share Your Link 🔗"
            position={[0, textPositions.top, 0]}
          />
          <FloatingText
            text="Earn Rewards 🎁"
            position={[-textPositions.side, textPositions.top * 0.75, 0]}
            delay={0.5}
          />
          <FloatingText
            text="Invite Friends 👥"
            position={[textPositions.side, textPositions.top * 0.75, 0]}
            delay={1}
          />
          <FloatingText
            text="Start Today ⭐"
            position={[0, textPositions.bottom, 0]}
            delay={1.5}
          />
        </group>
      </Float>

      {/* Circular Text Path */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 4;
        return (
          <motion.group
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
            animate={{
              rotateZ: [0, Math.PI * 2],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            <Text
              fontSize={0.2}
              color="#4ade80"
              anchorX="center"
              anchorY="middle"
            >
              {["🌟", "✨", "💫", "⚡"][i % 4]}
            </Text>
          </motion.group>
        );
      })}

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#4ade80"
      />

      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export function ImpressiveNoReferralScene() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      <Canvas dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
