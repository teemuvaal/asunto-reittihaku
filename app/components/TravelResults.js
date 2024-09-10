import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TravelItems from "./TravelItems";

export default function TravelResults({ travelInfo }) {
  if (travelInfo.length === 0) return null;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Matkatiedot</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              {travelInfo.map((item, index) => (
                <TableHead key={index}>{item.to}</TableHead>
              ))}
              <TableHead>Yhteensä</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Matka-aika</TableCell>
              {travelInfo.map((item, index) => (
                <TableCell key={index}>
                  {item.info && item.info.legs ? Math.round(item.info.legs.reduce((acc, leg) => acc + leg.duration, 0) / 60) : 'N/A'} min
                </TableCell>
              ))}
              <TableCell>
                {travelInfo.reduce((total, item) => {
                  if (item.info && item.info.legs) {
                    return total + Math.round(item.info.legs.reduce((acc, leg) => acc + leg.duration, 0) / 60);
                  }
                  return total;
                }, 0)} min
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Välineet</TableCell>
              {travelInfo.map((item, index) => (
                <TableCell key={index}>
                  {item.info && item.info.legs ? <TravelItems legs={item.info.legs} /> : 'N/A'}
                </TableCell>
              ))}
              <TableCell>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}