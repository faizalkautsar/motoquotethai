import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
import { Input } from "@/components/ui/input";

export function VehicleDetailsStep() {
  const { t } = useTranslation();
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 mb-6 border-2 border-green-200">
        <h3 className="text-xl font-bold text-green-900 mb-2">
          {t('vehicleDetailsTitle')}
        </h3>
        <p className="text-sm text-green-700">
          {t('vehicleDetailsSubtitle')}
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="licensePlate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('licensePlate')} <span className="text-accent">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="กท 1234 / ABC 1234"
                  data-testid="input-license-plate"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="chassisNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('chassisNumber')} <span className="text-accent">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="เลขตัวถัง / Chassis No."
                  data-testid="input-chassis-number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="engineNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('engineNumber')} <span className="text-accent">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="เลขเครื่องยนต์ / Engine No."
                  data-testid="input-engine-number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('color')} <span className="text-accent">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-color">
                    <SelectValue placeholder="เลือกสี / Select Color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="white">ขาว / White</SelectItem>
                  <SelectItem value="black">ดำ / Black</SelectItem>
                  <SelectItem value="silver">เงิน / Silver</SelectItem>
                  <SelectItem value="gray">เทา / Gray</SelectItem>
                  <SelectItem value="red">แดง / Red</SelectItem>
                  <SelectItem value="blue">น้ำเงิน / Blue</SelectItem>
                  <SelectItem value="green">เขียว / Green</SelectItem>
                  <SelectItem value="yellow">เหลือง / Yellow</SelectItem>
                  <SelectItem value="other">อื่นๆ / Other</SelectItem>
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
