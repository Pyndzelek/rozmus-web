"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function CalorieCalculator() {
  const [formData, setFormData] = useState({
    weight: [70],
    height: [175],
    age: [25],
    gender: "",
  });

  return (
    <section className="bg-black text-white py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-xl md:text-2xl">
                  Kalkulator kalorii
                </CardTitle>
                <div className="flex gap-4 mt-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
                    2
                  </div>
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
                    3
                  </div>
                </div>
                <div className="text-red-500 text-sm font-semibold mt-4">
                  DANE PODSTAWOWE
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Weight Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-white text-base md:text-lg">
                      Waga:
                    </Label>
                    <div className="text-xl md:text-2xl font-bold text-red-500">
                      {formData.weight[0]} kg
                    </div>
                  </div>
                  <Slider
                    value={formData.weight}
                    onValueChange={(value) =>
                      setFormData({ ...formData, weight: value })
                    }
                    max={150}
                    min={40}
                    step={1}
                    className="w-full [&_[data-radix-slider-range]]:bg-red-600 [&_[data-radix-slider-thumb]]:bg-red-600 [&_[data-radix-slider-thumb]]:border-white"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>40 kg</span>
                    <span>150 kg</span>
                  </div>
                </div>

                {/* Height Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-white text-base md:text-lg">
                      Wzrost:
                    </Label>
                    <div className="text-xl md:text-2xl font-bold text-red-500">
                      {formData.height[0]} cm
                    </div>
                  </div>
                  <Slider
                    value={formData.height}
                    onValueChange={(value) =>
                      setFormData({ ...formData, height: value })
                    }
                    max={220}
                    min={140}
                    step={1}
                    className="w-full [&_[data-radix-slider-range]]:bg-red-600 [&_[data-radix-slider-thumb]]:bg-red-600 [&_[data-radix-slider-thumb]]:border-white"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>140 cm</span>
                    <span>220 cm</span>
                  </div>
                </div>

                {/* Age Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-white text-base md:text-lg">
                      Wiek:
                    </Label>
                    <div className="text-xl md:text-2xl font-bold text-red-500">
                      {formData.age[0]} lat
                    </div>
                  </div>
                  <Slider
                    value={formData.age}
                    onValueChange={(value) =>
                      setFormData({ ...formData, age: value })
                    }
                    max={80}
                    min={16}
                    step={1}
                    className="w-full [&_[data-radix-slider-range]]:bg-red-600 [&_[data-radix-slider-thumb]]:bg-red-600 [&_[data-radix-slider-thumb]]:border-white"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>16 lat</span>
                    <span>80 lat</span>
                  </div>
                </div>

                {/* Gender Select */}
                <div className="space-y-4">
                  <Label className="text-white text-base md:text-lg">
                    Płeć:
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Wybierz płeć" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="male">Mężczyzna</SelectItem>
                      <SelectItem value="female">Kobieta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 transition-all duration-300 hover:scale-105">
                  Dalej
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Pragniesz zdrowej i silnej sylwetki? Zacznij przemianę już dziś!
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Sprawdzony plan treningowy to Twoja droga do widocznych
              rezultatów. Nie czekaj — zacznij już dziś!
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
              Zacznijmy przemianę <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
