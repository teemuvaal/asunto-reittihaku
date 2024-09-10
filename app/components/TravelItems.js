import { BusFront, TramFront, TrainFront,Footprints } from "lucide-react";

const ModeIcon = ({ mode }) => {
  switch (mode) {
    case 'BUS':
      return <BusFront size={16} />;
    case 'TRAM':
      return <TramFront size={16} />;
    case 'WALK':
      return <Footprints size={16} />;
    case 'TRAIN':
      return <TrainFront size={16} />;
    default:
      return null;
  }
};

export default function TravelItems({ legs }) {
  if (!legs || legs.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      {legs.map((leg, index) => (
        <div key={index} className="flex items-center gap-2">
          <ModeIcon mode={leg.mode} />
          <span className="text-sm">{Math.round(leg.duration / 60)} min</span>
        </div>
      ))}
    </div>
  );
}