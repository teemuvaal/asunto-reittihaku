import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

export default function Footer() {
    return (
        <div className="flex justify-center items-center mt-8 w-full max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle>Mikä tämä on?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500">Tämä on helppo työkalu esimerkiksi asunnon tai toimipaikan sijaintiin liittyvien matkojen laskemiseen.</p>
                    <p className="text-sm text-gray-500">Hakutiedot perustuvat HSL reittioppaan tietoihin.</p>
                </CardContent>
            </Card>
        </div>
    )
}