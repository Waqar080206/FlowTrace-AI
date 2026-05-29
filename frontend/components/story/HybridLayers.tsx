import Card from '../ui/Card'

interface LayerStatus {
  layer: string
  triggered: boolean
  score: number
}

interface HybridLayersProps {
  layers: LayerStatus[]
}

export default function HybridLayers({ layers }: HybridLayersProps) {
  const allTriggered = layers.every((l) => l.triggered)

  return (
    <Card title="Hybrid Detection Layers">
      <div className="space-y-3">
        {layers.map((layer) => (
          <div
            key={layer.layer}
            className={`p-3 rounded-lg flex items-center justify-between ${
              layer.triggered ? 'bg-palette-red bg-opacity-10 border border-palette-red' : 'bg-bg-secondary'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full ${
                  layer.triggered ? 'bg-palette-red' : 'bg-palette-light-gray'
                }`}
              ></div>
              <span className={`font-semibold ${layer.triggered ? 'text-palette-red' : 'text-text-text5'}`}>
                {layer.layer}
              </span>
            </div>
            <span className="text-size6 font-bold">{layer.score}</span>
          </div>
        ))}

        {allTriggered && (
          <div className="mt-4 p-3 bg-palette-red rounded-lg text-center">
            <p className="text-text-secondary font-semibold flex items-center justify-center gap-2">
              <i className="ti ti-alert-circle"></i>
              All 4 layers agree → Alert fired
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
