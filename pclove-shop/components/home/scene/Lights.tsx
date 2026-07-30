"use client"

function Lights() {
  return (
    <>
        <ambientLight intensity={0.4} />

        <directionalLight 
            position={[3, 3, 3]}
            intensity={1.5}
        />

        <pointLight 
            color="#00ff88"
            intensity={8}
            position={[0, 0, 2]}
        />
    </>
  )
}

export default Lights