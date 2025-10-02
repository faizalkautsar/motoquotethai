import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const carBrandModels: Record<string, string[]> = {
  toyota: ["Camry", "Corolla", "Yaris", "Vios", "Altis", "Fortuner", "Hilux"],
  honda: ["Civic", "Accord", "City", "CR-V", "HR-V", "Jazz"],
  mazda: ["Mazda2", "Mazda3", "CX-3", "CX-5", "CX-30", "MX-5"],
  nissan: ["Almera", "Note", "Kicks", "X-Trail", "Terra", "Navara"],
  isuzu: ["D-Max", "MU-X", "V-Cross"],
  mitsubishi: ["Mirage", "Attrage", "Pajero Sport", "Triton", "Xpander"],
  bmw: ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7"],
  mercedes: ["C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "GLS"],
};

export function VehicleInfoStep() {
  const { t } = useTranslation();
  const form = useFormContext();
  const selectedBrand = form.watch("carBrand");

  useEffect(() => {
    if (selectedBrand) {
      form.setValue("carModel", "");
    }
  }, [selectedBrand, form]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 mb-6 border-2 border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-2">
          {t('vehicleInfoTitle')}
        </h3>
        <p className="text-sm text-blue-700">
          {t('vehicleInfoSubtitle')}
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="carBrand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('carBrand')} <span className="text-accent">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-car-brand">
                    <SelectValue placeholder="เลือกยี่ห้อ / Select Brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="toyota">Toyota (โตโยต้า)</SelectItem>
                  <SelectItem value="honda">Honda (ฮอนด้า)</SelectItem>
                  <SelectItem value="mazda">Mazda (มาสด้า)</SelectItem>
                  <SelectItem value="nissan">Nissan (นิสสัน)</SelectItem>
                  <SelectItem value="isuzu">Isuzu (อีซูซุ)</SelectItem>
                  <SelectItem value="mitsubishi">Mitsubishi (มิตซูบิชิ)</SelectItem>
                  <SelectItem value="bmw">BMW (บีเอ็มดับเบิลยู)</SelectItem>
                  <SelectItem value="mercedes">Mercedes-Benz (เมอร์เซเดส-เบนซ์)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="carModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('carModel')} <span className="text-accent">*</span>
              </FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
                disabled={!selectedBrand}
              >
                <FormControl>
                  <SelectTrigger data-testid="select-car-model">
                    <SelectValue placeholder={selectedBrand ? "เลือกรุ่น / Select Model" : "เลือกยี่ห้อก่อน / Select Brand First"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectedBrand && carBrandModels[selectedBrand]?.map((model) => (
                    <SelectItem key={model.toLowerCase()} value={model.toLowerCase()}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="carYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('carYear')} <span className="text-accent">*</span>
              </FormLabel>
              <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger data-testid="select-car-year">
                    <SelectValue placeholder="เลือกปี / Select Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 8 }, (_, i) => 2024 - i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="transmission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('transmission')} <span className="text-accent">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-transmission">
                    <SelectValue placeholder="เลือกประเภท / Select Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="auto">เกียร์อัตโนมัติ / Automatic</SelectItem>
                  <SelectItem value="manual">เกียร์ธรรมดา / Manual</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
