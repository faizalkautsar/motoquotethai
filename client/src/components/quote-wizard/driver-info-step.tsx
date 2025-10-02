import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function DriverInfoStep() {
  const { t } = useTranslation();
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6 border-2 border-purple-200">
        <h3 className="text-xl font-bold text-purple-900 mb-2">
          {t('driverInfoTitle')}
        </h3>
        <p className="text-sm text-purple-700">
          {t('driverInfoSubtitle')}
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="driverAge"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Driver Age Range <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 md:grid-cols-3 gap-3"
              >
                {['18-25', '26-35', '36-50', '51-65', '65+'].map((age) => (
                  <label
                    key={age}
                    className={`relative flex cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      field.value === age
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md ring-2 ring-purple-200'
                        : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50/50'
                    }`}
                    data-testid={`radio-driver-age-${age}`}
                  >
                    <RadioGroupItem value={age} className="sr-only" />
                    <span className={`flex-1 text-center font-semibold ${
                      field.value === age ? 'text-purple-700' : 'text-gray-700'
                    }`}>{age}</span>
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="drivingExperience"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Driving Experience <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 md:grid-cols-3 gap-3"
              >
                {[
                  { value: '0-2', label: '0-2 years' },
                  { value: '3-5', label: '3-5 years' },
                  { value: '6-10', label: '6-10 years' },
                  { value: '11-15', label: '11-15 years' },
                  { value: '15+', label: '15+ years' },
                ].map((exp) => (
                  <label
                    key={exp.value}
                    className={`relative flex cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      field.value === exp.value
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md ring-2 ring-purple-200'
                        : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50/50'
                    }`}
                    data-testid={`radio-experience-${exp.value}`}
                  >
                    <RadioGroupItem value={exp.value} className="sr-only" />
                    <span className={`flex-1 text-center font-semibold ${
                      field.value === exp.value ? 'text-purple-700' : 'text-gray-700'
                    }`}>{exp.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="claimsHistory"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Claims History (Past 3 years) <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="space-y-3"
              >
                {[
                  { value: '0', label: 'No Claims', icon: 'fa-check-circle', color: 'text-secondary' },
                  { value: '1', label: '1 Claim', icon: 'fa-exclamation-circle', color: 'text-primary' },
                  { value: '2+', label: '2+ Claims', icon: 'fa-exclamation-triangle', color: 'text-accent' },
                ].map((claim) => (
                  <label
                    key={claim.value}
                    className={`relative flex cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      field.value === claim.value
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md ring-2 ring-purple-200'
                        : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50/50'
                    }`}
                    data-testid={`radio-claims-${claim.value}`}
                  >
                    <RadioGroupItem value={claim.value} className="sr-only" />
                    <div className="flex items-center space-x-3 w-full">
                      <i className={`fas ${claim.icon} ${claim.color} text-2xl`}></i>
                      <span className={`flex-1 font-semibold ${
                        field.value === claim.value ? 'text-purple-700' : 'text-gray-700'
                      }`}>{claim.label}</span>
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
        name="hasNCB"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>No Claims Bonus (NCB) <span className="text-accent">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: 'yes', label: 'Yes, I have NCB', icon: 'fa-award', color: 'text-secondary' },
                  { value: 'no', label: 'No NCB', icon: 'fa-times-circle', color: 'text-muted' },
                ].map((ncb) => (
                  <label
                    key={ncb.value}
                    className={`relative flex cursor-pointer rounded-lg border-2 p-6 transition-all ${
                      field.value === ncb.value
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md ring-2 ring-purple-200'
                        : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50/50'
                    }`}
                    data-testid={`radio-ncb-${ncb.value}`}
                  >
                    <RadioGroupItem value={ncb.value} className="sr-only" />
                    <div className="flex flex-col items-center w-full text-center space-y-2">
                      <i className={`fas ${ncb.icon} ${ncb.color} text-3xl`}></i>
                      <span className={`font-semibold ${
                        field.value === ncb.value ? 'text-purple-700' : 'text-gray-700'
                      }`}>{ncb.label}</span>
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
