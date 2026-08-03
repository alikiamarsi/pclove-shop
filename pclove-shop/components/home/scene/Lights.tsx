"use client"

function Lights() {
  return (
    <>
        <ambientLight intensity={0.3} />

        <directionalLight 
            position={[3, 3, 3]}
            intensity={1.2}
        />

        <pointLight 
            color="#00ff88"
            intensity={1.5}
            position={[3, 1, 1]}
        />

        <pointLight 
            color="#00ff88"
            intensity={1}
            position={[-3, -1, 0]}
        />

        <spotLight 
          position={[2, 3, 4]}
          intensity={5}
          angle={0.6}
          penumbra={1}
        />

        <directionalLight 
          position={[-3, 2, 4]}
          intensity={0.8}
        />
    </>
  )
}

export default Lights