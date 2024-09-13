'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"


export default function TravelForm({ onSubmit }) {
  const [apartment, setApartment] = useState('');
  const [destinations, setDestinations] = useState(['']);

  const addDestination = () => {
    if (destinations.length < 5) {
      setDestinations([...destinations, '']);
    }
  };

  const updateDestination = (index, value) => {
    const newDestinations = [...destinations];
    newDestinations[index] = value;
    setDestinations(newDestinations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(apartment, destinations.filter(dest => dest.trim() !== ''));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Matkaetäisyyksien haku</CardTitle>
        <CardDescription>Syötä halutut osoitteet, joihin haluat tietää matkustusajan</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-gray-700">Kotiosoite:</p>
          <Input
            type="text"
            placeholder="Asunnon osoite"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            required
          />
          <Separator />
          <p className="text-sm text-gray-700">Halutut kohteet (max 5):</p>
          {destinations.map((dest, index) => (
            <Input
              key={index}
              type="text"
              placeholder={`Kohde ${index + 1}`}
              value={dest}
              onChange={(e) => updateDestination(index, e.target.value)}
              required
            />
          ))}
          {destinations.length < 5 && (
            <Button type="button" onClick={addDestination}>Lisää kohde</Button>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit">Hae matkatiedot</Button>
        </CardFooter>
      </form>
    </Card>
  );
}