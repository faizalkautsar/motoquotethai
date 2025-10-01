import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function VehicleUsageStep() {
  const { t } = useTranslation();
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t('vehicleUsageTitle')}
        </h3>
        <p className="text-sm text-muted">
          {t('vehicleUsageSubtitle')}
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="vehicleUsage"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t('vehicleUsage')} <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="space-y-3"
              >
                {[
                  { value: 'personal', label: 'Personal Use', icon: 'fa-user' },
                  { value: 'commute', label: 'Commuting', icon: 'fa-car' },
                  { value: 'business', label: 'Business Use', icon: 'fa-briefcase' },
                ].map((usage) => (
                  <label
                    key={usage.value}
                    className="relative flex cursor-pointer rounded-lg border-2 border-border bg-white p-4 hover:border-primary transition-colors"
                    data-testid={`radio-usage-${usage.value}`}
                  >
                    <RadioGroupItem value={usage.value} className="sr-only" />
                    <div className="flex items-center space-x-3 w-full">
                      <i className={`fas ${usage.icon} text-primary text-2xl`}></i>
                      <span className="flex-1 font-medium">{usage.label}</span>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="annualMileage"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t('annualMileage')} <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { value: '0-10000', label: '< 10,000 km' },
                  { value: '10000-20000', label: '10,000 - 20,000 km' },
                  { value: '20000-30000', label: '20,000 - 30,000 km' },
                  { value: '30000+', label: '> 30,000 km' },
                ].map((mileage) => (
                  <label
                    key={mileage.value}
                    className="relative flex cursor-pointer rounded-lg border-2 border-border bg-white p-4 hover:border-primary transition-colors"
                    data-testid={`radio-mileage-${mileage.value}`}
                  >
                    <RadioGroupItem value={mileage.value} className="sr-only" />
                    <span className="flex-1 text-center font-medium">{mileage.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="parkingLocation"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t('parkingLocation')} <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="space-y-3"
              >
                {[
                  { value: 'covered', label: 'Covered Parking', icon: 'fa-warehouse', color: 'text-secondary' },
                  { value: 'street', label: 'Street Parking', icon: 'fa-road', color: 'text-primary' },
                  { value: 'garage', label: 'Private Garage', icon: 'fa-home', color: 'text-secondary' },
                ].map((parking) => (
                  <label
                    key={parking.value}
                    className="relative flex cursor-pointer rounded-lg border-2 border-border bg-white p-4 hover:border-primary transition-colors"
                    data-testid={`radio-parking-${parking.value}`}
                  >
                    <RadioGroupItem value={parking.value} className="sr-only" />
                    <div className="flex items-center space-x-3 w-full">
                      <i className={`fas ${parking.icon} ${parking.color} text-2xl`}></i>
                      <span className="flex-1 font-medium">{parking.label}</span>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="hasModifications"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t('hasModifications')} <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: 'yes', label: 'Yes, Modified', icon: 'fa-wrench', color: 'text-accent' },
                  { value: 'no', label: 'No, Stock', icon: 'fa-check-circle', color: 'text-secondary' },
                ].map((mod) => (
                  <label
                    key={mod.value}
                    className="relative flex cursor-pointer rounded-lg border-2 border-border bg-white p-6 hover:border-primary transition-colors"
                    data-testid={`radio-modifications-${mod.value}`}
                  >
                    <RadioGroupItem value={mod.value} className="sr-only" />
                    <div className="flex flex-col items-center w-full text-center space-y-2">
                      <i className={`fas ${mod.icon} ${mod.color} text-3xl`}></i>
                      <span className="font-medium">{mod.label}</span>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
