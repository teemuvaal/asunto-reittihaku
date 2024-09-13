import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Lightbulb } from "lucide-react"
  

export default function Header() {
    return (
        <div className="flex justify-center items-center mt-8 w-full max-w-4xl">
            <Card
            >
                <CardHeader>
                    <CardTitle><span className="flex items-center gap-2"><Lightbulb className="w-6 h-6" />Mikä tämä on?</span></CardTitle>
                    
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500">Tämä on helppo työkalu esimerkiksi asunnon tai toimipaikan sijaintiin liittyvien matkojen laskemiseen. Lähdekoodin löydät täältä: <a href="https://github.com/teemuvaal/asunto-reittihaku" target="_blank" className="text-blue-500">GitHub</a></p>
                    <p className="text-sm text-gray-500">Hakutiedot perustuvat HSL reittioppaan tietoihin.</p>
                </CardContent>
            </Card>
        </div>
    )
}